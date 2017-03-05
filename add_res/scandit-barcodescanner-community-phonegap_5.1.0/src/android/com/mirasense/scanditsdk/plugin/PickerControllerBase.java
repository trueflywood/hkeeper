//  Copyright 2016 Scandit AG
//
//  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
//  in compliance with the License. You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software distributed under the
//  License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
//  express or implied. See the License for the specific language governing permissions and
//  limitations under the License.

package com.mirasense.scanditsdk.plugin;


import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Base class for the picker controllers.
 */
abstract class PickerControllerBase implements IPickerController {
    protected final CordovaPlugin mPlugin;
    protected final CallbackContext mCallbackContext;

    protected boolean mLegacyMode = false;
    protected boolean mContinuousMode = false;
    protected AtomicInteger mInFlightDidScanCallbackId = new AtomicInteger(0);
    protected AtomicInteger mLastDidScanCallbackId = new AtomicInteger(0);

    protected int mNextState = 0;
    private final Object mSync = new Object();
    PickerControllerBase(CordovaPlugin plugin, CallbackContext callbacks) {
        mPlugin = plugin;
        mCallbackContext = callbacks;
    }

    @Override
    public void finishDidScanCallback(JSONArray data) {
        mNextState = 0;
        if (data != null && data.length() > 0) {
            try {
                mNextState = data.getInt(0);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            ArrayList<Long> rejectedCodeIds = new ArrayList<Long>();
            try {
                JSONArray jsonData = data.getJSONArray(1);
                for (int i = 0; i < jsonData.length(); ++i) {
                    rejectedCodeIds.add(jsonData.getLong(i));
                }
            } catch(JSONException e) {
                e.printStackTrace();
            }
            setRejectedCodeIds(rejectedCodeIds);
        }
        synchronized (mSync) {
            mInFlightDidScanCallbackId.set(0); // zero means no in-flight didScan callback
            mSync.notifyAll();
        }
    }

    protected abstract void setRejectedCodeIds(ArrayList<Long> rejectedCodeIds);


    protected int sendPluginResultBlocking(PluginResult result) {
        if (mLegacyMode) {
            mCallbackContext.sendPluginResult(result);
            return 0;
        }
        int currentId = mLastDidScanCallbackId.incrementAndGet();
        mInFlightDidScanCallbackId.set(currentId);
        mNextState = 0;

        try {
            mCallbackContext.sendPluginResult(result);
            synchronized (mSync) {
                while (mInFlightDidScanCallbackId.get() == currentId) {
                    mSync.wait();
                }
            }
        } catch (InterruptedException e) {
        }

        return mNextState;
    }
}

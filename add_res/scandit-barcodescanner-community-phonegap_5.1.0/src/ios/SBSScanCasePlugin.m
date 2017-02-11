//  Copyright 2016 Scandit AG
//
//  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
// in compliance with the License. You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software distributed under the
//  License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
//  express or implied. See the License for the specific language governing permissions and
//  limitations under the License.
#import "SBSScanCasePlugin.h"
#import "SBSTypeConversion.h"
#import <ScanditBarcodeScanner/ScanditBarcodeScanner.h>


const static NSString* kSBSScanCaseDidChangeStateEvent = @"didChangeState";
const static NSString* kSBSScanCaseDidInitializeEvent = @"didInitialize";
const static NSString* kSBSScanCaseDidScanEvent = @"didScan";



@interface SBSScanCasePlugin () <SBSScanCaseDelegate> {


    
}

// Id for master callback The callback is provided by us and dispatches
// to the correct user-callback in JS.
@property (nonatomic, strong) NSString* callbackId;
@property (nonatomic, strong) SBSScanCase* scanCase;
@property (nonatomic, strong) NSCondition* didScanCondition;
@property (nonatomic, assign) SBSScanCaseState desiredState;
@property (nonatomic, assign) BOOL didScanCallbackFinish;
@property (nonatomic, assign) BOOL immediatelySwitchToDesiredState;
@end


@implementation SBSScanCasePlugin

- (instancetype)init {
    if (self = [super init]) {
        _scanCase = nil;
        _didScanCondition = [[NSCondition alloc] init];
        _desiredState = SBSScanCaseStateActive;
        _didScanCallbackFinish = YES;
    }
    return self;
}

- (void)acquire:(CDVInvokedUrlCommand *)command {
    self.callbackId = command.callbackId;
    SBSScanCaseSettings* settings = [[SBSScanCaseSettings alloc] init];
    NSDictionary* settingsDict = [command.arguments objectAtIndex:0];
    SBSScanSettings *scanSettings = [SBSScanSettings settingsWithDictionary:settingsDict error:nil];
    for (NSNumber* sym in scanSettings.enabledSymbologies) {
        SBSSymbology theSym = (SBSSymbology)[sym intValue];
        [settings setSymbology:theSym enabled:YES];
    }
    [SBSScanCase acquireWithSettings:settings delegate:self];
}

- (void)setState:(CDVInvokedUrlCommand*)command {
    NSString *stateString = [command.arguments objectAtIndex:0];
    SBSScanCaseState state = SBSScanStateFromString(stateString);
    self.scanCase.state = state;
}

- (void)finishDidScanCallback:(CDVInvokedUrlCommand*)command {
    NSString* state = [command.arguments objectAtIndex:0];
    self.desiredState = SBSScanStateFromString(state);
    if (self.immediatelySwitchToDesiredState) {
        self.scanCase.state = self.desiredState;
        self.immediatelySwitchToDesiredState = NO;
    }
    self.didScanCallbackFinish = YES;
    [self.didScanCondition signal];
}

# pragma mark SBSScanCaseDelegate

- (void)didInitializeScanCase:(SBSScanCase *)scanCase {
    self.scanCase = scanCase;
    self.scanCase.volumeButtonToScanEnabled = YES;
    NSArray* resultArray = @[kSBSScanCaseDidInitializeEvent, @{}];
    CDVPluginResult * result =
    [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:resultArray];
    [result setKeepCallback:@(YES)];
    // async is OK
    [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
    
}

- (SBSScanCaseState)scanCase:(SBSScanCase *)scanCase
                     didScan:(SBSScanCaseSession *)session {
    NSArray* resultArray = @[kSBSScanCaseDidScanEvent, @{
                                 @"newlyRecognizedCodes" : SBSJSObjectsFromCodeArray(session.newlyRecognizedCodes),
                                 @"newlyLocalizedCodes" : SBSJSObjectsFromCodeArray(session.newlyLocalizedCodes),
                                 @"allRecognizedCodes" : SBSJSObjectsFromCodeArray(session.allRecognizedCodes),
                                 }];
    CDVPluginResult * result =
    [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:resultArray];
    [result setKeepCallback:@(YES)];
    
    if (![NSThread isMainThread]) {
        [self.didScanCondition lock];
        self.didScanCallbackFinish = NO;
    }
    
    [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
    
    if ([NSThread isMainThread]) {
        // We are on the main thread where the callback will be invoked on as well, we can't
        // wait for a response and have to immediately continue.
        self.immediatelySwitchToDesiredState = YES;
        return self.scanCase.state;
    } else {
        while (!self.didScanCallbackFinish) {
            [self.didScanCondition wait];
        }
        return self.desiredState;
    }
}

- (void)scanCase:(SBSScanCase *)scanCase
  didChangeState:(SBSScanCaseState)state
          reason:(SBSScanCaseStateChangeReason)reason {
    NSArray* resultArray = @[kSBSScanCaseDidChangeStateEvent, @{
                                 @"state" : SBSScanStateToString(state),
                                 @"reason" : SBSScanStateChangeReasonToString(reason)
                                 }];
    CDVPluginResult * result =
    [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:resultArray];
    [result setKeepCallback:@(YES)];
    [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
}


@end

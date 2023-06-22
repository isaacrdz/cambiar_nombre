import * as React from "react";
import { RNTwilioPhone } from "react-native-twilio-phone";

// ...

// Options passed to CallKeep (https://github.com/react-native-webrtc/react-native-callkeep#usage)
const callKeepOptions = {
  ios: {
    appName: "TwilioPhone Example",
    supportsVideo: false,
  },
  android: {
    alertTitle: "Permissions required",
    alertDescription: "This application needs to access your phone accounts",
    cancelButton: "Cancel",
    okButton: "OK",
    additionalPermissions: [],
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: "com.example.reactnativetwiliophone",
      channelName: "Foreground service for my app",
      notificationTitle: "My app is running on background",
    },
  },
};

// Async function that returns Twilio access token
async function fetchAccessToken() {
  const response = await fetch(
    "https://XXXXXX.ngrok.io/accessToken?identity=alice"
  );
  const accessToken = await response.text();

  return accessToken;
}

// RNTwilioPhone options
const options = {
  requestPermissionsOnInit: true, // Default: true - Set to false if you want to request permissions manually
};

export function MyComponent() {
  // Initialize once when component did mount
  // Execute returned function when component will unmount to avoid memory leaks
  React.useEffect(() => {
    // This will set up CallKeep and register device for incoming calls
    return RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken, options);

    // Or use initializeCallKeep if you just want to make outgoing calls
    // return RNTwilioPhone.initializeCallKeep(callKeepOptions, fetchAccessToken, options);
  }, []);

  // Function that starts an outgoing call
  async function startCall() {
    try {
      await RNTwilioPhone.startCall("+00123456789");
    } catch (e) {
      console.log(e);
    }
  }

  // Call this function to unregister device from incoming calls
  // Useful when user signs out for example
  async function unregister() {
    try {
      await RNTwilioPhone.unregister();
    } catch (e) {
      console.log(e);
    }
  }

  // Display active calls
  console.log(RNTwilioPhone.calls);

  // ...
}

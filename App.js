import React from "react";
import Routes from "./src/Routes";

//UI Kitten
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { FeatherIconsPack } from "./feather-icons";
import { ThemeContext } from "./theme-context";

// Contexts
import AuthState from "./src/contexts/auth/AuthState";
import LeadState from "./src/contexts/lead/LeadState";
import ActivityState from "./src/contexts/activity/ActivityState";
import SubstatusState from "./src/contexts/substatus/SubstatusState";
import StatusState from "./src/contexts/status/StatusState";
import CommentState from "./src/contexts/comment/CommentState";
import ChartState from "./src/contexts/charts/ChartState";
import AppointmentState from "./src/contexts/appointment/AppointmentState";

import Toast from "react-native-toast-message";

const App = () => {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <IconRegistry icons={FeatherIconsPack} />
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <AuthState>
            <LeadState>
              <ActivityState>
                <StatusState>
                  <SubstatusState>
                    <CommentState>
                      <ChartState>
                        <AppointmentState>
                          <Routes />
                          <Toast ref={(ref) => Toast.setRef(ref)} />
                        </AppointmentState>
                      </ChartState>
                    </CommentState>
                  </SubstatusState>
                </StatusState>
              </ActivityState>
            </LeadState>
          </AuthState>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
  // async function sendPushNotification(expoPushToken) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: "default",
  //     title: "Original Title",
  //     body: "And here is the body!",
  //     data: { someData: "goes here" },
  //   };

  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }



export default () => {
  return <App />;
};

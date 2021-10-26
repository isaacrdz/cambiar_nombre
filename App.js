import React, { useEffect } from "react";
import Routes from "./src/Routes";

//UI Kitten
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
// import { FeatherIconsPack } from "./feather-icons";
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
import VisitState from "./src/contexts/visit/VisitState";
import StoreState from "./src/contexts/store/StoreState";
import VehicleState from "./src/contexts/vehicle/VehicleState";
import SourceState from "./src/contexts/source/SourceState";
import CompanyState from "./src/contexts/company/CompanyState";
import ListState from "./src/contexts/list/ListState";
import DocumentState from "./src/contexts/document/DocumentState";
import UserState from "./src/contexts/user/UserState";
import NotificationState from "./src/contexts/notification/NotificationState";

import Toast from "react-native-toast-message";
import MailState from "./src/contexts/mail/MailState";
import MakeState from "./src/contexts/make/MakeState";

const App = () => {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {/* <IconRegistry icons={FeatherIconsPack} /> */}
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <AuthState>
            <LeadState>
              <DocumentState>
                <CompanyState>
                  <ListState>
                    <MailState>
                      <VehicleState>
                        <SourceState>
                          <StoreState>
                            <MakeState>
                            <ActivityState>
                              <StatusState>
                                <SubstatusState>
                                  <CommentState>
                                    <ChartState>
                                      <UserState>
                                        <AppointmentState>
                                          <VisitState>
                                            <NotificationState>
                                              <Routes />
                                              <Toast
                                                ref={(ref) => Toast.setRef(ref)}
                                              />
                                            </NotificationState>
                                          </VisitState>
                                        </AppointmentState>
                                      </UserState>
                                    </ChartState>
                                  </CommentState>
                                </SubstatusState>
                              </StatusState>
                            </ActivityState>
                            </MakeState>
                          </StoreState>
                        </SourceState>
                      </VehicleState>
                    </MailState>
                  </ListState>
                </CompanyState>
              </DocumentState>
            </LeadState>
          </AuthState>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

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

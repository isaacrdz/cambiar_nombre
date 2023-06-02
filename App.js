import React from "react";
import Routes from "./src/Routes";

//UI Kitten
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ThemeContext } from "./theme-context";

// Contexts
import AuthState from "./src/contexts/auth/AuthState";
import ChartState from "./src/contexts/charts/ChartState";
import StoreState from "./src/contexts/store/StoreState";
import SourceState from "./src/contexts/source/SourceState";
import ActivityState from "./src/contexts/activity/ActivityState";
import AppointmentState from "./src/contexts/appointment/AppointmentState";
import CommentState from "./src/contexts/comment/CommentState";
import CompanyState from "./src/contexts/company/CompanyState";
import DocumentState from "./src/contexts/document/DocumentState";
import LeadState from "./src/contexts/lead/LeadState";
import ListState from "./src/contexts/list/ListState";
import MailState from "./src/contexts/mail/MailState";
import NotificationState from "./src/contexts/notification/NotificationState";
import SubstatusState from "./src/contexts/substatus/SubstatusState";
import UserState from "./src/contexts/user/UserState";
import VehicleState from "./src/contexts/vehicle/VehicleState";
import VisitState from "./src/contexts/visit/VisitState";

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
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <AuthState>
            <ChartState>
              <StoreState>
                <SourceState>
                  <ActivityState>
                    <AppointmentState>
                      <CommentState>
                        <CompanyState>
                          <DocumentState>
                            <LeadState>
                              <ListState>
                                <MailState>
                                  <NotificationState>
                                    <SubstatusState>
                                      <UserState>
                                        <VehicleState>
                                          <VisitState>
                                            <Routes />
                                            <Toast
                                              ref={(ref) => Toast.setRef(ref)}
                                            />
                                          </VisitState>
                                        </VehicleState>
                                      </UserState>
                                    </SubstatusState>
                                  </NotificationState>
                                </MailState>
                              </ListState>
                            </LeadState>
                          </DocumentState>
                        </CompanyState>
                      </CommentState>
                    </AppointmentState>
                  </ActivityState>
                </SourceState>
              </StoreState>
            </ChartState>
          </AuthState>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default () => {
  return <App />;
};

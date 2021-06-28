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

import Toast from 'react-native-toast-message';

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
                    <Routes />
                    <Toast ref={(ref) => Toast.setRef(ref)} />
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
};

export default () => {
  return <App />;
};

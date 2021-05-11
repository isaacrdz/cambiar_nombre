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

const App = () => {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <IconRegistry icons={FeatherIconsPack} />
      <ApplicationProvider {...eva} theme={eva[theme]}>
        <AuthState>
          <LeadState>
            <Routes />
          </LeadState>
        </AuthState>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export default () => {
  return <App />;
};

import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { ConfigProvider } from "antd";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import themeColors from "../config/themeColors";
import { Main } from "./Main/Main";
import ROUTES from "../config/routes";
import { Bills } from "./Bills/Bills";
import { Auth } from "./Auth/Auth";
import { useEffect } from "react";
import { useUserStore } from "../hooks/useUserStore";

function AppContent() {
  const { isDarkTheme } = useTheme();
  const theme = isDarkTheme ? themeColors.dark : themeColors.light;
  const fetchUserData = useUserStore((state) => state.fetch);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.primary,
          colorBgBase: theme.background,
          colorTextBase: theme.text,
        },
      }}
    >
      <Routes>
        <Route path={ROUTES.home} element={<Home />}>
          <Route index element={<Navigate to={`${ROUTES.main}/express`} replace />} />

          <Route path={ROUTES.main} element={<Navigate to={`${ROUTES.main}/express`} replace />} />
          <Route path={`${ROUTES.main}/:tabKey`} element={<Main />} />

          <Route path={ROUTES.bills} element={<Bills />} />

          <Route path={ROUTES.auth} element={<Auth />} />

        </Route>
      </Routes>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

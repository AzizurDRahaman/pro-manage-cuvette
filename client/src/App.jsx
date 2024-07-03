import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/pages/Authentication/Signin";
import Register from "./components/pages/Authentication/Register";
import { useContext } from "react";
import { AuthContext } from "./AuthContext/AuthContext";
import Home from "./components/pages/Home/Home";
import Layout from "./components/UI/Layout/Layout";
import Analysis from "./components/pages/Analysis/Analysis";
import Settings from "./components/pages/Settings/Settings";
import Detail from "./components/pages/Detail/Detail";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />
      <Route
        path="/analytics"
        element={
          isAuthenticated ? (
            <Layout>
              <Analysis />
            </Layout>
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <Layout>
              <Settings />
            </Layout>
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/task/:taskId" element={<Detail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

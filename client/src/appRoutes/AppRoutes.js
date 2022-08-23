import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Dashboard from "../pages/Dashboard";
import UserAuth from "../pages/UserAuth";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route path="/user-auth" element={<UserAuth />} />
    </Routes>
  );
}

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppRoutes from "./appRoutes/AppRoutes";
import UserAuth from "./pages/UserAuth";

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;

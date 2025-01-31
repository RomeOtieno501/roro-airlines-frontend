import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/Routes";
import "./styles/styles.css";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <AppRoutes />
    </React.Fragment>
  );
}

export default App;

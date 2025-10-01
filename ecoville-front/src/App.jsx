import { Route, Routes } from "react-router";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Places from "./pages/Places/Places";
import RegisterPlace from "./pages/RegisterPlace/RegisterPlace";
import { ToastContainer } from "react-toastify";

function App() {

  

  return (
    <>
      {/* MENU */}
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/criar-conta" Component={Register} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/locais" Component={Places} />
        <Route path="/locais/novo" Component={RegisterPlace} />
      </Routes>
       {/* RODAPE */}
       <ToastContainer />
    </>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import Reset from "./pages/auth/reset";
import Verify from "./pages/auth/verify";
import SignUp from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import Finish from "./pages/finish";
import Account from "./pages/account";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Landing />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Reset />} path="/reset"></Route>
          <Route element={<Verify />} path="/verify"></Route>
          <Route element={<SignUp />} path="/signup"></Route>
          <Route element={<Dashboard />} path="/dashboard"></Route>
          <Route element={<Finish />} path="/finish"></Route>
          <Route element={<Account />} path="/account"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

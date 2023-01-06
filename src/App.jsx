import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import Reset from "./pages/auth/reset";
import Verify from "./pages/auth/verify";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Landing />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Reset />} path="/reset"></Route>
          <Route element={<Verify />} path="/verify"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

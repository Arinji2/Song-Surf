import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Landing />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

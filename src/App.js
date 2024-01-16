import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import "./App.css";
//import Login from "./component/login";
import AuthPage from "./component/AuthPage";
import UploadPage from "./component/UploadPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<AuthPage />} />

          <Route path="/upload" component={UploadPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

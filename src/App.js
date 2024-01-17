import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import "./App.css";
import AuthPage from "./component/AuthPage";
import UploadPage from "./component/UploadPage";
import { AuthProvider } from "./component/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import UserProfile from "./component/UserProfile";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

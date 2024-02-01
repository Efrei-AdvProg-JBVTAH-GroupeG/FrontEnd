import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import "./App.css";
import AuthPage from "./auth/AuthPage";
import UploadPage from "./page/UploadPage";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import UserProfile from "./page/UserProfile";

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

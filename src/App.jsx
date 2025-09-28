import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"
import Login from "./login/login";
import Register from "./login/Registration";
import CalenderApp from "./Components/CalenderApp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route
              path="/calendar"
              element={
                <div className="container">
                  <CalenderApp />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/calendar" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

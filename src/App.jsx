import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./supabase"; // tilpass path
import Login from "./login/login";
import Register from "./login/Registration";
import CalenderApp from "./Components/CalenderApp";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hent eksisterende session ved reload
    const initAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Feil ved henting av session:", error.message);
        setUser(null);
      } else {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    };

    initAuth();

    // Lytt på login/logout-endringer
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return null; // evt. en loader/spinner
  }

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

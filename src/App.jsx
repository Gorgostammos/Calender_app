import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./login/login";
import Register from "./login/Registration";
import CalenderApp from "./Components/CalenderApp";
import "./Components/CalenderApp.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lytt etter endringer i auth-state
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {!user ? (
        <>
          <Login />
          <Register />
        </>
      ) : (
        <div className="container">
          <CalenderApp />
        </div>
      )}
    </div>
  );
}

export default App;

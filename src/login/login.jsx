import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./loggin.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/calendar"); // send bruker til kalender
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Feil e-post eller passord");
    }
  };

  return (
    <div className="logg">
      <h2>Login Form</h2>
      <div className="loggin">

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && (
          <span style={{ color: "red" }}>*Email* is mandatory</span>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && (
          <span style={{ color: "red" }}>*Password* is mandatory</span>
        )}

        <input
          type="submit"
          value="Login"
          style={{ backgroundColor: "#a1eafb" }}
        />
      </form>

      <p>
        Har du ikke konto? <Link to="/register">Registrer deg her</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;

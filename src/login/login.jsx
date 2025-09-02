import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // husk å ha firebase.js klar
import "./App.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Logger inn bruker med Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log(
        `${userCredential.user.displayName || "Bruker"} er logget inn`
      );
    } catch (err) {
      console.error("Innlogging feilet:", err.message);
    }
  };

  return (
    <>
      <h2>Login Form</h2>

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

        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}

export default Login;

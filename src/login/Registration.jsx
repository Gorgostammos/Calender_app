import React from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"; // husk å lage firebase.js som initierer Firebase
import "./App.css";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Oppretter bruker i Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Oppdaterer profil med navn
      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      console.log(`${data.name} er registrert med e-post: ${data.email}`);
    } catch (err) {
      console.error("Feil ved registrering:", err.message);
    }
  };

  return (
    <>
      <h2>Registration Form</h2>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
        />
        {errors.name && (
          <span style={{ color: "red" }}>*Name* is mandatory</span>
        )}

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
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
        />
        {errors.password && (
          <span style={{ color: "red" }}>
            *Password* is mandatory (min 6 characters)
          </span>
        )}

        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}

export default Register;

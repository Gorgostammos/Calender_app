import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../supabase"; // tilpass path
import "./loggin.css";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          // lagre navn som user_metadata
          data: {
            name: data.name,
          },
        },
      });

      if (error) {
        console.error("Feil ved registrering:", error.message);
        alert(error.message);
        return;
      }

      console.log(`${data.name} er registrert med e-post: ${data.email}`);
      // Hvis du vil: redirect til login eller calendar her
      // navigate("/login")
    } catch (err) {
      console.error("Uventet feil ved registrering:", err);
      alert("Noe gikk galt ved registrering. Prøv igjen.");
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

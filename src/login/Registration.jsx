import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
import "./loggin.css";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
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
      alert("Bruker registrert. Du kan nå logge inn.");
      navigate("/login");
    } catch (err) {
      console.error("Uventet feil ved registrering:", err);
      alert("Noe gikk galt ved registrering. Prøv igjen.");
    }
  };

  return (
    <div className="login-container">
      <div className="logg">
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

          <input
            type="submit"
            value="Registrer"
            style={{ backgroundColor: "#a1eafb" }}
          />
        </form>

        <p>
          Har du allerede konto? <Link to="/login">Logg inn her</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
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
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        alert(error.message); // vis faktisk feilmelding
        return;
      }

      console.log("Innlogget:", authData);
      navigate("/calendar");
    } catch (err) {
      console.error("Uventet feil ved innlogging:", err);
      alert("Noe gikk galt. Prøv igjen.");
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

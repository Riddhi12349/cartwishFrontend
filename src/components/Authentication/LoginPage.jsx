import React, { useRef, useState } from "react";
import "./LoginPage.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "../../Services/userServices";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(5),
  password: z.string().min(8, { message: "Please enter at least 8 digit " }),
});
const LoginPage = () => {
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const { data } = await login(formData);
      localStorage.setItem("token", data.token);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter Your Email"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter Your Password"
              {...register("password")}
            />{" "}
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
export default LoginPage;

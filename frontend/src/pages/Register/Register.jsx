import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.lang);




  const sendRequest = () => {
    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: Username,
        password: Password,
        confirmPassword: ConfirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        sessionStorage.setItem("token", result.token);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const inputHandler = () => {
    sendRequest();
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    navigate("/login");
  };
  return (
    <div className="container mt-5">
          <div className="card shadow-sm" style={{ borderRadius: "1rem",maxWidth:"500px",marginLeft:"auto",marginRight:"auto" }}>
            <div className="card-body p-5 text-center">
                <form>
                  <h2 className="fw-bold mb-4">{lang === "en" ? "Sign up" : "Регистрирай се"}</h2>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="username"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control form-control-md"
                    />
                    <label className="form-label">{lang === "en" ? "Username" : "Потребителско име"}</label>
                  </div>

                  <div className="form-outline form-white mb-3">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control form-control-md"
                    />
                    <label className="form-label">{lang === "en" ? "Password" : "Парола"}</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={ConfirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control form-control-md"
                    />
                    <label className="form-label">{lang === "en" ? "Confirm Password" : "Потвърди парола"}</label>
                  </div>

                  <button
                    className="btn btn-outline-dark btn-md px-5"
                    onClick={() => inputHandler()}
                    type="submit"
                  >
                    {lang === "en" ? "Register" : "Регистрирай се"}
                  </button>
                </form>
            </div>
          </div>
        </div>
  );
};

export default Register;
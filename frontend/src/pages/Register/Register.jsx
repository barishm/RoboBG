import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();



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
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-sm" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-3 mt-md-1 pb-3">
                <form>
                  <h2 className="fw-bold mb-3">Sign up</h2>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="username"
                      value={Username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control form-control-md"
                    />
                    <label className="form-label">Username</label>
                  </div>

                  <div className="form-outline form-white mb-3">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control form-control-md"
                    />
                    <label className="form-label">Password</label>
                  </div>

                  <div className="form-outline form-white mb-5">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={ConfirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control form-control-md"
                    />
                    <label className="form-label">Confirm Password</label>
                  </div>

                  <button
                    className="btn btn-outline-dark btn-md px-5"
                    onClick={() => inputHandler()}
                    type="submit"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [Username,setUsername] = useState("");
    const [Password,setPassword] = useState("");
    const navigate = useNavigate();
    const sendRequest = () => {
        fetch("http://localhost:8000/auth/authenticate",{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body : JSON.stringify({
                username : Username,
                password: Password,
            }),
        })
        .then((res) => res.json())
        .then((result) => {
            sessionStorage.setItem("token", result.token);
            navigate("/admin");
          })
        .catch((err) => console.log(err))
    }

    const loginHandler = () => {
        sendRequest();
        setUsername("");
        setPassword("");
    }

    


    return(
        <div className="login-form">
            <div className="mb-3">
                <input type="username" value={Username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Username"/>
                <br></br>
                <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleFormControlInput2" placeholder="Password"/>
            </div>
            <button type="button" onClick={() => loginHandler()} className="btn btn-primary">Login</button>
        </div>
    )
}
export default Auth;
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../app/authSlice'
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../app/services/authApiSlice";


const Auth = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const dispatch = useDispatch()

    
    

    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
          const userData = await login({ username, password }).unwrap()
          const decoded = jwtDecode(userData.access_token);
          const user = decoded.sub;
          const role = decoded.role;
          const accessToken = userData.access_token;
          
          dispatch(setCredentials({ user, role, accessToken }))
          localStorage.setItem('refreshToken', JSON.stringify(userData.refresh_token))
          setUsername('')
          setPassword('')
          navigate('/')
      } catch (err) {
          console.log(err);
      }
  }


  
    return(
        <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-sm" style={{ borderRadius: '1rem' }}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-3 mt-md-2 pb-3">
              <form onSubmit={handleSubmit}>

              <h2 className="fw-bold mb-3">Sign in</h2>
              <p className="mb-3">Please enter your username and password!</p>

              <div className="form-outline form-white mb-4">
                <input type="username" name="username" value={username} required onChange={(e) => {setUsername(e.target.value)}} className="form-control form-control-md" />
                <label className="form-label">Username</label>
              </div>

              <div className="form-outline form-white mb-3">
                <input type="password" autoComplete="new-password" value={password} required onChange={(e) => {setPassword(e.target.value)}} name="password" className="form-control form-control-md" />
                <label className="form-label">Password</label>
              </div>


              <button className="btn btn-outline-dark btn-md px-5" type="submit">Login</button>
              </form> 
            </div>

            <div>
              <p className="mb-0">Don't have an account? <a href="/register" className="fw-bold">Sign Up</a></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
    )
}
export default Auth;
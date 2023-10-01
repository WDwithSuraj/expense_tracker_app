/* eslint-disable no-undef */
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, } from "react-router-dom"
import { styled } from "styled-components";
import axios from "axios"
import { useState } from 'react';
import { useDispatch } from "react-redux"
import { userLoggedIn } from '../redux/action';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()




  const handleLogin = async (userData) => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, userData)
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.existingUser))
        dispatch(userLoggedIn())
        navigate("/dashboard")
      })
      .catch((err) => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {
      email, password
    }
    handleLogin(userData)
  }

  return (
    <DIV className="login">
      <h3>For Better Experience, Open the page in 80%</h3>
      <div className="avatar">
        <img src="https://2.bp.blogspot.com/-WdNReAvdDFM/VrocQdIoHbI/AAAAAAAAR1M/SEBM2vUBMog/s1600/SID_FB_001.gif" alt="" />
      </div>
      <h2>Login</h2>


      <form onSubmit={handleSubmit} className="login-form">
        <div className="textbox">
          <FaUser />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        </div>
        <div className="textbox">
          <RiLockPasswordFill />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        </div>
        <button type="submit">LOGIN</button>
        <Link to="/signup">New User? Register here!</Link>
      </form>
    </DIV>
  )
}


const DIV = styled.div`
    
  position: fixed;
  z-index: 3;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 30%;
  padding: 70px 30px 44px;
  border-radius: 22px;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  text-align: center;
  margin : auto;


@media (width >= 450px) {
  .login {
    width: 380px;
  }
}

.avatar {
  margin: 0 auto 16px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #157ae1, #c7a1ff);
  padding: 2px;
  width: 120px;
  height: 120px;
}

.avatar > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #161616;
}

.login > h2 {
  font-size: 36px;
  font-weight: 500;
  margin: 0 0 4px;
}

.login > h3 {
  color: rgba(255, 255, 255, 0.38);
  margin: 0 0 30px;
  font-weight: 500;
  font-size: 16px;
}

.login-form {
  display: grid;
  gap: 16px;
  place-items: center;
  width: 100%;
  margin: 0;
}

.textbox {
  width: 80%;
  margin : auto;
}

.textbox span {
  position: absolute;
  top: 50%;
  left: 16px;
  translate: 0 -50%;
  color: rgba(255, 255, 255, 0.38);
}

.login-form input,
.login-form button {
  width: 60%;
  height: 60px;
  outline: none;
  padding: 0;
  font-family: inherit;
  font-size: 16px;
  border-radius: 8px;
  margin : auto;
}

.login-form input {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.1);
  font-size: 18px;
  padding: 0 15px 0 10px;
  color: inherit;
}

.login-form input:focus{
  border-color: #157ae1;
}

.login-form input:focus ~ span {
  color: #157ae1;
}

.login-form button {
  cursor: pointer;
  background: #157ae1;
  color: #f9f9f9;
  border: 0;
  font-weight: 600;
  letter-spacing: 2px;
  width : 30%;
  
}

.login-form a {
  color: #157ae1;
  font-size: 16px;
  text-align: left;
  text-decoration: none;
}
`

export default Login






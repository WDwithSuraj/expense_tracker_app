import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export const SignUp = () => {
    const [fullName, setFullName] = useState("")
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const userRegister = async (userData) => {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/register`, userData)
            .then((res) => {
                alert(res.data.message)
                navigate("/")
            })
            .catch((err) => alert(err.response.data.msg))
    }


    const handleSignUp = (e) => {
        e.preventDefault();
        const userData = {
            name: fullName,
            age,
            gender,
            email,
            password
        }
        console.log(userData)
        userRegister(userData)
    }


    return (
        <WRAPPER className="login-card">
            <img src={"https://cdn.dribbble.com/users/129991/screenshots/4495463/user_sign_up.gif"} alt="imagelogo" />
            <h2>Sign Up</h2>
            <form className="login-form" onSubmit={handleSignUp}>
                <div className="username">
                    <input
                        className="control"
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <div id="spinner" className="spinner"></div>
                </div>
                <div className="first_last">
                    <div className="firstname">
                        <input
                            className="control_firstname"
                            type="text"
                            placeholder="Age"
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                        <div id="spinner" className="spinner"></div>
                    </div>
                    <div className="lastname">
                        <input

                            className="control_lastname"
                            type="text"
                            placeholder="Gender"
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <div id="spinner" className="spinner"></div>
                    </div>
                </div>
                <div className="username">
                    <input
                        className="control"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div id="spinner" className="spinner"></div>
                </div>
                <input
                    name="password"
                    className="control"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="control" type="submit">
                    JOIN NOW
                </button>
                <Link to="/">Back to Login</Link>
            </form>
        </WRAPPER>
    );
};



const WRAPPER = styled.div`
    height: 90vh;
    margin:auto;
    margin-top: 10px;
    width: 400px;
    padding: 60px 30px 32px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 1.25rem;
    background: #ffffff;
    text-align: center;
    transition: 0.4s;


h2 {
    font-size: 36px;
    font-weight: 600;
    margin: 0 0 30px;
}

 img {
    width: 200px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    padding: 5px;
    margin-bottom: 10px;
}

.login-form {
    width: 100%;
    margin: 0;
    display: grid;
}

.login-form input.control::placeholder {
    color: #9d9fbd;
}

.control_firstname {
    border: 1.5px solid #dfe1f0;
    outline: none;
    width: 95%;
    margin-right: 6px;
    height: 56px;
    padding: 0 16px;
    background: #f6f7ff;
    color: inherit;
    border-radius: 6px;
    margin: 8px 0;
    font-family: inherit;
    text-align: left;
    font-size: 18px;
    transition: 0.4s;
}
.control_lastname {
    border: 1.5px solid #dfe1f0;
    outline: none;
    width: 95%;
    height: 56px;
    padding: 0 16px;
    background: #f6f7ff;
    color: inherit;
    border-radius: 6px;
    margin: 8px 0;
    font-family: inherit;
    text-align: left;
    font-size: 18px;
    transition: 0.4s;
}

.first_last {

    display: flex;
    justify-content: space-between;
}
.control {
    border: 1.5px solid #dfe1f0;
    outline: none;
    width: 100%;
    height: 56px;
    padding: 0 16px;
    background: #f6f7ff;
    color: inherit;
    border-radius: 6px;
    margin: 8px 0;
    font-family: inherit;
    text-align: left;
    font-size: 18px;
    transition: 0.4s;
}

button.control {
    cursor: pointer;
    width: 100%;
    height: 56px;
    padding: 0 16px;
    background: linear-gradient(-45deg, #157ae1, #c7a1ff);
    color: #f7f7f7;
    border: 0;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2px;
    transition: all 0.375s;
}


`
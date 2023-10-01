
import { styled } from "styled-components"
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <DIV className="navContainer">
            <IoArrowBack className="previon-button" onClick={() => navigate("/")} />
            <h2>Expense Tracker</h2>
            <AiOutlineDashboard className="user-icon" onClick={() => navigate("/dashboard")} />
        </DIV>
    )
}

const DIV = styled.div`

    width: 100%;
    margin: auto;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: black;
    color: white;
    padding: 0 20px 0 20px ;

    .user-icon {
        width: 30px;
        height: 30px;
    }

    .previon-button{
        width: 30px;
        height: 30px;
    }
`

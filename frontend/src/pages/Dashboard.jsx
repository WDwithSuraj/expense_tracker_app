import { useEffect } from 'react';
import { AddExpenseForm } from '../components/AddExpenseForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFailureAction, fetchRequestAction, fetchSuccessAction } from '../redux/action';
import LineChart from '../components/AllChart';
import { styled } from "styled-components"
import { ExpenseCard } from '../components/ExpenseCard';


export const Dashboard = () => {
    const jwtToken = localStorage.getItem("token")
    const userData = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const { expenses } = useSelector((store) => store.expenseReducer)

    let tatalExpense = 0;
    expenses.forEach((el) => {
        tatalExpense += el.amount
    })

    const getUsersAllExpense = () => {
        dispatch(fetchRequestAction())
        fetch(`${import.meta.env.VITE_SERVER_URL}/expense`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        }).then((res) => res.json())
            .then((res) => {
                dispatch(fetchSuccessAction(res.data))
            })
            .catch((err) => {
                alert(err.message)
                dispatch(fetchFailureAction())
            })
    }

    useEffect(() => {
        getUsersAllExpense()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogOut = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (<>
        <DIV className="main-container">
            <div className='expense-container'>
                <LineChart />
                <div className="expense-dettails">
                    <h3>ID</h3>
                    <h3>Description</h3>
                    <h3>Category</h3>
                    <h3>Amoung</h3>
                    <h3>Date</h3>
                </div>
                <div className="recent-expense-container">
                    <ExpenseCard />
                </div>
            </div>
            <div className="details-container">
                <div className='user-container'>
                    <h1>User Info</h1>
                    <h2>Name : {userData.name}</h2>
                    <h2>Age : {userData.age} </h2>
                    <h2>Gender: {userData.gender} </h2>
                    <h2>Email: {userData.email} </h2>
                    <h2>Total Exp: {tatalExpense} </h2>

                    <button onClick={handleLogOut}>Log Out</button>
                </div>
                <div><AddExpenseForm /></div>
            </div>
        </DIV>
    </>
    )


}


const DIV = styled.div`
        width: 98%;
        margin: auto;
        margin-top: 10px;
        /* border : 1px solid red; */
        display: flex;
        height: 90vh;
        justify-content: space-evenly;
        .expense-container {
            padding: 7px;
            width: 72%;
            border : 1px solid black;
        } 
        .expense-dettails {
           display: flex;
            border: 1px solid black;
            justify-content: space-evenly;
            align-items: center;
            height: 40px;
            position: fixed;
            z-index: 1;
            width:69.5%;
            background-color: black;
            color: white;
        }
        .details-container {
            width: 23%;
            border: 1px solid green;
        }

        .user-container {
            width : 95%;
            margin: auto;
            height: 48%;
            border: 1px solid grey;
            text-align: left;
        }
        .user-container > h1 {
            background-color: black;
            color : white;
            text-align: center;
        }
        .user-container > h2 {
            line-height:40px;
            margin-left: 15px;
        }

        .user-container > button {
            font-size: 1rem;
            font-weight: 700;
            padding:11px;
            margin: 7px;
            margin-left: 15px;
            background-color: black;
            color: white;
        }
        .user-container > button:hover {
            background-color: #2e2d2d;
            color:white;
        }
        .recent-expense-container {
            width: 100%;
            max-height: 40%;
            text-align: left;
            overflow: auto;
            margin-top: 40px;
        }

        `



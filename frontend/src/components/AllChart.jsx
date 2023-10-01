/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchFailureAction, fetchRequestAction, fetchSuccessAction } from '../redux/action'
import styled from 'styled-components'


function LineChart() {
    const dispatch = useDispatch()
    const { expenses } = useSelector((store) => store.expenseReducer)
    const jwtToken = localStorage.getItem("token")
    let personalExpense = [];
    let businessExpense = []
    let transactionDate = []
    let totalPersnolExpense = 0;
    let totalBusinessExpense = 0

    expenses.forEach((el) => {
        transactionDate.push(el.date)
        if (el.category == "personal") {
            totalPersnolExpense += el.amount
            personalExpense.push(el.amount)
        } else {
            totalBusinessExpense += el.amount
            businessExpense.push(el.amount)
        }
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
    }, [])


    let lineData = {
        labels: transactionDate,
        datasets: [
            {
                id: 1,
                label: 'Personal',
                data: personalExpense,
            },
            {
                id: 2,
                label: 'Work',
                data: businessExpense,
            },
        ],
    }
    const doughData = {
        labels: [
            'Personal',
            'Business',
        ],
        datasets: [{
            label: 'Total Expense',
            data: [totalPersnolExpense, totalBusinessExpense],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        }]
    };

    return (<>
        <DIV>
            <div style={{ width: "90%" }}>
                <Bar data={lineData} />

            </div>
            <div style={{ width: "40%" }}>
                <Doughnut data={doughData} />
            </div>
        </DIV>
    </>
    )
}

const DIV = styled.div`
        display: flex;
        width: 100%;
        border : 1px solid black;
        justify-content: space-between;
        height: 55%;
`

export default LineChart
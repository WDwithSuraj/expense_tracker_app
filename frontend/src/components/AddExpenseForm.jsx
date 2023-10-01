import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { editSuccessAction, fetchFailureAction, fetchRequestAction, fetchSuccessAction } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

export const AddExpenseForm = () => {
    const [desc, setDesc] = useState("");
    const [cate, setCate] = useState("");
    const [amt, setAmt] = useState("");
    const [date, setDate] = useState("")
    const [formReset, setFormReset] = useState(false)
    const token = localStorage.getItem("token")
    const editData = useSelector((store) => store.editReducer)
    const jwtToken = localStorage.getItem("token")
    const dispatch = useDispatch()


    useEffect(() => {
        setDesc(editData.description)
        setCate(editData.category)
        setAmt(editData.amount)
        setDate(editData.date)
        setFormReset(false)
    }, [editData])


    const getUsersAllExpens = () => {
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

    const addNewExpense = async (expenseData) => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/expense/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(expenseData)
        })
            .then((res) => res.json())
            .then((res) => {
                getUsersAllExpens()
                alert(res.msg)
                resetField()
            })
            .catch((err) => console.log(err))
    }

    const editExpense = async (id, expenseData) => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/expense/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(expenseData)
        }).then((res) => res.json())
            .then((res) => {
                getUsersAllExpens()
                alert(res.msg)
                dispatch(editSuccessAction())
            })
            .catch((err) => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const expenseData = {
            description: desc,
            category: cate,
            amount: amt,
            date: date
        }

        if (editData._id && !formReset) {
            return editExpense(editData._id, expenseData)
        } else {
            return addNewExpense(expenseData)
        }
    }

    const handleReset = (e) => {
        e.preventDefault()
        setFormReset(true)
        resetField()
    }

    const resetField = () => {
        setDesc("")
        setCate("")
        setAmt("")
        setDate("")
    }

    return (
        <DIV
            className='add-expense-container'>
            <h1>Add New Expenses</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="form-desc">
                    <input type="text" placeholder='Add Description' onChange={(e) => setDesc(e.target.value)} value={desc} />
                </div>
                <div className="form-cate">
                    <select value={cate} onChange={(e) => setCate(e.target.value)}>
                        <option value="">Category</option>
                        <option value="business">Business</option>
                        <option value="personal">Personal</option>
                    </select>
                </div>
                <div className="form-amount">
                    <input value={amt} type="number" onChange={(e) => setAmt(Number(e.target.value))} placeholder='Enter Amount' />
                </div>
                <div className="form-date">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <p className="import-note">Once edited, please reset to add new product!</p>
                <div className="action-button">
                    <button type="submit" className="add-expnse-btn">Add</button>
                    <button type="reset" className="add-expnse-btn">Reset</button>
                </div>
            </form>
        </DIV>
    )
}


const DIV = styled.div`
    width: 95%;
    border:1px solid black;
    margin: auto;
    padding: 20px;

    h1 {
       
          background-color: black;
            color : white;
            text-align: center;
    }

    .import-note {
        font-size: 13px;
        margin-left: 5px;
        font-weight:700;
    }
    input,select {
        width: 100%;
        font-size: 1.5rem;
        padding: 5px;
        margin: 5px;
    }
    .action-button {
        width: 100%;
        margin: auto;
    }
     .action-button > button {
            font-size: 1rem;
            font-weight: 700;
            padding:11px;
            margin: 7px;
            margin-left: 5px;
            background-color: black;
            color: white;
        }
        .action-button > button:hover {
            background-color: #2e2d2d;
            color:white;
        }

    .add-expnse-btn{
        width: 40%;
        translate: 25%;
        font-size: 1.5rem;
        padding: 5px;
        margin: 5px;
    }
`
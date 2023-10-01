
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillEdit } from "react-icons/ai"
import { editRequestAction, fetchFailureAction, fetchRequestAction, fetchSuccessAction } from '../redux/action'

export const ExpenseCard = () => {
    const { expenses } = useSelector((store) => store.expenseReducer)
    const jwtToken = localStorage.getItem("token")
    const dispatch = useDispatch()

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


    const handleDelete = (id) => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/expense/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            }
        }).then((res) => res.json())
            .then((res) => {
                alert(res.msg)
                getUsersAllExpense()
            })
            .catch((err) => console.log(err))
    }


    const handleUpdate = (el) => {
        dispatch(editRequestAction(el))
    }

    return (
        < >
            {
                expenses.map((el, ind) => {
                    return <DIV key={ind} >
                        <h4>{ind + 1}</h4>
                        <h4>{el.description}</h4>
                        <h4>{el.category}</h4>
                        <h4>{el.amount}</h4>
                        <h4>{el.date}</h4>
                        <div >
                            <RiDeleteBin6Line className='custom-icons' onClick={() => handleDelete(el._id)} />
                            <AiFillEdit className='custom-icons' onClick={() => handleUpdate(el)} />
                        </div>
                    </DIV>
                })
            }
        </>
    )
}

const DIV = styled.div`
    display: flex;
    border: 1px solid black;
    justify-content: space-evenly;
    align-items: center;
    height: 40px;

    .custom-icons {
        margin: 0 0 0 15px ;
    }
`

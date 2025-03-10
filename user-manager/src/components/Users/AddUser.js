import React, { useState } from 'react'
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css'
const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState('');

    const usernameChangeHandler = (e) => {
        setEnteredUsername(e.target.value);
    }
    const ageChangeHandler = (e) => {
        setEnteredAge(e.target.value);
    }
    const addUserHandler = (e) => {
        e.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty values)'
            })
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid age (> 0)'
            })
            return;
        }
        props.onAddUser(enteredUsername, enteredAge)
        setEnteredUsername('');
        setEnteredAge('');
    }
    const errorHandler = () => {
        setError(null)
    }

    return (
        <>
            <Card className={classes.input}>
                <form>
                    <label htmlFor="username">Username</label>
                    <input id="username"
                        type="text"
                        onChange={usernameChangeHandler}
                        value={enteredUsername} />
                    <label htmlFor="age">Age</label>
                    <input id="age"
                        type="number"
                        onChange={ageChangeHandler}
                        value={enteredAge} />
                    <Button type="submit" onClick={addUserHandler}>Add User</Button>
                </form>
            </Card>
            {error && <ErrorModal title={error.title} message={error.message} onClick={errorHandler} />}
        </>
    )
}

export default AddUser

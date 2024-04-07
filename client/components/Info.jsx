// import React from 'react';
// import { useContext } from 'react';
// import {
//   useNavigate
// } from "react-router-dom";
// import "../css/style.css";
// import { UserContext } from '../UserProvider';


// function Info() {
//     const navigate=useNavigate()
//     const user=JSON.parse(localStorage.getItem("currentUser"))
//     const { userID } = useContext(UserContext);


//     function hideInfo(){
//         navigate(`/user/${userID}/home`)
//     }
//    return(
//     <>
//         <p> user name: {user.username}</p>
//         <p> email: {user.email}</p>
//         <p> phone: {user.phone}</p>
//         <p> address: {user.address}</p>
//         <button onClick={hideInfo}>Hide info</button>
        
//     </>
//    )
//    }
  
//   export default Info


import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import { UserContext } from '../UserProvider';
import CryptoJS from 'crypto-js';

function Info() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const { userID } = useContext(UserContext);
    const email = JSON.parse(localStorage.getItem("currentUser")).email;
    const token = localStorage.getItem("TOKEN");

    const generatePasswordHash = (password) => {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        return hashedPassword;
    };

    function handleChangePassword(event) {
        event.preventDefault();
        const currentPassword = prompt("Please enter your current password:");
        const password_hash = generatePasswordHash(currentPassword)
        fetch(`http://localhost:8080/passwords?email=${email}&password_hash=${password_hash}`)
        .then(response => response.json())
        .then(data => {
            if(Object.values(data[0])[0]==0){
                throw new Error(`fail update password`);  
            }
        })
        .then(() => updatePassword())
        .catch(error => {
            alert(error.message);
        });
    }

    function updatePassword() {
        const newPassword = prompt("Please enter your new password:");
        const verifyPassword = prompt("enter verify password:");
        if(verifyPassword == newPassword){    
            fetch(`http://localhost:8080/passwords?email=${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"password_hash": generatePasswordHash(newPassword)})
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update password');
                }
                return response.json();
            })
            .then(data => {
                alert("Password updated successfully!");
            })
            .catch(error => {
                console.error('Error updating password:', error);
                alert("Failed to update password. Please try again later.");
            });
        } else{
            alert("fail verify password");
        }
    }

    function hideInfo() {
        navigate(`/user/${userID}/home`)
    }

    return (
        <>
            <p> user name: {user.username}</p>
            <p> email: {user.email}</p>
            <p> phone: {user.phone}</p>
            <p> address: {user.address}</p>
            <a href="#" onClick={handleChangePassword}>Change Password</a>
            <br />
            <button onClick={hideInfo}>Hide info</button>

        </>
    )
}

export default Info
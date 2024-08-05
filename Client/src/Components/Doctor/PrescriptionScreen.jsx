import React from "react"
import { useEffect } from "react"
import { NavBar } from "../Home/NavBar"
import axios from "axios"

export const PrescriptionScreen = () => {

    const patients = async () => {
        const response = await axios.get('http://localhost:3001/getUsuarios');
        console.log(response);
    }
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log(userData);
        patients();
    }, []);
    return (
        <>
            {/* <NavBar /> */}
            <div></div>
        </>
    )
}
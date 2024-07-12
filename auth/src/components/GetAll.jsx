import React from 'react';
import axios from "axios";
import { getToken } from '../utils/common';

function GetAll() {
    const getTodos = async () => {
        try {
            const token = getToken();
            const auth = {
                headers: { Authorization: token }
            };

            let res = await axios.get("http://127.0.0.1:5000/getall", auth)

            console.log(res.data);  // Assuming you want to log the response data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <button onClick={getTodos}>Get All Todos</button>
    );
}

export default GetAll;

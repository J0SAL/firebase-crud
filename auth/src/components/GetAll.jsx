import React from 'react';
import axios from "axios";
import { getToken } from '../utils/common';

function GetAll() {
    const getTodos = async () => {
        try {
            const token = await getToken();
            let res = await axios.get("http://127.0.0.1:5000/getall", {
                'headers': {
                    'Authorization': token,
                },
                params: {

                },
            })

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

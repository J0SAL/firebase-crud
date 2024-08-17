import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';


var default_user = {
    user_name: "",
    locality: "",
};

function UserInfo() {

    const [user, setUser] = useState(default_user);
    const { addUser } = useAuth();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(user);
    }

    return (
        <div>
            <h2>User Information</h2>
            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "25vw",
                        width: "25vw",
                    }}
                >
                    Name{" "}
                    <input
                        type="text"
                        name="user_name"
                        value={user.user_name}
                        onChange={handleChange}
                    />
                    Locality{" "}
                    <input
                        type="text"
                        name="locality"
                        value={user.locality}
                        onChange={handleChange}
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default UserInfo
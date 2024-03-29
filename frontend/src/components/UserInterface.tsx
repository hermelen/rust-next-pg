'use client'

import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserInterfaceProps {
    backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [changeUser, setChangeUser] = useState({ id: '', name: '', email: '' });
    const backgroundColors: { [key: string]: string } = {
        rust: 'bg-orange-500',
    };

    const buttonColors: { [key: string]: string } = {
        rust: 'bg-orange-700 hover:bg-orange-600',
    };

    const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
    const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-500 hover:bg-gray-600';

    useEffect(() => {
        const fetchData = async () => {
            fetch(`${apiUrl}/api/${backendName}/users`)
            .then((response) => response.json())
            .then((response) => {
                setUsers(response.reverse());
            })
            .catch((err) => {
                console.error('Error getting data:', err);
            });
        }

        fetchData();
    }, [backendName, apiUrl]);

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch(`${apiUrl}/api/${backendName}/users`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        .then((response) => response.json())
        .then((response) => {
            setUsers([response, ...users]);
            setNewUser({ name: '', email: '' });
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentUser = users.find(u => u.id == changeUser.id)
        let putData = {};
        for (let key in changeUser) {
            if (changeUser[key] == "") {
                putData[key] = currentUser[key];
            } else if (key !== "id") {
                putData[key] = changeUser[key];
            }
        }
        await fetch(`${apiUrl}/api/${backendName}/users/${changeUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(putData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        .then((response) => {
            if (response.status === 200) {
                setChangeUser({ id: '', name: '', email: '' });
                setUsers(
                    users.map((user) => {
                        if (user.id === parseInt(changeUser.id)) {
                            let updatedData = {...user};
                            for (let key in putData) {
                                updatedData[key] = putData[key];
                            }
                            return updatedData;
                        }
                        return user;
                    })
                );                
            } else {
                console.error(response.status);
                return;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const deleteUser = async (userId) => {
        await fetch(`${apiUrl}/api/${backendName}/users/${userId}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.status === 200) {
                setChangeUser({ id: '', name: '', email: '' });
                setUsers(
                    users.filter((user) => {
                        return user.id !== userId;
                    })
                );
            } else {
                console.error(response.status);
                return;
            }
        });
    };

    return (
        <div className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}>
            <img src={`/${backendName}logo.svg`} alt={`${backendName} Logo`} className="w-20 h-20 mb-6 mx-auto" />
            <h2 className="text-xl font-bold text-center text-white mb-6">{`${backendName.charAt(0).toUpperCase() + backendName.slice(1)} Backend`}</h2>

            {/* Form to add new user */}
            <form onSubmit={createUser} className="mb-6 p-4 bg-blue-100 rounded shadow">
                <input
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="mb-2 w-full p-2 border border-gray-300 rounded"
                />

                <input
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="mb-2 w-full p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Add User
                </button>
            </form>

            {/* Form to update user */}
            <form onSubmit={updateUser} className="mb-6 p-4 bg-blue-100 rounded shadow">
                <input
                    placeholder="User ID"
                    value={changeUser.id}
                    onChange={(e) => setChangeUser({ ...changeUser, id: e.target.value })}
                    className="mb-2 w-full p-2 border border-gray-300 rounded"
                />
                <input
                    placeholder="New Name"
                    value={changeUser.name}
                    onChange={(e) => setChangeUser({ ...changeUser, name: e.target.value })}
                    className="mb-2 w-full p-2 border border-gray-300 rounded"
                />
                <input
                    placeholder="New Email"
                    value={changeUser.email}
                    onChange={(e) => setChangeUser({ ...changeUser, email: e.target.value })}
                    className="mb-2 w-full p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600">
                    Update User
                </button>
            </form>

            {/* Display users */}
            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                        <CardComponent card={user} />
                        <button onClick={() => deleteUser(user.id)} className={`${btnColor} text-white py-2 px-4 rounded`}>
                            Delete User
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInterface;
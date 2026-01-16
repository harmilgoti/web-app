import React, { useState } from 'react';
import { createUser } from '../api';
import { User } from '../types';

interface Props {
    onUserAdded: (user: User) => void;
}

export const UserForm: React.FC<Props> = ({ onUserAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newUser = await createUser({ name, email });
            onUserAdded(newUser);
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Failed to create user', error);
            alert('Failed to create user');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <h2>Add User</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add User</button>
        </form>
    );
};

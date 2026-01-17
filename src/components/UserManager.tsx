import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import type { User } from '../types';
import { UserForm } from './UserForm';
import { UserList } from './UserList';

export const UserManager: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserAdded = (newUser: User) => {
        setUsers([...users, newUser]);
    };

    return (
        <div className="user-manager">
            <h2>User Management</h2>
            {loading ? (
                <div className="loading">Loading users...</div>
            ) : (
                <>
                    <UserForm onUserAdded={handleUserAdded} />
                    <UserList users={users} />
                </>
            )}
        </div>
    );
};

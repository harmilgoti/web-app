import React from 'react';
import { User } from '../types';

interface Props {
    users: User[];
}

export const UserList: React.FC<Props> = ({ users }) => {
    return (
        <div className="card">
            <h2>User List</h2>
            <div className="user-list">
                {users.length === 0 ? (
                    <p style={{ color: '#888' }}>No users found.</p>
                ) : (
                    users.map((user) => (
                        <div key={user.id} className="user-item">
                            <div className="user-info">
                                <div><strong>{user.name}</strong></div>
                                <div style={{ fontSize: '0.9em', color: '#aaa' }}>{user.email}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

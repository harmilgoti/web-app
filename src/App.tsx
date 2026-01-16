import { useEffect, useState } from 'react';
import { getUsers } from './api';
import { User } from './types';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import './index.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>User Manager</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <UserForm onUserAdded={handleUserAdded} />
        <UserList users={users} />
      </div>
    </div>
  );
}

export default App;

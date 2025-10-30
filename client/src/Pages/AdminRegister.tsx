import { useState } from 'react';
import axios from 'axios';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post<{token: string}>('http://localhost:5000/api/users/admin/register', {
        username,
        email,
        password,
      });

      // Save the token to localStorage
      localStorage.setItem('authToken', response.data.token);

      alert('Registration Successful');
    } catch (error) {
      console.error(error);
      alert('Error AdminRegistering user');
    }
  };

  return (
    <form className='mt-5' onSubmit={handleAdminRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">AdminRegister</button>
    </form>
  );
};

export default AdminRegister;

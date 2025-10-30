import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../config";






const AdminStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        alert('No token found, please log in');
        return;
      }

      try {
  const response = await axios.get<{ status: string }>(`${API_BASE_URL}/admin/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
        setStatus(response.data.status);
      } catch (error) {
        console.error(error);
        alert('Access denied, you are not an admin');
      }
    };

    fetchAdminStatus();
  }, []);

  if (status === null) {
    return <p>Loading...</p>;
  }

  return <p>Admin Status: {status}</p>;
};

export default AdminStatus;

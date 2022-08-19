import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

function Logout() {
   const { logout } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      logout();
      navigate('/login');
   }, [logout, navigate]);
   return <div>You are being logout...</div>;
}

export default Logout;

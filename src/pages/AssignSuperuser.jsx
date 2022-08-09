import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import { Container, Paper, Button } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function AssignSuperuser() {
   const navigate = useNavigate();
   const { assignSuperuser } = useAuth();

   const handleSuperuserAssignment = () => {
      assignSuperuser().then((data) => console.log(data));
      navigate('/');
   };
   return (
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Button
               color="secondary"
               size="large"
               variant="contained"
               fullWidth
               startIcon={<AdminPanelSettingsIcon />}
               sx={{ py: 5, fontSize: '1.2rem' }}
               onClick={handleSuperuserAssignment}>
               Assign superuser
            </Button>
         </Paper>
      </Container>
   );
}

export default AssignSuperuser;

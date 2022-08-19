import { useContext } from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { ThemeContext } from 'context/theme-context';

export const DarkModeSwitch = () => {
   const { darkMode, setDarkMode } = useContext(ThemeContext);

   const handleModeSwitch = () => {
      setDarkMode((prevState) => !prevState);
      localStorage.setItem('darkMode', localStorage.getItem('darkMode') !== 'true');
   };
   return (
      <Box sx={{ ml: 3 }}>
         <Tooltip title="Change theme">
            <IconButton onClick={handleModeSwitch}>
               {darkMode ? <LightModeIcon /> : <DarkModeIcon sx={{ color: 'white' }} />}
            </IconButton>
         </Tooltip>
      </Box>
   );
};

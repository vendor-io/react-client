import { useState, useEffect } from 'react';
import { Tooltip, Fab, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const ScrollToTopFab = () => {
   const [visible, setVisible] = useState(false);

   const handleScroll = () => {
      const position = window.scrollY;
      if (position > 30) {
         setVisible(true);
      } else {
         setVisible(false);
      }
   };

   const scrollToTop = () => {
      window.scrollTo(0, 0);
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);
   return (
      visible && (
         <Box
            sx={{
               position: 'fixed',
               zIndex: 9999,
               bottom: '36px',
               right: '90px'
            }}>
            <Tooltip title="Scroll to top" arrow placement="top-end">
               <Fab
                  color="secondary"
                  aria-label="add"
                  onClick={scrollToTop}
                  size="small"
                  sx={{
                     '&:hover': {
                        color: '#000'
                     }
                  }}>
                  <ArrowUpwardIcon />
               </Fab>
            </Tooltip>
         </Box>
      )
   );
};

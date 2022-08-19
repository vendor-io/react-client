import { useState, useEffect } from 'react';

import styled, { keyframes } from 'styled-components';
import { Tooltip, Fab, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const fadeIn = keyframes`
from {
   opacity: 0
}

to {
   opacity: 1
}
`;

const FadeInFixedBox = styled(Box)`
   position: fixed;
   z-index: 999;
   bottom: 106px;
   right: 34px;
   animation: ${fadeIn} 0.3s linear;
`;

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);
   return (
      visible && (
         <FadeInFixedBox>
            <Tooltip title="Scroll to top" arrow placement="top">
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
         </FadeInFixedBox>
      )
   );
};

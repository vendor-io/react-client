import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';

import styled from 'styled-components';

import { Paper, Box, Tooltip, Grid, Stack, IconButton, Skeleton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const CartProductSkeleton = (props) => {
   const { odd, dense } = props;

   const { darkMode } = useContext(ThemeContext);

   const GridElement = styled(Grid)`
      display: flex;
      flex-direction: column;
      justify-content: center;
   `;

   const backgroundColorResolver = () => {
      if (odd) {
         if (darkMode) {
            return '#1b1b1b';
         }
         return '#f7f5f5';
      }
      return null;
   };

   // TODO: Implement changing product amount

   return (
      <Paper
         variant="outlined"
         sx={{
            my: 1,
            p: { xs: 2, md: 3 },
            backgroundColor: backgroundColorResolver()
         }}>
         <Grid container columnSpacing={2}>
            <Grid item xs={3}>
               <Skeleton variant="rectangular" height={dense ? 140 : 60} width="100%" />
            </Grid>
            <GridElement item xs={4}>
               <Stack spacing={2}>
                  <Skeleton variant="text" height={50} width="55%" />
                  <Skeleton variant="text" height={30} width={40} />
               </Stack>
            </GridElement>
            <GridElement item xs={2}>
               <Skeleton variant="text" height={65} width={100} />
            </GridElement>
            <GridElement item xs={2}>
               {/* Changing product amount */}
            </GridElement>
            <GridElement item xs={1}>
               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Tooltip title="Remove product from cart" arrow placement="left">
                     <IconButton variant="contained">
                        <DeleteForeverIcon />
                     </IconButton>
                  </Tooltip>
               </Box>
            </GridElement>
         </Grid>
      </Paper>
   );
};

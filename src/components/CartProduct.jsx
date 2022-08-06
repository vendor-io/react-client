import { useContext } from 'react';
import { ThemeContext } from './../context/theme-context';

import { Link as RouterLink } from 'react-router-dom';

import styled from 'styled-components';
import { formatPrice } from './../util/format-price';

import { Paper, Box, Tooltip, Grid, Typography, Stack, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const CartProduct = (props) => {
   const { id, name, image, category, price, odd, handleDelete } = props;

   const { darkMode } = useContext(ThemeContext);

   const ProductThumbnail = styled.img`
      max-height: 140px;
      width: 100%;
      object-fit: cover;
      border-radius: 16px;
   `;

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
               <ProductThumbnail src={image} alt="" style />
            </Grid>
            <GridElement item xs={4}>
               <Stack spacing={2}>
                  <Typography
                     component={RouterLink}
                     to={`/products/${id}`}
                     color="inherit"
                     underline="none"
                     variant="h6">
                     {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     {category}
                  </Typography>
               </Stack>
            </GridElement>
            <GridElement item xs={2}>
               <Typography variant="button" sx={{ fontSize: '2rem' }} textAlign="center">
                  ${formatPrice(price)}
               </Typography>
            </GridElement>
            <GridElement item xs={2}>
               {/* Changing product amount */}
            </GridElement>
            <GridElement item xs={1}>
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Tooltip title="Remove product from cart" arrow placement="left">
                     <IconButton variant="contained" onClick={() => handleDelete(id)}>
                        <DeleteForeverIcon />
                     </IconButton>
                  </Tooltip>
               </Box>
            </GridElement>
         </Grid>
      </Paper>
   );
};

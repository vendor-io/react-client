import { useContext } from 'react';
import { ThemeContext } from './../context/theme-context';

import { Link as RouterLink } from 'react-router-dom';

import styled from 'styled-components';
import { formatPrice } from './../util/format-price';
import { AmountSelect } from './AmountSelect';

import { Paper, Tooltip, Grid, Typography, Stack, IconButton, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const CartProduct = (props) => {
   const {
      id,
      name,
      image,
      category,
      amount,
      price,
      totalPrice,
      odd,
      handleDelete,
      handleAmountChange
   } = props;

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
      align-items: center;
   `;

   const handleProductAmountChange = (e) => {
      if (amount !== e.target.value) {
         handleAmountChange(id, e.target.value);
      }
   };

   const backgroundColorResolver = () => {
      if (odd) {
         if (darkMode) {
            return '#1b1b1b';
         }
         return '#f7f5f5';
      }
      return null;
   };

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
               <RouterLink to={`/products/${id}`}>
                  <ProductThumbnail src={image} alt={name} style />
               </RouterLink>
            </Grid>
            <GridElement item xs={4}>
               <Stack spacing={2} sx={{ width: '100%' }}>
                  <Typography
                     component={RouterLink}
                     to={`/products/${id}`}
                     color="inherit"
                     sx={{ textDecoration: 'none' }}
                     variant="h6">
                     {name}
                  </Typography>
                  <Box sx={{ display: 'flex', columnGap: '6px' }}>
                     <Typography
                        component={RouterLink}
                        to={`/categories/${category.slug}`}
                        variant="body2"
                        color="text.secondary">
                        {category.name}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        ●
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        ${formatPrice(price)}
                     </Typography>
                  </Box>
               </Stack>
            </GridElement>
            <GridElement item xs={1}>
               <AmountSelect amount={amount} handleAmountChange={handleProductAmountChange} />
            </GridElement>
            <GridElement item xs={1} />
            <GridElement item xs={1}>
               <Typography
                  variant="button"
                  sx={{ fontSize: '2rem', width: '100%' }}
                  textAlign="left">
                  ${formatPrice(totalPrice)}
               </Typography>
            </GridElement>
            <GridElement item xs={1} />
            <GridElement item xs={1}>
               <Tooltip title="Remove product from cart" arrow placement="left">
                  <IconButton variant="contained" onClick={() => handleDelete(id)}>
                     <DeleteForeverIcon />
                  </IconButton>
               </Tooltip>
            </GridElement>
         </Grid>
      </Paper>
   );
};

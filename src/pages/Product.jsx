import { useState, useEffect } from 'react';
import {
   Container,
   Paper,
   Typography,
   Grid,
   TextField,
   Button,
   InputAdornment,
   Select,
   OutlinedInput,
   ListItemText,
   Chip,
   MenuItem,
   InputLabel,
   FormControl
} from '@mui/material';
import { useForm } from 'react-hook-form';

function Product() {
   const [isLoading, setIsLoading] = useState(true);
   const [categories, setCategories] = useState([]);

   const [category, setCategory] = useState('None');

   const handleCategoryChange = (e) => {
      setCategory(e.target.value);
   };

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
   } = useForm();

   useEffect(() => {
      const getCategories = async () => {
         await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/categories`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
         })
            .then((response) => response.json())
            .then((data) => setCategories(data));
      };

      getCategories();
      console.log('categories', categories);
      setIsLoading(false);
      console.log(category);
   }, []);

   if (isLoading) {
      return <>Loading...</>;
   }

   return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
               Add a Product
            </Typography>
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <TextField
                     required
                     id="productName"
                     name="productName"
                     label="Product name"
                     fullWidth
                     autoComplete="product"
                     variant="standard"
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     required
                     id="productEan"
                     name="productEan"
                     label="EAN"
                     fullWidth
                     autoComplete="ean"
                     variant="standard"
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     required
                     id="productPrice"
                     name="productPrice"
                     label="Price"
                     startAdornment={<InputAdornment position="start">$</InputAdornment>}
                     fullWidth
                     autoComplete="price"
                     variant="standard"
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     id="productDescription"
                     name="productDescription"
                     label="Description"
                     fullWidth
                     multiline
                     maxRows={5}
                     autoComplete="description"
                     variant="standard"
                  />
               </Grid>
               {categories && (
                  <Grid item xs={12}>
                     <FormControl variant="filled" fullWidth sx={{ m: 1 }}>
                        <InputLabel id="productCategoryLabel">Category</InputLabel>
                        <Select
                           labelId="productCategoryLabel"
                           id="productCategory"
                           label="Category"
                           value={category}
                           onChange={handleCategoryChange}
                           input={<OutlinedInput label="Category" />}>
                           <MenuItem disabled value="None">
                              <em>None</em>
                           </MenuItem>
                           {categories.map((category) => (
                              <MenuItem key={category.ID} value={category.Name}>
                                 <ListItemText primary={category.Name} />
                                 <Chip sx={{ ml: 1 }} label={category.ItemsAmount} />
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
               )}
               <Grid item xs={12}>
                  <Button sx={{}} variant="contained">
                     Submit
                  </Button>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
}

export default Product;

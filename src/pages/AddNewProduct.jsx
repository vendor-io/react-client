import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProduct } from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';

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
   FormControl,
   Input,
   ImageList,
   ImageListItem
} from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';

function AddNewProduct() {
   const [isLoading, setIsLoading] = useState(true);
   const [categories, setCategories] = useState([]);

   const [category, setCategory] = useState('None');

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
   } = useForm();

   const navigate = useNavigate();
   const { addNewProduct, response } = useProduct();

   const handleCategoryChange = (e) => {
      setCategory(e.target.value);
   };

   const getCategories = async () => {
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/categories`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache'
      })
         .then((res) => res.json())
         .then((data) => setCategories(data));
   };

   useEffect(() => {
      getCategories();
      setIsLoading(false);
   }, []);

   const productImages = watch('productImages');

   const onSubmit = (data) => {
      data = { ...data, productCategory: category };
      addNewProduct(data);
   };

   useEffect(() => {
      if (response) {
         navigate.push(`/products/${response.ID}`);
      }
   }, [response]);

   if (isLoading) {
      return <>Loading...</>;
   }

   return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
               Add a Product
            </Typography>
            <Grid
               container
               spacing={3}
               component="form"
               noValidate
               onSubmit={handleSubmit(onSubmit)}>
               <Grid item xs={12}>
                  <TextField
                     required
                     id="productName"
                     name="productName"
                     label="Product name"
                     fullWidth
                     autoComplete="product"
                     variant="standard"
                     {...register('productName', { required: true })}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     required
                     id="productEan"
                     name="productEan"
                     label="EAN"
                     type="number"
                     fullWidth
                     autoComplete="ean"
                     variant="standard"
                     {...register('productEan', { required: true })}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     required
                     id="productPrice"
                     name="productPrice"
                     label="Price"
                     type="number"
                     startAdornment={<InputAdornment position="start">$</InputAdornment>}
                     fullWidth
                     autoComplete="price"
                     variant="standard"
                     {...register('productPrice', { required: true })}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     id="productDescription"
                     name="productDescription"
                     label="Description"
                     fullWidth
                     multiline
                     rows={3}
                     maxRows={5}
                     autoComplete="description"
                     variant="outlined"
                     {...register('productDescription', { required: true })}
                  />
               </Grid>
               {categories && (
                  <Grid item xs={12}>
                     <FormControl variant="filled" fullWidth>
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
                           {categories.map((categoryItem) => (
                              <MenuItem key={categoryItem.ID} value={categoryItem.Name}>
                                 <ListItemText primary={categoryItem.Name} />
                                 <Chip sx={{ ml: 1 }} label={categoryItem.ItemsAmount} />
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
               )}
               <Grid item xs={12}>
                  <label htmlFor="productImages">
                     <Input
                        accept="image/jpeg,image/jpg,image/png"
                        multiple={true}
                        type="file"
                        name="productImages"
                        id="productImages"
                        sx={{ display: 'none' }}
                        {...register('productImages', {
                           required: true
                        })}
                        inputProps={{ multiple: true }}
                     />
                     <Button
                        startIcon={<PanoramaIcon />}
                        variant="contained"
                        component="span"
                        sx={{ my: 2, px: 2, py: 1 }}>
                        Add images
                     </Button>
                  </label>
               </Grid>
               {productImages && productImages.length > 0 && (
                  <Grid item xs={12}>
                     <ImageList sx={{ width: '99%' }} cols={3} rowHeight={164}>
                        {Array.from(productImages).map((image, index) => (
                           <ImageListItem key={index}>
                              <img
                                 src={URL.createObjectURL(image)}
                                 alt={image.name}
                                 loading="lazy"
                              />
                           </ImageListItem>
                        ))}
                     </ImageList>
                  </Grid>
               )}
               <Grid item xs={12}>
                  <Button sx={{}} variant="contained" type="submit">
                     Submit
                  </Button>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
}

export default AddNewProduct;

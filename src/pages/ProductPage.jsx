import { useState, useEffect, useContext } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProduct } from '../hooks/useProduct';
import { useCart } from './../hooks/useCart';
import { BreadcrumbsContext } from '../context/breadcrumbs-context';
import { differenceInDays } from 'date-fns';

import Slider from 'react-slick';
import { Container, Grid, Paper, Typography, Link, Divider, Button, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DoneIcon from '@mui/icons-material/Done';

import { ProductPageSkeleton } from '../components/ProductPageSkeleton';
import { formatPrice } from '../util/format-price';

import { mainSliderOptions, subSliderOptions } from '../constant/sliderOptions';

function ProductPage() {
   const [isLoading, setIsLoading] = useState(true);
   const [isClicked, setIsClicked] = useState(false);

   const [product, setProduct] = useState(null);
   const [images, setImages] = useState([]);

   const [mainNav, setMainNav] = useState();
   const [subNav, setSubNav] = useState();

   const { setCurrentBreadcrumb } = useContext(BreadcrumbsContext);

   const { pid } = useParams();

   const { token, user } = useAuth();

   const { getProductById } = useProduct();
   const { addProductToCart } = useCart();

   const isNewProduct = () => {
      return differenceInDays(new Date(product.CreatedAt), new Date()) === 0;
   };

   const handleAddToCart = () => {
      if (token) {
         addProductToCart(token, { productId: product.ID, userId: user.uid }).then((data) => {
            console.log(data);
            setIsClicked(true);
         });
      }
   };

   useEffect(() => {
      if (token) {
         getProductById(token, pid).then((data) => setProduct(data));
      }
   }, [token]);

   useEffect(() => {
      if (product) {
         setImages(product.Images.split(';'));
         setCurrentBreadcrumb(product.Name);
         setIsLoading(false);
      }
      return () => setCurrentBreadcrumb(null);
   }, [product]);

   if (isLoading) {
      return <ProductPageSkeleton />;
   }

   return (
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={5}>
               <Grid item xs={6}>
                  <Slider
                     asNavFor={subNav}
                     ref={(slider1) => setMainNav(slider1)}
                     style={{ borderRadius: '16px', overflow: 'hidden' }}
                     {...mainSliderOptions}>
                     {images.map((img, index) => (
                        <div key={index}>
                           <img src={img} alt="" style={{ aspectRatio: 1, width: '100%' }} />
                        </div>
                     ))}
                  </Slider>
                  <Slider
                     asNavFor={mainNav}
                     ref={(slider2) => setSubNav(slider2)}
                     {...subSliderOptions}>
                     {images.map((img, index) => (
                        <div key={index}>
                           <img
                              src={img}
                              alt=""
                              style={{
                                 maxHeight: '150px',
                                 objectFit: 'cover',
                                 width: '100%',
                                 padding: '5px',
                                 borderRadius: '12px'
                              }}
                           />
                        </div>
                     ))}
                  </Slider>
               </Grid>
               <Grid item xs={6}>
                  <div style={{ marginBottom: '15px' }}>
                     <Typography variant="h2" sx={{ display: 'inline' }}>
                        {product.Name}
                     </Typography>
                     {isNewProduct() && (
                        <Chip
                           label="NEW!"
                           color="error"
                           variant="contained"
                           sx={{ transform: 'translateY(-50%)', ml: 3 }}
                        />
                     )}
                  </div>
                  <Grid container spacing={2}>
                     <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="overline">Category</Typography>
                     </Grid>
                     <Grid item xs={12} md={10}>
                        <Link
                           component={RouterLink}
                           to={`/categories/${product.Category.Slug}`}
                           variant="h5"
                           color="inherit"
                           underline="hover">
                           {product?.Category?.Name}
                        </Link>
                     </Grid>
                     <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="overline">EAN</Typography>
                     </Grid>
                     <Grid item xs={12} md={10}>
                        <Typography variant="h5">{product?.EAN}</Typography>
                     </Grid>
                     <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="overline">Price</Typography>
                     </Grid>
                     <Grid item xs={12} md={10}>
                        <Typography variant="h5">${formatPrice(product?.Price)}</Typography>
                     </Grid>
                  </Grid>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  {isClicked ? (
                     <Button
                        disabled
                        color="success"
                        startIcon={<DoneIcon />}
                        fullWidth
                        sx={{ mb: 2, py: 2 }}
                        variant="contained">
                        Added!
                     </Button>
                  ) : (
                     <Button
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2, py: 2 }}>
                        Add to cart
                     </Button>
                  )}
                  <Typography variant="overline" sx={{ display: 'block' }}>
                     Description
                  </Typography>
                  <Typography dangerouslySetInnerHTML={{ __html: product.Description }} />
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
}

export default ProductPage;

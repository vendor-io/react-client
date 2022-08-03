import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { NavLink, Link as RouterLink } from 'react-router-dom';

import {
   AppBar,
   Box,
   Toolbar,
   IconButton,
   Typography,
   Menu,
   Container,
   Avatar,
   Button,
   Tooltip,
   MenuItem,
   Divider,
   Link
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const userLinks = [
   { name: 'Cart', path: '/cart' },
   { name: 'Orders', path: '/orders' },
   { name: 'Logout', path: '/logout' }
];

export const Navbar = () => {
   const [categories, setCategories] = useState([]);

   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [anchorElCategories, setAnchorElCategories] = useState(null);

   const { token, user } = useAuth();

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };
   const handleOpenCategoriesMenu = (event) => {
      setAnchorElCategories(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };
   const handleCloseCategoriesMenu = () => {
      setAnchorElCategories(null);
   };

   const getAllCategories = async () => {
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/categories`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((response) => response.json())
         .then((data) => setCategories(data));
   };

   useEffect(() => {
      if (token) {
         getAllCategories();
      }
   }, [token]);

   if (user && categories.length > 0) {
      return (
         <>
            <div style={{ height: '70px' }} />
            <AppBar position="fixed">
               <Container maxWidth="xl">
                  <Toolbar disableGutters>
                     <KeyboardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                     <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                           mr: 5,
                           display: { xs: 'none', md: 'flex' },
                           fontFamily: 'monospace',
                           fontWeight: 700,
                           letterSpacing: '-.03rem',
                           color: 'inherit',
                           textDecoration: 'none'
                        }}>
                        Keyboardify
                     </Typography>
                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                           size="large"
                           aria-label="account of current user"
                           aria-controls="menu-appbar"
                           aria-haspopup="true"
                           onClick={handleOpenNavMenu}
                           color="inherit">
                           <MenuIcon />
                        </IconButton>
                        <Menu
                           id="menu-appbar"
                           anchorEl={anchorElNav}
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left'
                           }}
                           keepMounted
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left'
                           }}
                           open={Boolean(anchorElNav)}
                           onClose={handleCloseNavMenu}
                           sx={{
                              display: { xs: 'block', md: 'none' }
                           }}>
                           <MenuItem onClick={handleCloseNavMenu}>
                              <Link component={NavLink} to="/products" textAlign="center">
                                 Products
                              </Link>
                           </MenuItem>
                        </Menu>
                     </Box>
                     <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                     <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                           mr: 2,
                           display: { xs: 'flex', md: 'none' },
                           flexGrow: 1,
                           fontFamily: 'monospace',
                           fontWeight: 700,
                           letterSpacing: '.3rem',
                           color: 'inherit',
                           textDecoration: 'none'
                        }}>
                        Keyboardify
                     </Typography>
                     <Box
                        sx={{
                           flexGrow: 1,
                           display: { xs: 'none', md: 'flex' },
                           columnGap: '15px'
                        }}>
                        <Button
                           component={NavLink}
                           to="/products"
                           sx={{ my: 2, color: 'white', display: 'block' }}>
                           Products
                        </Button>
                        <Button
                           onClick={handleOpenCategoriesMenu}
                           sx={{ my: 2, color: 'white', display: 'flex' }}>
                           Categories
                           <ArrowDropDownIcon
                              sx={{ display: 'inline', transform: 'translateY(-2px)' }}
                           />
                        </Button>
                        <Menu
                           sx={{ mt: '45px' }}
                           id="menu-appbar-categories"
                           anchorEl={anchorElCategories}
                           anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                           }}
                           keepMounted
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                           }}
                           open={Boolean(anchorElCategories)}
                           onClose={handleCloseCategoriesMenu}>
                           {categories.map((category) => (
                              <MenuItem key={category.ID} onClick={handleCloseCategoriesMenu}>
                                 <Link
                                    color="inherit"
                                    underline="none"
                                    component={RouterLink}
                                    to={`/categories/${category.Slug}`}>
                                    {category.Name}
                                 </Link>
                              </MenuItem>
                           ))}
                        </Menu>
                     </Box>
                     <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                              <Avatar alt={user?.email} src={user?.photoURL} />
                           </IconButton>
                        </Tooltip>
                        <Menu
                           sx={{ mt: '45px' }}
                           id="menu-appbar"
                           anchorEl={anchorElUser}
                           anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                           }}
                           keepMounted
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                           }}
                           open={Boolean(anchorElUser)}
                           onClose={handleCloseUserMenu}>
                           {userLinks.map((link, index) => (
                              <div key={index}>
                                 {index === userLinks.length - 1 && <Divider sx={{ mb: 1 }} />}
                                 <MenuItem onClick={handleCloseUserMenu}>
                                    <Link
                                       color="inherit"
                                       underline="none"
                                       component={RouterLink}
                                       to={link.path}>
                                       {link.name}
                                    </Link>
                                 </MenuItem>
                              </div>
                           ))}
                        </Menu>
                     </Box>
                  </Toolbar>
               </Container>
            </AppBar>
         </>
      );
   }
};

import { useState, useEffect } from 'react';
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
   Link,
   Chip
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useCategory } from 'hooks/useCategory';
import { useAuth } from 'hooks/useAuth';
import { DarkModeSwitch } from 'components/DarkModeSwitch';

const userLinks = [
   { name: 'Cart', path: '/cart' },
   { name: 'Addresses', path: '/addresses' },
   { name: 'Orders', path: '/orders' },
   { name: 'Logout', path: '/logout' }
];
const superUserLinks = [
   { name: 'Add new product', path: '/products/new' },
   { name: 'Add new category', path: '/categories/new' }
];

export const Navbar = (props) => {
   const { isSignedIn } = props;
   const [categories, setCategories] = useState([]);

   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElCategories, setAnchorElCategories] = useState(null);
   const [anchorElSuperUser, setAnchorElSuperUser] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);

   const { token, user, isSuperUser } = useAuth();

   const { getCategories } = useCategory();

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenCategoriesMenu = (event) => {
      setAnchorElCategories(event.currentTarget);
   };
   const handleOpenSuperUserMenu = (event) => {
      setAnchorElSuperUser(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };
   const handleCloseCategoriesMenu = () => {
      setAnchorElCategories(null);
   };
   const handleCloseSuperUserMenu = () => {
      setAnchorElSuperUser(null);
   };
   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   useEffect(() => {
      if (token) {
         getCategories(token).then((data) => setCategories(data));
      }
   }, [token, getCategories]);

   return (
      <>
         <div style={{ height: '70px' }} />
         <AppBar position="fixed">
            <Container maxWidth="xl">
               <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                  </Box>
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'flex', md: 'none' }
                     }}>
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
                           display: { xs: 'block', md: 'none', width: 'fit-content' }
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
                  {isSignedIn && (
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
                           <MenuItem
                              component={RouterLink}
                              to="/categories"
                              onClick={handleCloseCategoriesMenu}>
                              <Typography color="inherit">All categories</Typography>
                           </MenuItem>
                           {categories.length > 0 && <Divider />}
                           {categories.map((category) => (
                              <MenuItem
                                 key={category.id}
                                 component={RouterLink}
                                 to={`/categories/${category.slug}`}
                                 onClick={handleCloseCategoriesMenu}
                                 sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                 <Typography color="inherit">{category.name}</Typography>
                                 <Chip sx={{ ml: 3 }} label={category.itemsAmount} />
                              </MenuItem>
                           ))}
                        </Menu>
                     </Box>
                  )}
                  {isSignedIn && (
                     <Box sx={{ flexGrow: 0 }}>
                        {isSuperUser && (
                           <Button
                              sx={{ mr: 2 }}
                              label="Superuser"
                              color="secondary"
                              variant="contained"
                              onClick={handleOpenSuperUserMenu}
                              endIcon={<ExpandMore />}>
                              SuperUser
                           </Button>
                        )}
                        <Menu
                           sx={{ mt: '45px' }}
                           id="menu-appbar-superuser"
                           anchorEl={anchorElSuperUser}
                           anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                           }}
                           keepMounted
                           transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right'
                           }}
                           open={Boolean(anchorElSuperUser)}
                           onClose={handleCloseSuperUserMenu}>
                           {superUserLinks.map((link) => (
                              <MenuItem
                                 key={link.path}
                                 color="inherit"
                                 underline="none"
                                 component={RouterLink}
                                 to={link.path}
                                 onClick={handleCloseSuperUserMenu}>
                                 {link.name}
                              </MenuItem>
                           ))}
                        </Menu>
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
                              <Box key={link.path}>
                                 {index === userLinks.length - 1 && <Divider sx={{ mb: 1 }} />}
                                 <MenuItem
                                    color="inherit"
                                    underline="none"
                                    component={RouterLink}
                                    to={link.path}
                                    onClick={handleCloseUserMenu}>
                                    {link.name}
                                 </MenuItem>
                              </Box>
                           ))}
                        </Menu>
                     </Box>
                  )}
                  <Box sx={{ display: 'flex' }}>
                     {!isSignedIn && (
                        <Button
                           component={RouterLink}
                           variant="contained"
                           color="secondary"
                           to="/login">
                           Sign in
                        </Button>
                     )}
                     <DarkModeSwitch />
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>
      </>
   );
};

import React,{useState,useEffect} from 'react'
import { AppBar, Box, Toolbar, Typography,Stack ,IconButton,Menu, MenuItem  } from '@mui/material'
import { NavLink} from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import {useAppContext} from '../../../../context/CartContext'
import axios from 'axios';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [anchorElCat, setAnchorElCat] = useState(null);

    const navigate = useNavigate();
    const { cart,user,logout  } = useAppContext(); // Access cart data from the context

    // Profile dropdown state
    const [anchorEl, setAnchorEl] = useState(null);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    // Wishlist dropdown state
    const [wishlistAnchorEl, setWishlistAnchorEl] = useState(null);

    const handleWishlistClick = (event) => {
        setWishlistAnchorEl(event.currentTarget);
    };

    const handleWishlistClose = () => {
        setWishlistAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        handleProfileClose();
    };

    // Fetch categories 
    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/v1/category/getall`)
            .then(response => {
                    setCategories(response.data.data);
            })
            .catch(error => {
                    console.error('Error fetching categories:', error);
            });
    }, []);

    const handleCategoryClick = (event) => {
        setAnchorElCat(event.currentTarget);
    };
    
    const handleCategoryClose = () => {
        setAnchorElCat(null);
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1, cursor: 'pointer' }}
                            onClick={handleLogoClick}
                        >
                            Bike Cart
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: 'center' }}>
                        <NavLink
                            to="/"
                            sx={{
                            color: 'white',
                            padding: '10px',
                            textDecoration: 'none',
                            '&.active': {
                                backgroundColor: '#6d1b7b',
                            },
                            }}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            sx={{
                            color: 'white',
                            padding: '10px',
                            textDecoration: 'none',
                            '&.active': {
                                backgroundColor: '#6d1b7b',
                            },
                            }}
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            to="/contact"
                            sx={{
                            color: 'white',
                            padding: '10px',
                            textDecoration: 'none',
                            '&.active': {
                                backgroundColor: '#0000',
                            }
                            }}
                            
                        >
                            Contact Us
                        </NavLink>
                        
                        </Stack>

                        <IconButton color="inherit" onClick={handleCategoryClick}>
                            Categories
                        </IconButton>
                        <Menu
                        anchorEl={anchorElCat}
                        open={Boolean(anchorElCat)}
                        onClose={handleCategoryClose}
                        >
                        {categories.map(category => (
                            <MenuItem
                            key={category.id}
                            component={NavLink}
                            to={`/category/${category._id}`}
                            onClick={handleCategoryClose}
                            >
                            {category.name}
                            </MenuItem>
                        ))}
                        </Menu>
                        <IconButton color="inherit" component={NavLink} to="/cart">
							Cart<ShoppingCartIcon />
							{cart.length > 0 && <span style={{ marginLeft: '5px' }}>{cart.length}</span>}
						</IconButton>

                        {/* Profile dropdown button */}
                        
                        <IconButton color="inherit" onClick={handleProfileClick}>
                            Profile<AccountCircleIcon />
                        </IconButton>
                        {/* Profile dropdown menu */}
                        <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        >
                            {user ? (
                                // If user is logged in, show My Profile and Log Out
                                <>
                                    <MenuItem component={NavLink} to="/profile" onClick={handleProfileClose}>
                                        My Profile
                                    </MenuItem>
                                    <MenuItem component={NavLink} to="/wishlist" onClick={handleWishlistClose}>
                                        Wishlist
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Log Out
                                    </MenuItem>
                                </>
                            ) : (
                                // If user is not logged in, show Sign In
                                <MenuItem component={NavLink} to="/login" onClick={handleProfileClose}>
                                    Sign In
                                </MenuItem>
                            )}
                        </Menu>

                        {/* Conditional rendering of Admin link based on user login status */}
                        {!user && (
                            <NavLink to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <IconButton color="inherit">
                                    Admin<SettingsIcon />
                                </IconButton>
                            </NavLink>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Header
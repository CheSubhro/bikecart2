import React, {useState } from 'react';
import { useAppContext } from '../../../context/CartContext.jsx'
import { Card, CardContent, Typography, Button, CardActions,CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity ,user} = useAppContext();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!user);

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const serverBaseUrl = `http://127.0.0.1:8000/uploads`;

    const navigate = useNavigate();

    const placeOrder = async () => {

        try {

            if (!user || !user.user || !user.user.id) {
                console.error('User not available or missing user id');
                return;
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/v1/order/placeorder`, {
                userId: user.user.id,
                cartItems: cart,
                totalPrice: calculateTotalPrice(),
            });

            if (response.status === 201) {
                console.log('Order placed successfully');
            }else {
                console.error('Failed to place order');
            } 
        } catch (error) {
            console.error('Error during order placement:', error);
        }
    };
    
    const handlePlaceOrder = () => {

        // console.log('User in handlePlaceOrder:', user ? user.user.id : null);
        // If user is not authenticated, redirect to the login page
        if (!isUserAuthenticated) {
            // console.error('User is not authenticated');
            // Redirect to the login page
            navigate(`/login?redirectPath=${window.location.pathname}`);
            return;
        }

        // // For simplicity, let's just call the placeOrder function (asynchronous example)
        placeOrder();

        // Navigate to the checkout page
        navigate('/checkout');
    };


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                <p>Your cart is empty</p>
                ) : (
                <Card style={{ maxWidth: 600, margin: 'auto' }}>
                    {cart.map(item => (
                    <div key={item.id}>
                        <CardContent style={{ textAlign: 'center' }}>
                        <CardMedia
                            component="img"
                            alt={item.name}
                            height="140"
                            image={`${serverBaseUrl}/${item.image}`}
                            style={{ objectFit: 'cover' }}
                        />
                        <Typography variant="h6" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                            Product Name: {item.name}
                        </Typography>
                        <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
                            Price: {item.price}rs
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Button
                            variant="contained"
                            style={{ marginBottom: '8px', marginLeft: '8px' }}
                            color="primary"
                            onClick={() => increaseQuantity(item._id)}
                        >
                            +
                        </Button>
                        <Typography
                            variant="subtitle1"
                            style={{ marginBottom: '8px', display: 'inline-block', minWidth: '20px' }}
                        >
                            {item.quantity}
                        </Typography>
                        <Button
                            variant="contained"
                            style={{ marginBottom: '8px', marginLeft: '8px' }}
                            color="secondary"
                            onClick={() => decreaseQuantity(item._id)}
                        >
                            -
                        </Button>
                        <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
                            Total Price: {item.price * item.quantity}rs
                        </Typography>
                        <Button
                            variant="contained"
                            style={{ marginBottom: '8px', marginLeft: '8px' }}
                            color="secondary"
                            onClick={() => removeFromCart(item._id)}
                        >
                            Remove
                        </Button>
                        </CardActions>
                    </div>
                    ))}
                    <CardActions>
                        <Typography variant="h6" style={{ marginTop: '8px', fontWeight: 'bold' }}>
                            Total Cart Price: {calculateTotalPrice()}rs
                        </Typography>
                    </CardActions>
                    <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePlaceOrder}
                        style={{ marginLeft: '8px' }}
                    >
                        Place Order
                    </Button>
                    </CardActions>
                </Card>
                )}
            </div>
        </>
    );
};

export default Cart;

import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import {useAppContext} from '../../../context/CartContext'

const Login = () => {

    const { login } = useAppContext();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
	const navigate = useNavigate();

    const handleLogin = async (event) => {
		event.preventDefault(); 

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
		
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/v1/users/login`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                
                const userData = response.data;
                // console.log('User Data:', userData); // Log user data to the console
                login(userData);

                // Check if there is a redirectPath in the query parameters
                const queryParams = new URLSearchParams(window.location.search);
                const redirectPath = queryParams.get('redirectPath');

                if (redirectPath) {
                    // Redirect to the specified path
                    navigate(redirectPath);
                } else {
                    // If no specific path, redirect to the profile page
                    navigate('/profile');
                }
            } else {
             console.error('Login failed');
             }
        } catch (error) {
            // Handle login error
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h5">Sign In</Typography>
                    <form  id="login-form" onSubmit={handleLogin}>
                        <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
						value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
						type="password"
						value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        />
						
                        
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="medium"  
                        >
                        Submit
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Login
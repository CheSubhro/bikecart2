import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const SignUp = () => {

    const [phone, setPhone] = useState('');
    const [email, setEmail]  = useState('');
    const [password, setPassword] = useState('');
    
    const handleSignup = async (event) => {
        event.preventDefault();
    
        try {
            
          const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/register`, {
            phone: phone,
            email: email,
            password: password,
          });
    
        //   console.log('Signup successful:', response.data);
          
        } catch (error) {
          console.error('Signup failed:', error.response.data);
        }
      };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h5">Sign Up</Typography>
                    <form id="signup-form" onSubmit={handleSignup}>
                        <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        
                        />
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
                        size="small"
                        >
                        Submit
                        </Button>

                        <Grid container>
                        <Grid item>
                            <Link to="/login" variant="body2">
                            {"Already have an account? Sign In"}
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

export default SignUp
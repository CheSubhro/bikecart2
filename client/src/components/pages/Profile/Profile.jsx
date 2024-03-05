import React, { useEffect } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { useAppContext } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const { user } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.status || user.status !== 'success') {
            navigate('/');
        }
    }, [user, navigate]);

  return (
        <>
            <Container maxWidth="md" style={{ marginTop: '20px', marginBottom: '8px' }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    {user && user.user && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4" gutterBottom>
                                    Welcome {user.user.email}
                                </Typography>
                                {/* <Typography variant="subtitle1">
                                    {user.user.email}
                                </Typography> */}
                            </Grid>
                        </Grid>
                    )}    
                </Paper>
            </Container>
        </>
  );
};

export default Profile;

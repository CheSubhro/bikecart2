import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const ThankYou = () => {
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h5">Thank You for Your Purchase!</Typography>
                        <Typography variant="body1">
                            Your payment has been processed successfully. We appreciate you!
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default ThankYou;

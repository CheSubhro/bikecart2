import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';

const Admin = () => {
    return (
        <>
            <Grid container spacing={3}>
                {/* Category Link */}
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h6">Category</Typography>
                    <Link to="/admin/category">Go to Category</Link>
                    </Paper>
                </Grid>

                {/* Product Link */}
                <Grid item xs={6}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h6">Product</Typography>
                    <Link to="/admin/product">Go to Product</Link>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Admin
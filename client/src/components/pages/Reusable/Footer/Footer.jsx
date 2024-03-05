import React from 'react'
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import {useAppContext} from '../../../../context/CartContext'

const Footer = () => {
    return (
        <>
            <AppBar position="static" color="primary">
                <Container>
                    <Toolbar sx={{ justifyContent: 'center' }}>
                        <Typography variant="body1" color="inherit">
                            © 2024 Bike Cart
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Footer
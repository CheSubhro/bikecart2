import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import './Home.css';
import Card from '../Reusable/Card/Card';
const Home = () => {

    return (
        <>
            <Box sx={{ width: '100%', mt: 5,backgroundColor: '#f0f0f0' }}>
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <img
                                src="https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/4b0762342e0f4dc3.jpeg?q=20"
                                alt="" 
                                style={{
                                    width: '100%', // Set width to 100%
                                    display: 'block', // Remove default spacing around inline elements
                                    borderRadius: '8px', // Add your border-radius
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add your box-shadow
                                  }}        
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                            <div style={{ marginTop: '20px' }}>
                                <Card/>
                            </div>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Home
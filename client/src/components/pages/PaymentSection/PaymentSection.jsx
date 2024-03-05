import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const PaymentSection = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/payment/processpayment`, {
                cardnumber: cardNumber, 
                expirydate: expiryDate, 
                cvv,
            });

            if (response.status === 201) {
                console.log('Payment processed successfully');

                window.location.href = '/thankyou';
            } else {
                console.error('Payment processing failed');
            }
        } catch (error) {
            console.error('Error during payment processing:', error);
        }
    };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h5">Payment Information</Typography>
                        <form id="payment-form" onSubmit={handlePaymentSubmit}>
                            <TextField
                                label="Card Number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="cardNumber"
                                value={cardNumber}
                                onChange={(event) => setCardNumber(event.target.value)}
                            />
                            <TextField
                                label="Expiry Date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="expiryDate"
                                value={expiryDate}
                                onChange={(event) => setExpiryDate(event.target.value)}
                            />
                            <TextField
                                label="CVV"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="cvv"
                                value={cvv}
                                onChange={(event) => setCvv(event.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="medium"
                            >
                                Process Payment
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default PaymentSection;

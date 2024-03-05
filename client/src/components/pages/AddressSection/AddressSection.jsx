import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddressSection = () => {

    const [fullName, setFullName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const navigate = useNavigate();

    const [accordionExpanded, setAccordionExpanded] = useState('panel1');

    const handleAddressSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/address/saveaddress`, {
                fullName,
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
            });

            if (response.status === 201) {
                console.log('Address saved successfully');
                
                setFullName('');
                setAddressLine1('');
                setAddressLine2('');
                setCity('');
                setState('');
                setZipCode('');

                setAccordionExpanded('panel2');
            } else {
                console.error('Address save failed');
            }
        } catch (error) {
            console.error('Error during address save:', error);
        }
    };
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h5">Shipping Address</Typography>
                        <form id="address-form" onSubmit={handleAddressSubmit}>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="fullName"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                            <TextField
                                label="Address Line 1"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="addressLine1"
                                value={addressLine1}
                                onChange={(event) => setAddressLine1(event.target.value)}
                            />
                            <TextField
                                label="Address Line 2"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="addressLine2"
                                value={addressLine2}
                                onChange={(event) => setAddressLine2(event.target.value)}
                            />
                            <TextField
                                label="City"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="city"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                            />
                            <TextField
                                label="State"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="state"
                                value={state}
                                onChange={(event) => setState(event.target.value)}
                            />
                            <TextField
                                label="Zip Code"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="zipCode"
                                value={zipCode}
                                onChange={(event) => setZipCode(event.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="medium"
                            >
                                Save Address
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default AddressSection
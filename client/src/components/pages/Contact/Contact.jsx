import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography,MenuItem } from '@mui/material';
import axios from 'axios';


const Contact = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const statuses = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('status', status);
    
        if (name && email && subject && message && status) {
            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/v1/contact/create`,
                     formData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                     );
                        if (response.data.status === 'success') {
                            console.log('Conatact created successfully');
                            }
            } catch (error) {
                console.error(error);
            }
        } 
    };


      
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h5">Contact Form</Typography>
                    <form onSubmit={handleSubmit} id="contact-form">
                        <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="name"
                        onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="subject"
                        onChange={(event) => setSubject(event.target.value)}
                        />
                        <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        name="message"
                        onChange={(event) => setMessage(event.target.value)}
                        />
                        <TextField
                        select
                        label="Status"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        >
                        {statuses.map((statusOption) => (
                            <MenuItem key={statusOption.value} value={statusOption.value}>
                                {statusOption.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                        </Button>
                    </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Contact
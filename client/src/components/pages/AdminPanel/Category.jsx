import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';


const Category = () => {

    const [name, setName] = useState()
    const [slug, setSlug] = useState()
    const [description, setDescription] = useState()
    const [metakeyword, setMetakeyword] = useState()
    const [metadescription, setMetadescription] = useState()
    const [status, setStatus] = useState()
    
    const handleSubmit =async(e)=>{
        e.preventDefault();

        let formData = new FormData();
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('description', description);
        formData.append('metakeyword', metakeyword);
        formData.append('metadescription', metadescription);
        formData.append('status', status);
    
        if (name && slug && description && metakeyword && metadescription && status) {
            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/v1/category/create`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                    if (response.data.status === 'success') {
                        console.log('Category created successfully');
                    }
        
            } catch (error) {
                    if (error.response) {
                        console.error('Response Error:', error.response.data);
                        console.error('Response Status:', error.response.status);
                    } else if (error.request) {
                        console.error('No Response Received');
                    } else {
                        console.error('Request Setup Error:', error.message);
                    }
            }
        }
    }
    
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <Typography variant="h5">Category Form</Typography>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                        label="Slug"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(event) => setSlug(event.target.value)}
                        />
                        <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(event) => setDescription(event.target.value)}
                        />
                        <TextField
                        label="Meta Keyword"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(event) => setMetakeyword(event.target.value)}
                        />
                        <TextField
                        label="Meta Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(event) => setMetadescription(event.target.value)}
                        />
                        <TextField
                        label="Status"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(event) => setStatus(event.target.value)}
                        />
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

export default Category
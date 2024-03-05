import React, { useState,useEffect } from 'react';
import { Grid, Paper, TextField, Button, Typography,MenuItem } from '@mui/material';
import axios from 'axios';

const Product = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/category/getall`);
                setCategories(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);


    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [salesprice, setSalesprice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [metakeyword, setMetakeyword] = useState('');
    const [metadescription, setMetadescription] = useState('');
    const [shippingcharge, setShippingcharge] = useState('');
    const [taxes, setTaxes] = useState('');
    const [featured, setFeatured] = useState('');
    const [stock, setStock] = useState('');
    const [status, setStatus] = useState('');

    const statuses = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('salesprice', salesprice);
        formData.append('quantity', quantity);
        formData.append('metakeyword', metakeyword);
        formData.append('metadescription', metadescription);
        formData.append('shippingcharge', shippingcharge);
        formData.append('taxes', taxes);
        formData.append('featured', featured);
        formData.append('stock', stock);
        formData.append('status', status);

        if (
            categoryId &&
            name &&
            slug &&
            description &&
            image &&
            price &&
            salesprice &&
            quantity &&
            metakeyword &&
            metadescription &&
            shippingcharge &&
            taxes &&
            featured &&
            stock &&
            status
        ) {
            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/v1/product/create`, 
                    formData,
                );
                console.log(response)

                    if (response.data.status === 'success') {
                        console.log('Product created successfully');
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
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', maxHeight: '80vh', overflowY: 'auto' }}>
                        <Typography variant="h5">Product Form</Typography>
                        <form onSubmit={handleSubmit} id="product-form" encType='multipart/form-data'>
                            <TextField
                                select
                                label="Category"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={categoryId}
                                onChange={(event) => setCategoryId(event.target.value)}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="file"
                                onChange={(event) => setImage(event.target.files[0])}
                            />
                            <TextField
                                label="Price"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(event) => setPrice(event.target.value)}
                            />
                            <TextField
                                label="Sales Price"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(event) => setSalesprice(event.target.value)}
                            />
                            <TextField
                                label="Quantity"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(event) => setQuantity(event.target.value)}
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
                                label="Shipping Charge"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(event) => setShippingcharge(event.target.value)}
                            />
                            <TextField
                                label="Taxes"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(event) => setTaxes(event.target.value)}
                            />
                            <TextField
                                label="Featured"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(event) => setFeatured(event.target.value)}
                            />
                            <TextField
                                label="Stock"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(event) => setStock(event.target.value)}
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
                            {/* Add more fields as needed */}
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

export default Product;
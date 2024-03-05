import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';


const ProductsByCategory = () => {

    const { id  } = useParams();
    const [products, setProducts] = useState([]);

    const [sortBy, setSortBy] = useState('popularity'); 

    useEffect(() => {
        // Fetch products based on the category ID
        axios.get(`http://127.0.0.1:8000/api/v1/product/product/${id }`)
          .then(response => {
            setProducts(response.data.products);
            console.log(response.data.products);
          })
          .catch(error => {
            console.error('Error fetching products by category:', error);
          });
    }, [id]);

    const serverBaseUrl = `http://127.0.0.1:8000/uploads`;

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    // Function to sort products based on the selected option
    const sortProducts = () => {
        switch (sortBy) {
        case 'popularity':
            return [...products].sort((a, b) => b.popularity - a.popularity);
        case 'lowToHigh':
            return [...products].sort((a, b) => a.salesprice - b.salesprice);
        case 'highToLow':
            return [...products].sort((a, b) => b.salesprice - a.salesprice);
        case 'newestFirst':
            return [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        default:
            return products;
        }
    };    

    const sortedProducts = sortProducts();

    return (
        <>
            <div style={{ margin: '50px' }}>
                <Select value={sortBy} onChange={handleSortChange}>
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="lowToHigh">Price - Low to High</MenuItem>
                <MenuItem value="highToLow">Price - High to Low</MenuItem>
                <MenuItem value="newestFirst">Newest First</MenuItem>
                </Select>
            </div>
            <Grid container spacing={2} style={{ margin: '25px' }}>
                {sortedProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={5} style={{ margin: '20px', padding: '8px' }}>
                    <Link to={`/carditem/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card>
                        <CardMedia
                        component="img"
                        height="200"
                        image={`${serverBaseUrl}/${product.image}`}
                        alt={`${product.name}`}
                        />
                        <CardContent>
                        <Typography variant="h5" component="div">
                            Name: {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            Price: {product.salesprice}
                        </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                </Grid>
                ))}
            </Grid>

        </>
        
        
    )
}

export default ProductsByCategory
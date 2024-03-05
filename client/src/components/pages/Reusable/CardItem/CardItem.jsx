import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button,Rating } from '@mui/material';
import {useAppContext} from '../../../../context/CartContext'
import ReviewForm from '../Review/ReviewForm';

const CardItem = () => {

    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    // const [cart, setCart] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { addToCart } = useAppContext();

    useEffect(() => {
        // Fetch data for the specific ID
        axios.get(`http://127.0.0.1:8000/api/v1/product/getone/${id}`)
            .then((response) => {
                setItemData(response.data.data);
                // console.log(response.data.data.categoryId)
                
                // Fetch category details based on categoryId
                if (response.data.data.categoryId) {
                    axios.get(`http://127.0.0.1:8000/api/v1/category/getone/${response.data.data.categoryId}`)
                        .then((categoryResponse) => {
                            setCategoryData(categoryResponse.data.data);
                            // console.log(categoryResponse.data.data)
                        })
                        .catch((categoryError) => {
                            console.error(categoryError);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
            // Fetch product reviews
            axios.get(`http://127.0.0.1:8000/api/v1/review/getone/${id}`)
                .then((reviewsResponse) => {
                    const receivedReviews = reviewsResponse.data.data;

                    // console.log('Received Reviews:', receivedReviews);

                    if (receivedReviews && Array.isArray(receivedReviews)) {
                        if (receivedReviews.length > 0) {
                            // console.log('Setting Reviews:', receivedReviews);
                            setReviews(receivedReviews);
                        } else {
                            console.log('No reviews available for this product.');
                        }
                    } else {
                        console.log('Invalid or empty reviews data.');
                    }
                })
                .catch((reviewsError) => {
                    console.error(reviewsError);
                });

        }, [id]);
    
    
    const handleAddToCart = () => {
        if (itemData) {
            addToCart(itemData);
            console.log('Item added to cart:', itemData);
          }
    };

    // Calculate average rating
    const averageRating = reviews.reduce((total, review) => total + parseFloat(review.reviewrating), 0) / reviews.length;
    return (
        <>
            <Grid container spacing={3} style={{ marginTop: '16px' }}>
                <Grid item xs={12} sm={6}>
                    <img
                        src={itemData ? `http://127.0.0.1:8000/uploads/${itemData.image}` : ''}
                        alt={itemData ? itemData.name : ''}
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '16px 0 0' }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Price: {itemData ? itemData.salesprice : 'Loading...'}</Typography>
                    <Typography variant="h6">Product Name: {itemData ? itemData.name : 'Loading...'}</Typography>
                    <Typography variant="h6">Description: {itemData ? itemData.description : 'Loading...'}</Typography>
                    <Typography variant="h6">Status: {itemData ? itemData.status : 'Loading...'}</Typography>
                    <Typography variant="h6">Shipping Charge: {itemData ? itemData.shippingcharge : 'Loading...'}</Typography>
                    <Typography variant="h6">Category: {categoryData ? categoryData.name : 'Loading...'}</Typography>

                    {/* Display average rating */}
                    <Typography variant="h5" gutterBottom style={{ marginTop: '16px' }}>
                        Average Rating: {isNaN(averageRating) ? 'Not available' : averageRating.toFixed(2)}
                    </Typography>
                    {/* Display product reviews */}
                     {reviews.length > 0 ? (
                        <div>
                            <Typography variant="h5" gutterBottom style={{ marginTop: '16px' }}>
                                Product Reviews
                            </Typography>
                            {reviews.map((review) => (
                                <div key={review.id}>
                                    <Typography>{review.comment}</Typography>
                                    <Rating value={review.reviewrating} readOnly />
                                    <hr />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No reviews available for this product.
                        </Typography>
                    )} 


                    <Button variant="contained" color="primary" onClick={handleAddToCart} style={{ marginTop: '16px' }}>
                        Add to Cart
                    </Button>
                    <ReviewForm productId={id} style={{ marginTop: '16px' }}/>
                </Grid>
            </Grid>

        </>
    )
}

export default CardItem
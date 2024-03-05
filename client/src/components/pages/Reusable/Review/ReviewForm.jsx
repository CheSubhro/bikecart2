import React, { useState } from 'react';
import { TextField, Button, Typography, Rating ,Snackbar  } from '@mui/material';
import axios from 'axios';


const ReviewForm = ({ productId,onSubmit }) => {

    const [comment, setComment] = useState('');
    const [reviewrating, setReviewrating] = useState(0);
    const [showThankYou, setShowThankYou] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment || reviewrating === 0) {
            console.log('Please provide a comment and rating');
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/review/create`, {
                comment,
                reviewrating,
                productId,
            });

            console.log('Review added successfully:', response.data.message);


            // Clear form fields
            setComment('');
            setReviewrating(0);

            // Show thank you pop-up
            setShowThankYou(true);

        } catch (error) {
            console.error('Error adding review:', error.response ? error.response.data : error.message);
        }

    };

    const handleSnackbarClose = () => {
        setShowThankYou(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h5" gutterBottom>
                    Add Your Review
                </Typography>
                <TextField
                    label="Your Comment"
                    multiline
                    rows={4}
                    fullWidth
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                    <Rating
                        name="reviewrating"
                        value={reviewrating}
                        onChange={(event, newValue) => setReviewrating(newValue)}
                        size="large"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: '16px', height: '25px' }}
                    >
                        Submit Review
                    </Button>
                </div>
            </form>
            {/* Thank you pop-up */}
            <Snackbar
                open={showThankYou}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                message="Thank you for your review!"
            />
        </>
    )
}

export default ReviewForm
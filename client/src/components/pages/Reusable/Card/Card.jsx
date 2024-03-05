import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import axios from 'axios'
import { Link } from 'react-router-dom';

const MyCard = () => {

    const [data, setData] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/product/getall`).then((response) => {
            setData(response.data.data);
            // console.log(response.data.data);
        }).catch((error) => {
            console.error(error);
        })
    }, [])
    const serverBaseUrl = `http://127.0.0.1:8000/uploads`;


    return (
        <>
            <Grid container spacing={3}>
                {Object.entries(data).map(([key, card]) => (
                    <Grid item xs={12} sm={6} key={key}>
                        <Link to={`/carditem/${card._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`${serverBaseUrl}/${card.image}`}
                                alt={`${card.name}`}
                            />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Name:{card.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        Price:{card.salesprice}
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

export default MyCard
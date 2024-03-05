import React, { useEffect, useState } from 'react'
import { Container, Typography, Paper } from '@mui/material';
import axios from 'axios'

const About = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/about/getall`).then((response) => {
            setData(response.data.data);
            // console.log(response.data.data)
        }).catch((error) => {
            console.error(error);
        })
    }, [])

    return (
        <>
            <Container maxWidth="md" style={{ marginTop: '20px', marginBottom:'8px' }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    {data && Object.entries(data).map((entry) => (
                        <div key={entry[0]}>
                            <Typography variant="h4" gutterBottom>
                                {entry[1].title}
                            </Typography>
                            <Typography variant="body1">
                                {entry[1].content}
                            </Typography>
                        </div>
                    ))}
                </Paper>
            </Container>
        </>
    )
}

export default About
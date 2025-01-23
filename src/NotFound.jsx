import React from 'react';
import { Button, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h1" component="h1" align="center" sx={{ fontSize: '5rem', fontWeight: 'bold', color: '#f44336' }}>
                        Oops!
                    </Typography>
                    <Typography variant="h6" component="p" align="center" sx={{ marginBottom: 2, color: '#555' }}>
                        The page you're looking for doesn't exist. It might have been moved or deleted.
                    </Typography>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }}>
                            Go Back to Home
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img src="https://via.placeholder.com/400" alt="404 Image" style={{ maxWidth: '100%' }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default NotFound;

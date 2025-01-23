import React, { useContext } from 'react'
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import Header from './Header';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Context } from './Context/Main';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { loginUser } = useContext(Context);
    const navigator = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (email !== "" && password !== "") {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    loginUser(user);
                    navigator("/play");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                });
        } else {
            console.warn("Email and Password cannot be empty.");
        }
    }

    return (
        <div className="bg-[url('/images/27.png')] bg-cover bg-no-repeat bg-top-center">
            <Header />
        
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "100vh", padding: 2 }} 
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                    lg={4} 
                >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: { xs: 2, sm: 3 }, 
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 2,
                            boxShadow: { xs: 'none', sm: '0 4px 6px rgba(0, 0, 0, 0.1)' } 
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                color: '#333',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}
                        >
                            Login
                        </Typography>
                        <form onSubmit={loginHandler}>
                            <TextField
                                label="Email"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                name="email"
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: 1
                                }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                name="password"
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: 1
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    marginTop: 2,
                                    padding: 1,
                                    fontSize: '1rem',
                                    background: 'linear-gradient(90deg, #ff7a18, #ffca28)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #ffca28, #ff7a18)'
                                    } // Hover effect
                                }}
                            >
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}



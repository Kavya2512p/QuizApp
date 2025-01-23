import React, { useState } from 'react'
import { TextField, Button, Typography, Grid, Paper, } from "@mui/material";
import Header from './Header';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

export default function Signup() {

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const signupUser = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirm_password.value;
        if (password !== confirmPassword) {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    // e.target.reset();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
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
                            borderRadius: 2,
                            boxShadow: { xs: 'none', sm: '0 4px 6px rgba(0, 0, 0, 0.1)' }
                        }}
                    >
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: '#333'
                            }}
                        >
                            Register
                        </Typography>
                        <form onSubmit={signupUser}>
                            <TextField
                                label="Name"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    borderRadius: 1
                                }}
                            />
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
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Confirm Password"
                                name="confirm_password"
                                type={showPassword ? "text" : "password"}
                                margin="normal"
                                error={passwordError}
                                helperText={passwordError ? "Password must match" : ""}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
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
                                    }
                                }}
                            >
                                Register
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}

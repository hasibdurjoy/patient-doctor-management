import { Container, Typography, TextField, Button, CircularProgress, Alert, AlertTitle, Select, MenuItem, FormControl, InputLabel, Input } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Register = () => {

    const [loginData, setLoginData] = useState({});
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { user, registerUser, isLoading, authError } = useAuth();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLogInSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert("your password didn't match try again")
        }
        else {
            registerUser(loginData.email, loginData.password, loginData.name, loginData.role, loginData.dateOfBirth, image, navigate);
        }

        e.preventDefault();
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ mt: 5 }}>
                    <Typography variant="body1">Register</Typography>
                    {
                        !isLoading && <form onSubmit={handleLogInSubmit}>
                            <TextField
                                required
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Your Name"
                                variant="standard"
                                name="name"
                                type="text"
                                onChange={handleOnChange} />

                            <TextField
                                required
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Your Email"
                                variant="standard"
                                name="email"
                                type="email"
                                onChange={handleOnChange} />
                            <FormControl fullWidth>
                                {/* <InputLabel id="demo-simple-select-label">Date Of Birth</InputLabel> */}
                                <TextField
                                    required
                                    sx={{ width: "75%", m: 1 }}
                                    id="standard-basic"
                                    placeholder='date of birth'
                                    variant="standard"
                                    name="dateOfBirth"
                                    type="date"
                                    onChange={handleOnChange} />
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    sx={{ width: "75%", m: 1 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={studentClass}
                                    label="Class"
                                    name="role"
                                    onChange={handleOnChange}
                                >
                                    <MenuItem value='patient'>Patient</MenuItem>
                                    <MenuItem value='doctor'>Doctor</MenuItem>
                                </Select>
                            </FormControl>

                            <Input
                                accept="image/*"
                                type="file"
                                onChange={e => setImage(e.target.files[0])}
                            />

                            <TextField
                                required
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Your Password"
                                variant="standard"
                                type="password"
                                name="password"
                                onChange={handleOnChange} />

                            <TextField
                                required
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Confirm Password"
                                variant="standard"
                                type="password"
                                name="password2"
                                onChange={handleOnChange} />

                            <Button variant="contained" type="submit" sx={{ width: "75%", m: 1 }}>Register</Button>

                            <NavLink to="/login" style={{ textDecoration: "none" }}> <Button variant="text" type="submit" sx={{ width: "75%", m: 1, textDecoration: "none" }}>Already registered?? please login</Button></NavLink>

                        </form>
                    }
                    {
                        isLoading && <CircularProgress color="success" />
                    }
                    {
                        user?.email && <><Alert severity="success">
                            <AlertTitle>Successfully added user</AlertTitle>
                            Thank you for joining us — <strong>check it out!</strong>
                        </Alert></>
                    }
                    {
                        authError && <Alert severity="error">
                            <AlertTitle>{authError}</AlertTitle>
                        </Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src="https://i.ibb.co/kMwwZmK/login.png" alt="" style={{ width: "100%" }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
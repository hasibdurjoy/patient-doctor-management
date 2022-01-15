import React from 'react';
import { MuiNavbar, NavItem } from 'mui-navbar';
import useAuth from '../../../hooks/useAuth';
import { Button } from '@mui/material';

const Navigation = () => {
    const { user, logOut } = useAuth();
    return (
        <MuiNavbar>
            <NavItem to="/patient">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/Blog">Blog</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            {
                user?.email ? <>
                    <Button variant='contained'>{user.displayName}</Button>
                    <Button variant='contained' onClick={logOut}>LogOut</Button>
                </>
                    :
                    <>
                        <NavItem to="/register">Sign UP</NavItem>
                        <NavItem to="/login">Log IN</NavItem>
                    </>
            }
        </MuiNavbar>
    );
};

export default Navigation;

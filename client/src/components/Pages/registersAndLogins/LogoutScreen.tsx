import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signedOut } from '../../../features/authenticateSlice';

export default function LogoutScreen() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        window.localStorage.removeItem('token');
        setTimeout(() => {
            navigator('/');
            dispatch(signedOut());
        }, 1000);
    });
  return (
    <>
        <CssBaseline/>
        <Container component='main'>
            <Typography>
                You are now being logged out!
            </Typography>
        </Container>
    </>
  )
}

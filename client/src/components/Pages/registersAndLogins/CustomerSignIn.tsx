import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import { SignInForm } from '../../../interfaces/loginForm';
import { signIn } from '../../../apiCommunicator';
import Response from '../../../interfaces/response';
import { useNavigate } from 'react-router-dom';
import { selectAuth, signedIn } from '../../../features/authenticateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerUser } from '../../../features/userSlice';

const theme = createTheme();

export default function CustomerSignIn() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const authSelector = useSelector(selectAuth);
  const signInCustomer = async (form: SignInForm) => {
    return await signIn(form);
  };
  React.useEffect(() => {
    if (authSelector === true) {
      navigator('/');
    }
  });
  
  const loginMutation = useMutation(signInCustomer, {
    onSuccess: (data, variables, context) => {
      const identity = data.message as any;
      identity['type'] = 'CUSTOMER';
      localStorage.setItem('token', JSON.stringify(identity));
      dispatch(signedIn());
      dispatch(setCustomerUser());
      
      setTimeout(() => {
        navigator('/');
      }, 5000);
    },
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form: SignInForm = {
      username: data.get('username')?.toString()!,
      password: data.get('password')?.toString()!,
      loginType: 'CUSTOMER',
      rememberMe: data.has('remember')
    };
    loginMutation.mutate(form);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              name='remember'
              id='remember'
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Typography component='p' variant='body1'>{
            loginMutation.isLoading ? (
              'Please wait.'
            ) : null}
            {
              loginMutation.isError ? (
                `The username or the password are incorrect. Please try again. \n ${(loginMutation.error as Response).message}`
              ) : null}
            {
              loginMutation.isSuccess ? (
                'Login successfully! Redirecting to main menu.'
              ) : null}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
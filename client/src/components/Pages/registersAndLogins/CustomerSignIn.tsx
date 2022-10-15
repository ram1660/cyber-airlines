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
import { useMutation } from 'react-query';
import { SignInForm } from '../../../interfaces/loginForm';
import { signIn } from '../../../apiCommunicator';
import Response from '../../../interfaces/response';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthInterface } from '../../../context/AuthProvider';
import { LoggedIn } from '../../../globals';

const theme = createTheme();

export default function CustomerSignIn() {
  const navigator = useNavigate();
  const signInCustomer = async (form: SignInForm) => {
    return await signIn(form);
  };
  const loggedInCtx = React.useContext(LoggedIn);
  React.useEffect(() => {
    if (loggedInCtx === true) {
      navigator('/');
    }
  });
  
  const loginMutation = useMutation(signInCustomer, {
    onSuccess(data, variables, context) {
      localStorage.setItem('token', JSON.stringify(data.message));
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
      type: 'customer'
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
                `Could not perform register. Please try again. \n ${(loginMutation.context as Response).message}`
              ) : null}
            {
              loginMutation.isSuccess ? (
                'Register successfully! Redirecting to login screen.'
              ) : null}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
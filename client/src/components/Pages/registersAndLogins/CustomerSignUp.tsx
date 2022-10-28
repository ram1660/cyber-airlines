import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '../../../apiCommunicator';
import { CustomerRegisterForm } from '../../../interfaces/registerForms';
import Response from '../../../interfaces/response';
import { LoggedIn } from '../../../globals';

const theme = createTheme();

export default function CustomerSignUp() {
  // Hooks
  const [submitStatus, setSubmitStatus] = React.useState(false);
  const navigator = useNavigate();
  const loggedInCtx = React.useContext(LoggedIn);
  React.useEffect(() => {
    if (loggedInCtx === true) {
      navigator('/');
    }
  });
  // Server request/handling.
  const sendRegisterForm = async (form: CustomerRegisterForm) => {
    return await registerCustomer(form);
  }
  const registerMutation = useMutation(sendRegisterForm, {
    onSuccess: (data, variables, context) => {
      setTimeout(() => {
        navigator('/login');
      }, 5000);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (submitStatus === true) {
      return;
    }
    setSubmitStatus(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const registerForm: CustomerRegisterForm = {
      firstName: data.get('firstName')?.toString()!,
      lastName: data.get('lastName')?.toString()!,
      username: data.get('username')?.toString()!,
      password: data.get('password')?.toString()!
    };
    registerMutation.mutate(registerForm);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login/airline" variant="body2">
                  Are you an airline? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Typography color='common.red' component='p' variant='body1'>{
            registerMutation.isLoading ? (
              'Please wait while we are sending your request!'
            ) : null}
            {
              registerMutation.isError ? (
                `Could not perform login. Please try again.\n ${(registerMutation.context as Response).message}`
              ) : null}
            {
              registerMutation.isSuccess ? (
                'Register successfully! Redirecting to login screen.'
              ) : null}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
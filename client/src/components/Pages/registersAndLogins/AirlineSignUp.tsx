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
import { registerAirline } from '../../../apiCommunicator';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AirlineRegisterForm } from '../../../interfaces/registerForms';

const theme = createTheme();

export default function AirLineSignUp() {
  const [submitStatus, setSubmitStatus] = React.useState(false);
  const navigator = useNavigate();
  const sendRegisterForm = async (form: AirlineRegisterForm) => {
    return await registerAirline(form);
  }
  const registerMutation = useMutation(sendRegisterForm, {
    onSuccess: (data, variables, context) => {
      console.log(data);
      setTimeout(() => {
        navigator('/login/airline');
      }, 5000);
    },
    onError: (error, variables, context) => {
      console.log(error);
    }
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const form: AirlineRegisterForm = {
      airlineName: data.get('airlineName')?.toString()!,
      username: data.get('username')?.toString()!,
      password: data.get('password')?.toString()!
    }
    registerMutation.mutate(form);
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
            Airline sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Airline name"
                  required
                  fullWidth
                  id="airlineName"
                  label="Airline name"
                  autoFocus
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
            <Grid container justifyContent="space-evenly">
              <Grid item>
                <Link href="/login/airline" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  Are you a customer? Click here to sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Typography component='p' variant='body1'>{
            registerMutation.isLoading ? (
              'Please wait while we are sending your request!'
            ) : null}
            {
              registerMutation.isError ? (
                'Could not perform register. Please try again'
              ) : null
            }
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
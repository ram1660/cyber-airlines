import { Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function PageNotFound() {
  const redirect = useNavigate();
  setTimeout(() => {
    redirect('/home');
  }, 5000);
  return (
    <>
      <CssBaseline />
      <Container>Oops this page doesn't exists</Container>
    </>
  )
}

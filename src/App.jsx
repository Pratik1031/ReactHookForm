import { teal } from '@mui/material/colors';
import './App.css';
import RegisterForm from './pages/RegisterForm';
import { Container } from '@mui/material';

function App() {
  return (
    <Container
      maxWidth='xs'
      sx={{
        border: '1px solid #e0e0e0',
        boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.5)',
        padding: '5px',
        borderRadius: '4px',
      }}
    >
      <RegisterForm />
    </Container>
  );
}

export default App;

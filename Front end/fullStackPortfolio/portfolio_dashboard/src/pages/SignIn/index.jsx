import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Card, Container, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Card sx={{
        margin: '20px auto',
        p: 3,
        width: '50%'
      }}>
        <div>Sign In</div>
        <form onSubmit={handleSubmit}>
          <Input
            sx={{
              width: '100%'
            }}
            type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
          <br />
          <Input
            sx={{
              width: '100%'
            }}
            type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
          <br />
          <Button
            sx={{
              border: '1px solid',
              my: 2
            }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default SignIn;
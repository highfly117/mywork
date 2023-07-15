import React, { useState } from 'react';
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const SigninModel = ({ open, toggleModal, onSignUpClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState(null);
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      password
    };

    try {
      console.log(userData)
      //const response = await axios.post('http://localhost:5000/api/v1/Signin', userData); // replace with your server URL
      const response = await axios.get("https://express-api-git-master-highfly117.vercel.app/api/v1/Signin", userData);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setSignUpError(null);
      toggleModal();
      console.log(response.data.user)
    } catch (error) {
      setSignUpError(error.response.data.message);
      console.log(error)
    }
  };

  return (
    <Dialog open={open} onClose={toggleModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <DialogContent>
        <DialogContentText >
          <p>{signUpError}</p>
          <br></br>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Username or Email"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="Password"
          label="Password"
          type="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSignUpClick} color="primary">
          Sign Up
        </Button>
        <Button onClick={toggleModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignUp} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SigninModel;


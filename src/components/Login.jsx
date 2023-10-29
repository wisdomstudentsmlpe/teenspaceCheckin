import React, { useContext, useState } from 'react'
import { FirebaseContext } from "../store/Context"


import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';


function Login() {

  const { firebase } = useContext(FirebaseContext)
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {

    if(!email || !password){
      alert('Please enter Email and Password!');
      return;
    }
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      // alert('Logged In');
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigate(`/admin`);
        }
        else {
          navigate('/');
        }
      });
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <>
      <div className='h-screen px-3 bg-gradient-to-bl from-cyan-400 to-pink-600 flex items-center'>

        <div className='sm:mx-auto sm:text-center h-[600px] sm:h-auto'
          style={{ backgroundImage: 'url(/login-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', }}>
          <div className='mt-24 sm:mt-5'>
            <p className='text-2xl font-bold text-center'
            >Admin Login</p>
          </div>

          <div className='text-center my-24 sm:my-5'>

            <TextField
              sx={{
                width: '90%', marginBottom: '10px', "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: 'black',
                  color: 'black',
                },
              }}
              size="small"
              color='secondary'
              required
              id="outlined-required"
              label="email"
              type='email'
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />

            <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
              <InputLabel color='secondary' htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                color='secondary'
                size='small'
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: 'black',
                    color: 'black',
                  },
                  "& .MuiSelect-select": {
                    borderColor: 'black', // Make the background transparent on focus
                    color: 'black', // Change text color on focus
                  },
                }}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ color: 'black' }}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(event) => { event.preventDefault() }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </FormControl>

            <div className='text-center mb-10 mt-5'>
              <Button

                onClick={handleLogin}
                variant="outlined"
                sx={{
                  borderRadius: '30px',
                  borderWidth:'2px',
                  padding:'10px 30px 10px 30px',
                  '&:hover': {
                    backgroundColor: '#2E9AFE',
                    borderColor: '#2E9AFE',
                    color: 'white',
                    
                  },
                }}
                startIcon={<LoginIcon />}>
                login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
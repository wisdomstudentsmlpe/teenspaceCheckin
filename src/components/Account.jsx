import React, { useContext } from 'react'

import {FirebaseContext} from '../store/Context'

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Button from '@mui/material/Button';

function Account() {


  const {firebase} = useContext(FirebaseContext);

  
  return (
    <div>

      <Button

        onClick={handleLogOut}
        variant="outlined"
        sx={{
          borderRadius: '30px',
          borderWidth: '2px',
          padding: '10px 30px 10px 30px',
          '&:hover': {
            backgroundColor: '#2E9AFE',
            borderColor: '#2E9AFE',
            color: 'white',

          },
        }}
        startIcon={<LogoutOutlinedIcon />}>
        logout
      </Button>
    </div>
  )
}

export default Account
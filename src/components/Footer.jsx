import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { AuthContext } from '../store/Context'

function Footer() {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <div className='flex fixed bottom-0 w-full bg-sky-500 h-[70px] py-3 text-white z-20'>
            {user ? 
            <>
                <div className='w-4/12 border-slate-400 border-r-2 text-center '>
                    <IconButton color='inherit' size='small'
                        onClick={() => { navigate('/'); location.reload(); }}>
                        <HomeOutlinedIcon />
                    </IconButton>
                    <p className='text-xs'>Home</p>
                </div>

                <div className='w-4/12 border-slate-400 border-r-2 text-center'>
                    <IconButton color='inherit' size='small'
                        onClick={() => { navigate('/regList') }}>
                        <ListRoundedIcon />
                    </IconButton>
                    <p className='text-xs'>Registered</p>
                </div>
                <div className='w-4/12 border-slate-400 text-center'>
                    <IconButton color='inherit' size='small'
                        onClick={() => { navigate('/checkInList') }}>
                        <PlaylistAddCheckCircleOutlinedIcon />
                    </IconButton>
                    <p className='text-xs'>Check in</p>
                </div>

                {/* <div className='w-3/12 text-center'>
                    <IconButton color='inherit' size='small'
                        onClick={() => { navigate('/admin') }}>
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                    <p className='text-xs'>Account</p>
                </div> */}
            </> :

            <>
                <div className='w-5/12 border-slate-400 border-r-2 text-center mx-auto'>
                    <IconButton color='inherit' size='small'
                        onClick={() => { navigate('/'); location.reload(); }}>
                        <HomeOutlinedIcon />
                    </IconButton>
                    <p className='text-xs'>Home</p>
                </div>


                <div className='w-5/12 text-center mx-auto'>
                    <IconButton color='inherit' size='small'
                        onClick={() => { navigate('/admin') }}>
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                    <p className='text-xs'>Account</p>
                </div>
            </>}

        </div>
    )
}

export default Footer
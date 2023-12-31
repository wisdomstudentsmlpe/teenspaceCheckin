import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';


import { RegStudentsContext, AuthContext, FirebaseContext } from '../store/Context';

import Button from '@mui/material/Button';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Home() {

    const navigate = useNavigate();

    const { regStudents } = useContext(RegStudentsContext);
    const { user } = useContext(AuthContext);
    const { firebase } = useContext(FirebaseContext);

    const totalRegStudents = regStudents.length;
    const totalCheckInCount = regStudents.filter((student) => student.checked === true).length;

    const handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            navigate('/');
        })
    }


    return (
        <>
            <div className='custom-bg-image h-screen flex items-center bg-gradient-to-bl from-cyan-400 to-pink-600 pb-[25%] md:pb-[0%] sm:pt-3'>
                <div className='md:flex'>
                    <div className='w-full md:w-6/12 md:border-r-2'>
                        <div className='flex sm:w-6/12 mx-auto mb-5 sm:mb-5 justify-center bg-slate-50 bg-opacity-50 py-5'>
                            <img className='w-5/12 border-r pr-4' src="images/students-logo.png" alt="" />
                            <img className='w-4/12 ' src="images/girls-logo.png" alt="" />
                        </div>
                        <img className='w-8/12 sm:w-5/12 mx-auto my-10' src="images/logo.png" alt="" />


                        <div className='mx-auto flex justify-between my-5 sm:my-5 text-center'>
                            <div className='mx-auto rounded-lg bg-slate-100 m-1 p-2 w-[40%]'>
                                <h1 className='font-bold text-teal-700'>Total Registraion</h1><p className='text-white font-medium rounded-full bg-red-600 w-fit px-4 py-2 mx-auto my-1'>{totalRegStudents}</p>
                            </div>
                            <div className=' mx-auto rounded-lg bg-slate-100 m-1 p-2 w-[40%]'>
                                <h1 className='font-bold text-teal-700'>Checked In</h1><p className='text-white font-medium rounded-full bg-red-600 w-fit px-4 py-2 mx-auto my-1'>{totalCheckInCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-6/12 text-center justify-between md:my-auto'>
                        <Button

                            onClick={() => { navigate('/regForm') }}
                            variant="outlined"
                            sx={{
                                width: '40%',
                                fontSize: '10px',
                                margin: '10px',
                                borderRadius: '20px',
                                borderColor: '#ffff',
                                color: '#ffff',
                                '&:hover': {
                                    backgroundColor: '#2E9AFE',
                                    borderColor: '#2E9AFE',
                                    color: 'white',
                                },
                            }}
                            startIcon={<PersonAddAltOutlinedIcon />}>
                            Register Now
                        </Button>

                        {!user ? <Button
                            className=''
                            onClick={() => { navigate('/admin') }}
                            variant="outlined"
                            sx={{
                                width: '25%',
                                fontSize: '10px',
                                margin: '10px',
                                borderRadius: '20px',
                                borderColor: '#ffff',
                                color: '#ffff',
                                '&:hover': {
                                    backgroundColor: '#2E9AFE',
                                    borderColor: '#2E9AFE',
                                    color: 'white',
                                },
                            }}
                            startIcon={<LoginIcon />}>
                            Login
                        </Button> :
                            <Button

                                onClick={handleLogOut}
                                variant="outlined"
                                sx={{
                                    width: '25%',
                                    fontSize: '10px',
                                    margin: '10px',
                                    borderRadius: '20px',
                                    borderColor: '#ffff',
                                    color: '#ffff',
                                    '&:hover': {
                                        backgroundColor: '#2E9AFE',
                                        borderColor: '#2E9AFE',
                                        color: 'white',
                                    },
                                }}
                                startIcon={<LogoutOutlinedIcon />}>
                                Logout
                            </Button>}
                    </div>

                </div>

            </div>
        </>
    )
}

export default Home
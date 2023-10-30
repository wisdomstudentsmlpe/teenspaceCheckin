import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseContext } from "../store/Context";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


function RegisterForm() {

    const navigate = useNavigate();
    const { firebase } = useContext(FirebaseContext);

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [place, setPlace] = useState('');
    const [school, setSchool] = useState('');
    const [standard, setStandard] = useState('');
    const [parentNum, setParentNum] = useState();
    const [phone, setPhone] = useState();
    const [zone, setZone] = useState('');



    const handleSubmit = async () => {
        if (!name || !gender || !place || !school || !standard || !parentNum || !phone || !zone) {
            alert('Please fill all fields');
            return;
        }

        // Add data to Firestore (Unchanged from your original code)
        try {
            await firebase.firestore().collection('test').add({
                name: name,
                gender: gender,
                place: place,
                school: school,
                class: standard,
                parentNumber: parentNum,
                phoneNumber: phone,
                zone: zone,
            });

            alert('Registration Success!');

            // Clear form fields
            setName('');
            setGender('');
            // Clear other fields
        } catch (error) {
            alert('Sorry, Please Retry!');
            console.error(error);
        }

        // Add data to Google Sheets
        const sheetData = {
            name,
            gender,
            place,
            school,
            class: standard,
            parentsNumber: parentNum,
            phoneNumber: phone,
            zone,
        };

        try {
            await fetch('https://script.google.com/macros/s/AKfycbw6xBabHWVelWmWt5hHJUy6UjgHgbNFzXGLNVYOnAosng7CB_07bpfBpl5_IS2hr2w/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sheetData),
            });

            // Reload the page or perform any other desired action upon successful Google Sheets submission
            window.location.reload(); // This line reloads the page
        } catch (error) {
            alert('Error submitting to Google Sheets. Please retry.');
            console.error(error);
        }
    };

    return (
        <div className='px-3 bg-gradient-to-bl from-cyan-400 to-pink-600 py-[5%]'>

            <div className='md:w-6/12 md:pt-20'>

                <div>
                    <h1 className='text-[25px] font-bold font-serif text-center py-1 px-14 md:w-[400px] md:h-[100px] md:mx-auto text-blue-900'
                        style={{ backgroundImage: 'url(/regbg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundPositionX: '30px' }}>
                        Secure Your Spot!</h1>
                </div>

                <Box
                    className='flex-wrap mx-auto h-screen overflow-y-auto md:my-auto'
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '95%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className='bg-white  py-3 md:mt-10 rounded-md'>


                        <TextField
                            size="small"
                            color='secondary'
                            required
                            id="outlined-required"
                            label="Name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <FormControl required sx={{ m: 1, minWidth: '95%' }} size="small">
                            <InputLabel id="demo-simple-select-required-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={gender}
                                label="Gender  *"
                                onChange={(e) => { setGender(e.target.value) }}
                            >
                                <MenuItem value="">
                                    <em className='text-gray-400'>Select Gender</em>
                                </MenuItem>
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            size="small"
                            color='secondary'
                            required
                            id="outlined-required"
                            label="Place"
                            value={place}
                            onChange={(e) => { setPlace(e.target.value) }}
                        />

                        <TextField
                            size="small"
                            color='secondary'
                            required
                            id="outlined-required"
                            label="School"
                            value={school}
                            onChange={(e) => { setSchool(e.target.value) }}
                        />

                        <FormControl required sx={{ m: 1, minWidth: '95%' }} size="small">
                            <InputLabel id="demo-simple-select-required-label">Class</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={standard}
                                label="Class  *"
                                onChange={(e) => { setStandard(e.target.value) }}
                            >
                                <MenuItem value="">
                                    <em className='text-gray-400'>Select Class</em>
                                </MenuItem>
                                <MenuItem value={"11"}>11</MenuItem>
                                <MenuItem value={"12"}>12</MenuItem>
                            </Select>
                        </FormControl>

                        <div className='sm:flex w-full sm:w-[650px] md:w-[700px] sm:mx-auto text-gray-500'>
                            <div className='my-3 mx-auto w-11/12'>
                                <label htmlFor="">Phone Number *</label>
                                <PhoneInput
                                    inputProps={{ required: true }}
                                    onlyCountries={['in']}
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                />
                            </div>
                            <div className='my-3 mx-auto w-11/12'>
                                <label htmlFor="">Parents Phone Number *</label>
                                <PhoneInput
                                    inputProps={{ required: true }}
                                    onlyCountries={['in']}
                                    country={'in'}
                                    value={parentNum}
                                    onChange={(phone) => setParentNum(phone)}
                                />
                            </div>
                        </div>




                        <FormControl required sx={{ m: 1, minWidth: '95%' }} size="small">
                            <InputLabel id="demo-simple-select-required-label">Zone</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={zone}
                                label="Zone  *"
                                onChange={(e) => { setZone(e.target.value) }}
                            >
                                <MenuItem value="">
                                    <em className='text-gray-400'>Select Zone</em>
                                </MenuItem>
                                <MenuItem value={"Anamangad"}>Anamangad</MenuItem>
                                <MenuItem value={"Angadippuram"}>Angadippuram</MenuItem>
                                <MenuItem value={"Perinthalmanna"}>Perinthalmanna</MenuItem>
                                <MenuItem value={"Pandikkad"}>Pandikkad</MenuItem>
                                <MenuItem value={"Karuvarakkund"}>Karuvarakkund</MenuItem>
                                <MenuItem value={"Kalikavu"}>Kalikavu</MenuItem>
                                <MenuItem value={"Amarambalam"}>Amarambalam</MenuItem>
                                <MenuItem value={"Wandoor"}>Wandoor</MenuItem>
                                <MenuItem value={"Edavanna"}>Edavanna</MenuItem>
                                <MenuItem value={"Othai"}>Othai</MenuItem>
                                <MenuItem value={"Mampad"}>Mampad</MenuItem>
                                <MenuItem value={"Nilambur"}>Nilambur</MenuItem>
                                <MenuItem value={"Chungathra"}>Chungathra</MenuItem>
                                <MenuItem value={"Edakkara"}>Edakkara</MenuItem>
                                <MenuItem value={"Moothedam"}>Moothedam</MenuItem>
                            </Select>
                        </FormControl>


                        <div className='text-center py-2'>
                            <Button
                                onClick={handleSubmit}
                                variant="outlined"
                                sx={{
                                    borderRadius: '20px',
                                    borderColor: '#FF69B4',
                                    color: '#FF69B4',
                                    '&:hover': {
                                        backgroundColor: '#2E9AFE',
                                        borderColor: '#2E9AFE',
                                        color: 'white',
                                    },
                                }}
                                startIcon={<PersonAddAltOutlinedIcon />}>
                                Register
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default RegisterForm
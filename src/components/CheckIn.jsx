import React, { useContext, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { RegStudentsContext, FirebaseContext } from "../store/Context";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #ffff',
  color: 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.45),
    color: 'white',
    border: '1px solid #ffff',
  },
  width: '95%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '0%',
    width: '65%',
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: '0%',
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function CheckIn() {
  const { regStudents } = useContext(RegStudentsContext);
  const totalRegStudent = regStudents.length;
  const totalCheckInCount = (totalRegStudent) - (regStudents.filter((student) => !student.checked).length);

  //search section---------------------------

  const [zone, setZone] = useState('');
  const filterZoneCheckIns = (query, regStudents) => {
    if (!query) {
      return regStudents.filter((student) => student.checked);
    } else {
      return regStudents.filter((student) => student.zone.toLowerCase().includes(query.toLowerCase()));
    }
  };

  const zonecheckList = filterZoneCheckIns(zone, regStudents).filter((student) => student.checked);
  const zoneCheckInCount = zonecheckList.length;

  const [zoneCheckInStudent, setZoneCheckInStudent] = useState("");
  const filterZoneCheckInstudent = (query, zonecheckList) => {
    if (!query) {
      return zonecheckList;
    } else {
      return zonecheckList.filter((student) => student.name.toLowerCase().includes(query.toLowerCase()));
    }
  };

  //----------------------------------------------



  return (
    <>
      <div className='h-screen bg-gradient-to-bl from-cyan-400 to-pink-600 overflow-y-auto'>

        <div className='pt-5'>
          <FormControl required sx={{ m: 1, minWidth: '95%' }} size="small">
            <InputLabel sx={{ color: 'white' }} id="zonelabel">Zone</InputLabel>
            <Select
              labelId="zonelabel"
              id="zone"
              value={zone}
              label="Zone  *"
              onChange={(e) => { setZone(e.target.value) }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: 'white',
                  color: 'white',
                },
                "& .MuiSelect-select": {
                  borderColor: 'transparent', // Make the background transparent on focus
                  color: 'white', // Change text color on focus
                },
              }}
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
        </div>

        <Search className='mx-auto'>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setZoneCheckInStudent(e.target.value)}
          />
        </Search>

        <div className='flex items-center justify-between w-12/12 mx-auto mt-3 text-xs'>
          <h1 className='rounded-lg mx-auto w-5/12 '
            style={{ backgroundImage: 'url(/countbg.png)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}>Total Checked In <br /><p className='text-center text-xl text-white font-bold shadow-lg rounded-sm'>{totalCheckInCount}</p> </h1>
          <h1 className='rounded-lg mx-auto w-5/12'
            style={{ backgroundImage: 'url(/countbg.png)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}><strong>{zone? zone: 'Zone'}</strong> Checked In <br /><p className='text-center text-xl text-white font-bold shadow-lg rounded-sm'>{zoneCheckInCount}</p> </h1>
        </div>

        <div className='flex pt-5'>
          <TableContainer component={Paper} className='mx-2 max-h-[400px] overflow-y-auto'>
            <Table size="small" aria-label="registered students">

              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: '15px' }}>Registered</TableCell>
                  <TableCell align="right">CheckIn</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filterZoneCheckInstudent(zoneCheckInStudent, zonecheckList).map((student, index) => (
                  <TableRow
                    key={student.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{student.name}<br />{student.phoneNumber}</TableCell>
                    <TableCell >
                      <p className='p-1 rounded-lg bg-green-600 w-fit mx-auto text-white'>Checked In</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}

export default CheckIn
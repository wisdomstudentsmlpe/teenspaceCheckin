import React, { useContext, useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { RegStudentsContext, FirebaseContext } from "../store/Context";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import StudentDataView from './StudentDataView';

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
  width: '90%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 'auto',
    width: '90%',
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: 'auto',
    width: '80%',
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
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));




function RegList() {

  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState([]);

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
    console.log(selectedStudent);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { setRegStudents } = useContext(RegStudentsContext)

  const { firebase } = useContext(FirebaseContext);
  const { regStudents } = useContext(RegStudentsContext);

  const totalRegCount = regStudents.length;
  const theme = useTheme();

  //search section---------------------------

  const [zone, setZone] = useState('');
  const filterZoneRegs = (query, regStudents) => {
    if (!query) {
      return [];
    } else {
      return regStudents.filter((student) => student.zone.toLowerCase().includes(query.toLowerCase()));
    }
  };

  const zoneRegList = filterZoneRegs(zone, regStudents);
  //.filter((student) => !student.checked)
  const zonRegCount = zoneRegList.length;

  const [RegStudent, setRegStudent] = useState("");
  const filterZoneRegStudent = (query, zoneRegList) => {
    if (!query) {
      return zoneRegList;
    } else {
      return zoneRegList.filter((student) => student.name.toLowerCase().includes(query.toLowerCase()));
    }
  };

  const filterRegStudents = (query, regStudents) => {
    if (!query) {
      return regStudents;
    } else {
      return regStudents.filter((student) => student.name.toLowerCase().includes(query.toLowerCase()));
    }
  }
  //----------------------------------------------




  const handleCheckin = async (event, studentId, index) => {

    const updatedRegStudents = [...regStudents]; // Create a copy of the current list
    updatedRegStudents[index].checked = event.target.checked;
    setRegStudents(updatedRegStudents);

    // Set a loading indicator for the specific student
    updatedRegStudents[index].loading = true;
    setRegStudents(updatedRegStudents);

    if (event.target.checked) {
      try {
        // await firebase.firestore().collection('test').doc(studentId).update({
        //   checked: true
        // });
        // alert("Student CheckedIn successfully in Firebase");

        const student = zone ? filterZoneRegStudent(RegStudent, zoneRegList)[index] : filterRegStudents(RegStudent, regStudents)[index];

        // Include the checked status in the student data
        const sheetData = {
          name: student.name,
          gender: student.gender,
          place: student.place,
          school: student.school,
          class: student.class,
          phoneNumber: student.phoneNumber,
          parentsNumber: student.parentsNumber,
          zone: student.zone,
          checked: true, // Set checked status to true when checked in
        };

        // Make a POST request to update Google Sheets
        try {
          await fetch('https://script.google.com/macros/s/AKfycbzXspfj1-Ixhm8RW6va0tU_0uCbUMAw0TNgG3Y7WKKP19unOhnOpnmuAEKrdEC6gYU/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sheetData),
          });

        } catch (error) {
          updatedRegStudents[index].checked = !event.target.checked;
          setRegStudents(updatedRegStudents);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // await firebase.firestore().collection('test').doc(studentId).update({
        //   checked: false
        // });
        // alert("Student CheckedOut successfully in Firebase");

        const student = zone ? filterZoneRegStudent(RegStudent, zoneRegList)[index] : filterRegStudents(RegStudent, regStudents)[index];
        const sheetData = {
          name: student.name,
          gender: student.gender,
          place: student.place,
          school: student.school,
          class: student.class,
          phoneNumber: student.phoneNumber,
          parentsNumber: student.parentsNumber,
          zone: student.zone,
          checked: false, // Set checked status to false when not checked in
        };

        // Make a POST request to update Google Sheets
        try {
          await fetch('https://script.google.com/macros/s/AKfycbzXspfj1-Ixhm8RW6va0tU_0uCbUMAw0TNgG3Y7WKKP19unOhnOpnmuAEKrdEC6gYU/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sheetData),
          });

        } catch (error) {
          updatedRegStudents[index].checked = !event.target.checked;
          setRegStudents(updatedRegStudents);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetch('https://script.google.com/macros/s/AKfycbzXspfj1-Ixhm8RW6va0tU_0uCbUMAw0TNgG3Y7WKKP19unOhnOpnmuAEKrdEC6gYU/exec')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRegStudents(data);
      })
      .catch(error => console.error('Error:', error));

  };



  return (
    <>
      <div className='h-screen bg-gradient-to-bl from-cyan-400 to-pink-600 md:flex md:my-auto overflow-y-auto pb-[25%] py-[5%] md:py-20 md:pb-[10%]'>
        <div className='w-full md:w-6/12 flex items-center justify-center flex-col md:p-5 md:border-r-2'>
          <FormControl required
            sx={{
              m: 1,
              width: '90%',
              [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
                width: '80%',
              },
              marginBottom: '20px',
            }}
            size="small">
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


          <Search className='mx-auto'>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setRegStudent(e.target.value)}
            />
          </Search>

          <div className='flex items-center justify-between w-11/12 mx-auto mt-3 text-xs'>
            <h1 className='rounded-lg mx-auto w-5/12 '
              style={{ backgroundImage: 'url(images/countbg.png)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}>Total Registration <br /><p className='text-center text-xl text-white font-bold shadow-lg rounded-sm'>{totalRegCount}</p> </h1>
            <h1 className='rounded-lg mx-auto w-5/12'
              style={{ backgroundImage: 'url(images/countbg.png)', backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}><strong>{zone ? zone : 'Zone'}</strong> Registration <br /> <p className='text-center text-xl text-white font-bold shadow-lg rounded-sm'>{zonRegCount}</p> </h1>
          </div>

        </div>

        <div className='w-full md:w-6/12 flex pt-5 my-auto md:p-10'>
          <TableContainer
            component={Paper}
            className='mx-2 max-h-[400px] md:max-h-[600px] overflow-y-auto'
          >
            <Table size="small" aria-label="registered students">

              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: '15px' }}>Registered</TableCell>
                  <TableCell align="right">CheckIn</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {zone ? (
                  filterZoneRegStudent(RegStudent, zoneRegList).map((student, index) => (
                    <TableRow
                      key={student.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        onClick={() => handleOpen(student)}
                        component="th"
                        scope="row">{student.name}<br />
                        {student.parentsNumber} <br />
                        {student.phoneNumber}
                      </TableCell>
                      <TableCell align="right">
                        {student.loading ? ( // Check if the student is in a loading state
                          <CircularProgress size={24} color="secondary" />
                        ) : (
                          <Checkbox
                            color="success"
                            checked={student.checked}
                            onChange={(event) => handleCheckin(event, student.id, index)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  filterRegStudents(RegStudent, regStudents).map((student, index) => (
                    <TableRow
                      key={`${student.id}-${index}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        onClick={() => handleOpen(student)}
                        component="th"
                        scope="row">{student.name}<br />
                        {student.parentsNumber} <br />
                        {student.phoneNumber}
                      </TableCell>
                      <TableCell align="right">
                        {student.loading ? ( // Check if the student is in a loading state
                          <CircularProgress size={24} color="secondary" />
                        ) : (
                          <Checkbox
                            color="success"
                            checked={student.checked}
                            onChange={(event) => handleCheckin(event, student.id, index)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

            </Table>
          </TableContainer>
        </div>
      </div>

      <StudentDataView open={open} onClose={handleClose} studentDetails={selectedStudent} />
    </>
  )
}

export default RegList
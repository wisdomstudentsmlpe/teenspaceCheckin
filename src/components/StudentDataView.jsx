import React from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function StudentDataView({ open, onClose, studentDetails }) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div className='flex justify-between container'>
                    <DialogTitle>{"Student Details"}</DialogTitle>
                    <DialogActions className=''>
                        <Button onClick={onClose}>X</Button>
                    </DialogActions>
                </div>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className='sm:flex'>
                            <img className='w-[50%] sm:w-[30%] sm:h-[30%] my-auto mx-auto' src="images/stddataicon.png" alt="" />
                            <div className='sm:w-6/12 my-2 py-2 px-1 rounded-lg bg-cyan-200 text-blue-950 font-medium'>
                                <p>Name: <span className='font-light'>{studentDetails.name}</span></p>
                                <p>Gender: <span className='font-light'>{studentDetails.gender}</span></p>
                                <p>Place: <span className='font-light'>{studentDetails.place}</span></p>
                                <p>School: <span className='font-light'>{studentDetails.school}</span></p>
                                <p>Class:<span className='font-light'>{studentDetails.class}</span> </p>
                                <p>Phone Number: <span className='font-light'>{studentDetails.phoneNumber}</span></p>
                                <p>Parents Number: <span className='font-light'>{studentDetails.parentsNumber}</span></p>
                                <p>Zone: <span className='font-light'>{studentDetails.zone}</span></p>
                                <p>Checked In: <span className={`${studentDetails.checked ? 'text-green-600': 'text-red-600'}`}>{studentDetails.checked ? 'Yes' : 'No'}</span></p>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}

export default StudentDataView
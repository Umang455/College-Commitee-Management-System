import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { DesktopDatePicker, DesktopDateTimePicker, MobileDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import ReactQuill from 'react-quill'
import { toast } from "react-toastify";
import { CommiteeAPI, CommiteeUpdatesAPI, UploadAPI, addProjectCommunicationAPI, addStudentAPI, getAllProjectsAPI, getCourseAPI, getSystemUsers, registerUser } from "src/config/api";
import { _isValidEmail } from "src/utils/common";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FilePicker } from "src/components/helperFunctions/filepicker";
import { useStore } from "zustand";
import { useUserStore } from "src/store/useStore";
// import { getDateRangePickerDayUtilityClass } from "@mui/lab";

export const CommiteeUpdateAdd = (props) => {
    const { open, setOpen, getData } = props;

    const [userDetails, setUserDetails] = useUserStore(state => [state.userDetailsStore, state.updateUserDetails])

    console.log(userDetails, " user details in add")
    //fields for Communication Snippet

    const [name, setName] = useState("")
    const [venue, setVenue] = useState("")
    const [phone, setPhone] = useState("")
    const [dept, setDept] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [selectedCourses, setSelectedCourses] = useState([])
    const [courses, setCourses] = useState([])
    const [image, setImage] = useState([])

    useEffect(() => {
        _getOptions()
    }, []);

    async function _getOptions() {
        try {
            let res = await axios.get(getCourseAPI);
            console.log(res.data);
            setCourses(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    console.log("MY IMAGEEE", image)

    const [file, setFile] = useState([])


    async function _onSave() {
        try {
            let filenameArray = []

            file.map((f) => {
                filenameArray.push(f.name)
            })
            console.log(filenameArray, "arrya")

            let data = {
                name,
                studentName: userDetails.name,
                studentId: userDetails._id,
                description,
                venue,
                // status: "pending",
                // dept,
                images: filenameArray,
                // image: file[0].name,
                // registeredStudents: []
            }

            await handleSubmit()

            // return
            // let formdata = new FormData()
            // formdata.append("name", name)
            // formdata.append("phone", phone)
            // formdata.append("venue", venue)
            // formdata.append("address", address)
            // formdata.append("coursesRegistered", JSON.stringify(selectedCourses))
            // formdata.append("studentImage", image[0].path)
            // formdata.append("image", image[0].name)
            let res = await axios.post(CommiteeUpdatesAPI, data)
            console.log(res.data, "ressss?>>")
            getData()
            toast.success("Request Created Successfully")
            setOpen(false)
        } catch (e) {
            console.log(e);
        }
        // console.log(communicationWith,from)
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        file.map(async (f) => {


            const formData = new FormData();
            formData.append('file', f.path);

            try {
                const response = await axios.post(UploadAPI, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('Error uploading file');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        })
    };


    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
                <DialogTitle
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: "#6366F1",
                        color: "#fff",
                        alignItems: "center",
                        height: 60,
                        padding: "20px",
                        paddingLeft: "50px",
                        paddingRight: "50px",
                    }}
                >
                    <Typography color="textPrimary" style={{ color: "#fff" }} variant="h6">
                        Post commitee Update
                    </Typography>
                    <Box>
                        <Button style={{ color: "#fff" }} onClick={() => setOpen(false)}>
                            Close
                        </Button>
                        <Button style={{ color: "#fff" }} onClick={() => _onSave()}>
                            Save
                        </Button>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box padding={2}>
                        <Typography sx={{ fontSize: 20 }}>Event Details</Typography>
                        <Divider />
                        <Grid container marginTop={1} spacing={3}>
                            <Grid item md={12} >
                                <FilePicker
                                    files={file}
                                    maxFiles={6}
                                    buttonLabel={"Upload event images"}
                                    id={"Cover Image"}
                                    setNewFiles={setFile}
                                    filetype={".png,.jpg,.jpeg"}
                                />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    label="Event Name"
                                    type="text"
                                    fullWidth
                                    variant="filled"
                                    inputProps={{
                                        value: name,
                                        onChange: (e) => setName(e.target.value),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    label="Event Venue"
                                    type="text"
                                    fullWidth
                                    variant="filled"
                                    inputProps={{
                                        value: venue,
                                        onChange: (e) => setVenue(e.target.value),
                                    }}
                                />
                            </Grid>
                            {/* <Grid item xs={6} md={4}>
                                <Autocomplete
                                    options={["IT", "AIDS", "EXTC", "COMP"]}
                                    // multiple
                                    onChange={(e, newValue) => setDept(newValue)}
                                    // getOptionLabel={(s) => s.name}
                                    value={dept}
                                    renderInput={(params) => <TextField {...params} label="Commitee Department" />}
                                />
                            </Grid> */}
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="Event Description"
                                    rows={4}
                                    multiline
                                    type="text"
                                    fullWidth
                                    variant="filled"
                                    inputProps={{
                                        value: description,
                                        onChange: (e) => setDescription(e.target.value),
                                    }}
                                />
                            </Grid>
                            {/* <Grid item md={12} >
                                <Autocomplete
                                    options={courses}
                                    multiple
                                    onChange={(e, newValue) => setSelectedCourses(newValue)}
                                    getOptionLabel={(s) => s.name}
                                    value={selectedCourses}
                                    renderInput={(params) => <TextField {...params} label="Courses" />}
                                />
                            </Grid> */}
                        </Grid>
                    </Box>
                </DialogContent >
            </Dialog >
        </>
    );
};

import PropTypes from "prop-types";
import { format } from "date-fns";
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    IconButton,
    InputAdornment,
    Modal,
    OutlinedInput,
    Stack,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { useState } from "react";
import _ from "lodash";
import axios from "axios";
import { ImageBaseUrl, RegisterAPI, deleteCompanySnippet, deleteProjects, deleteStudentAPI, deleteSystemUser } from "src/config/api";
import { CommunicationSnippetEdit } from "src/components/communicationSnippets/communicationSnippetEdit";
import { toast } from "react-toastify";
import { CommunicationSnippetView } from "src/components/communicationSnippets/communicationSnippetView";
import { ProjectView } from "src/components/projects/projectView";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useUserStore } from "src/store/useStore";
import { height } from "@mui/system";

export const CommiteeTable = (props) => {
    const {
        // count = 0,
        items,
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => { },
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        getData,
    } = props;

    const selectedSome = selected.length > 0 && selected.length < items.length;
    const selectedAll = items.length > 0 && selected.length === items.length;

    const [searchTerm, setSearchTerm] = useState("");
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [openDetailModal, setOpenDetailModal] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState(null)

    let data = items;

    if (searchTerm !== "") {
        data = _.filter(data, (i) => {
            return i.name && i.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    async function _deleteProject(id) {
        try {
            let res = await axios.delete(deleteProjects(id));
            console.log(res);
            getData();
            toast.success("Deleted Successfully");
        } catch { }
    }

    const [userDetails, setUserDetails] = useUserStore(state => [state.userDetailsStore, state.updateUserDetails])

    const register = async (id) => {
        try {

            let data = {
                id: id,
                studentId: userDetails._id
            }
            let res = await axios.patch(RegisterAPI, data)
            getData()
            toast.success("Registered Successfully")
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.error)
        }
    }

    return (
        <>
            <Card sx={{ p: 2 }}>
                <OutlinedInput
                    defaultValue=""
                    fullWidth
                    placeholder="Search Commitee"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small">
                                <MagnifyingGlassIcon />
                            </SvgIcon>
                        </InputAdornment>
                    }
                    sx={{ maxWidth: 500 }}
                />
            </Card>
            <Card>
                <Scrollbar>
                    <Box sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr No.</TableCell>
                                    <TableCell>Logo</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Head Email</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((d, i) => (
                                    <TableRow>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>
                                            <img src={ImageBaseUrl + d?.image}
                                                style={{ maxWidth: 50, maxHeight: 50 }}
                                                alt="logo"
                                            />
                                        </TableCell>

                                        <TableCell>
                                            {d?.name}</TableCell>
                                        <TableCell>{d?.dept}</TableCell>
                                        <TableCell>{d?.email}</TableCell>
                                        <TableCell>{d?.description}</TableCell>

                                        {/* <TableCell onClick={() => {
                                            setOpenDetailModal(true)
                                            setSelectedEntry(d)
                                        }} >{d?.coursesRegistered?.length}</TableCell> */}
                                        <TableCell>
                                            <Tooltip title="Register for commitee">

                                                <IconButton onClick={() => register(d._id)}>
                                                    <AppRegistrationIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Scrollbar>
                <TablePagination
                    component="div"
                    count={10}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
            <Modal
                sx={{ justifyContent: 'center', alignItems: 'center' }}
                open={openDetailModal}
                onClose={() => setOpenDetailModal(false)}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', }}>

                    <Box
                        sx={{ backgroundColor: 'white', padding: 5, width: "60%", mt: "15%", borderRadius: 2, justifyContent: 'center' }}
                    >
                        <Typography variant="h5">Registered Courses for - {selectedEntry?.name}</Typography>
                        <Table sx={{ mt: 2 }} >
                            <TableHead>
                                <TableCell>
                                    Course Code
                                </TableCell>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Course Modules</TableCell>
                            </TableHead>
                            {selectedEntry?.coursesRegistered?.map((d) => (
                                <TableRow>
                                    <TableCell>{d?.code}</TableCell>
                                    <TableCell>{d?.name}</TableCell>
                                    <TableCell>{d?.modules.length}</TableCell>
                                </TableRow>
                            ))}
                        </Table>
                    </Box>
                </Box>
            </Modal>
            <ProjectView open={openViewModal} setOpen={setOpenViewModal} item={selectedSnippet} />
        </>
    );
};

// CompanySnippetsTable.propTypes = {
//     count: PropTypes.number,
//     items: PropTypes.array,
//     onDeselectAll: PropTypes.func,
//     onDeselectOne: PropTypes.func,
//     onPageChange: PropTypes.func,
//     onRowsPerPageChange: PropTypes.func,
//     onSelectAll: PropTypes.func,
//     onSelectOne: PropTypes.func,
//     page: PropTypes.number,
//     rowsPerPage: PropTypes.number,
//     selected: PropTypes.array
// };

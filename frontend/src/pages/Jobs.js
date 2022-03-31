import React from 'react';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, Chip, Paper, Button, CardHeader, DialogActions, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, InputLabel } from '@mui/material';
import axios from 'axios';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// function AvailableJobs() {
//     const { username } = useParams();
//     const [availableJobs, setAvailableJobs] = useState([]);
//     // Component did mount
//     useEffect(() => {
//         axios.post("http://localhost:9000/api/jobs/getYourJobs.php", JSON.stringify({
//             username: {username}.username
//         }))
//         .then((response) => {
//             if (response.data.message === "error") {
//                 // Go back to login page if there is any error
//                 console.log(response);
//             }
//             else {
//                 // Else display home page accordingly
//                 setAvailableJobs(response.data.message);
//             }
//         }, (error) => {
//             console.log(error);
//         })
//     }, []) 

//     const handleJoinGroup = (event) => {
//         axios.post("http://localhost:9000/api/jobs/joinGroup.php", JSON.stringify({
//             username: {username}.username,
//             groupID: event.target.id
//         }))
//         .then((response) => {
//             if (response.data.message === "error") {
//                 // Go back to login page if there is any error
//                 console.log(response);
//             }
//             else {
//                 // Else display home page accordingly
//                 window.location.reload(false);
//             }
//         }, (error) => {
//             console.log(error);
//         })
//     }

//     return (
//         <div>
//             <h1 style={{textAlign: "center"}}>
//                 Current Job Postings
//             </h1>
//             {availableJobs.length > 0 ? 
//             <div style={{marginBottom: "40px"}}>
//                 {availableJobs.map((availableJob) => {
//                 // Iterate pages to create pages tabs in AppBar
//                 return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
//                     <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
//                         <CardHeader
//                             title={availableJob[0].title}
//                         />
//                         <CardContent>
//                         <Typography variant="body2">
//                                 Company: {availableJob[0].username}
//                             </Typography>
//                             <Typography variant="body2">
//                                 location: {availableJob[0].location}
//                             </Typography>
//                             <Typography variant="body2">
//                                 salary($): {availableJob[0].salary}
//                             </Typography>
//                         </CardContent>
//                         <Button style={{position: "absolute", right: 10, bottom: 10}} onClick={handleJoinGroup} id={availableJob[0].title} >
//                             <MeetingRoomIcon />
//                             Join Group
//                         </Button>
//                     </Card>
//                 </Box>
//                 })}
//             </div>
//             :
//             <div style={{textAlign: "center", marginBottom: "40px" }}> There are currently no avaiable jobs.  Please wait until more are posted. </div>
//             }
//         </div>
//     );
// }

function JobFactsAddJobs() {
    const { username } = useParams();
    const [userType, setUserType] = useState("");

    const [newPost, openNewPost] = useState(false);

    const handleOpenCreatePost = () => {
        openNewPost(true);
    }

    const handleClose = () => {
        openNewPost(false);
    }

    const [jobTitle, setJobTitle] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");

    const handleJobTitle = (event) => {
        setJobTitle(event.target.value);
    }

    const handleSalary = (event) => {
        setSalary(event.target.value);
    }

    const handleLocation = (event) => {
        setLocation(event.target.value);
    }

    const [jobFact, openJobFact] = useState(false);

    const handleOpenJobFact = () => {
        openJobFact(true);
    }

    const handleCloseJobFact = () => {
        openJobFact(false);
    }

    const handleCreatePost = () => {
        axios.post("http://localhost:9000/api/Jobs/insertJob.php", JSON.stringify({
            username: {username}.username,
            title: jobTitle,
            salary: salary,
            location: location,
        }))
        .then((response) => {
            window.location.reload(false);
          }, (error) => {
            console.log(error);
          });
    }

    const [activeCompanies, setActiveCompanies] = useState([]);

    const [averageSalaries, setAverageSalaries] = useState([]);

    useEffect(() => {
        let type = '';
        axios.post("http://localhost:9000/api/userType.php", JSON.stringify({
            username: {username}.username,
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                type = response.data.message;
                setUserType(response.data.message);
            }
        }, (error) => {
            console.log(error);
        })

        axios.post("http://localhost:9000/api/Jobs/division.php", JSON.stringify({
            username: {username}.username,
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                // console.log(response);
                setActiveCompanies(response.data.message);
            }
        }, (error) => {
            console.log(error);
        })

        axios.post("http://localhost:9000/api/Jobs/nestedAgg.php", JSON.stringify({
            username: {username}.username,
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                // console.log(response);
                setAverageSalaries(response.data.message);
            }
        }, (error) => {
            console.log(error);
        })
    }, [])

    return(
        <div style={{position: "fixed", left: 0, top: 150}}>
            {userType=="COMPANIES" ? 
            <div>
                <Box sx={{display: 'flex', flexWrap: 'wrap', '& > :not(style)': { width: 100, height: 100,},}}>
                    <Paper onClick={handleOpenCreatePost} elevation={3}> + Add New Job Posting</Paper>
                </Box>
                <Dialog open={newPost} onClose={handleClose}>
                    <DialogTitle>Create a New Job Post</DialogTitle>
                    <DialogContent>
                        <DialogContentText> Input the Job Title, Salary and Location </DialogContentText>
                        <TextField id="outlined-basic" fullWidth label="Title" variant="outlined" onChange={handleJobTitle} sx={{mt: 2, mb: 2}} />
                        <TextField fullWidth label="Salary" onChange={handleSalary} variant="filled" />
                        <TextField fullWidth label="Location" onChange={handleLocation} variant="filled" />
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" onClick={handleClose}>Cancel</Button>
                        <Button color="success" onClick={handleCreatePost}>Submit</Button>
                    </DialogActions>    
                </Dialog>
            </div>
            :
            <div></div>    
            }
            <Box sx={{display: 'flex', mt: 2, flexWrap: 'wrap', '& > :not(style)': { width: 100, height: 100,},}}>
                <Paper onClick={handleOpenJobFact} elevation={3}> View Jobs Posted Facts</Paper>
                <Dialog open={jobFact} onClose={handleCloseJobFact}>
                    <DialogTitle>Some Interesting Job Facts</DialogTitle>
                    <DialogContent>
                        <DialogContentText> Most Active Companies (All companies who have posted job opening for all job titles) </DialogContentText>
                        {activeCompanies.length > 0 ? activeCompanies.map((active) => {
                            return <div style={{marginLeft: "15px"}}>
                                <Typography> {active[0].username} </Typography>
                            </div>
                        }) 
                        :
                        <div> No companies have posted all job titles in this site </div>
                        }
                        <DialogContentText sx={{mt: 5}}> Find the mean of salary of all jobs title posted in this website  </DialogContentText>
                        {averageSalaries.length > 0 ? averageSalaries.map((average) => {
                            return <div style={{marginLeft: "15px"}}>
                                <Typography> {average[0].title} --> Salary average is ${average[0]["ROUND(AVG(DISTINCT salary))"]} </Typography>
                            </div>
                        }) 
                        :
                        <div> No companies have posted all job titles in this site </div>
                        }
                        <DialogContentText sx={{mt: 5}}> Select the title you want to find minimum salary of (aggregation)  </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleCloseJobFact}>Close</Button>
                    </DialogActions>    
                </Dialog>
            </Box>
        </div>
    );
}

function JobsPostedApplied() {
    const { username } = useParams();
    const [userType, setUserType] = useState("");

    const [employeesApplying, setEmployeesApplying] = useState([]);
    const [jobsApplied, setJobsApplied] = useState([]);

    useEffect(() => {
        let type = '';
        axios.post("http://localhost:9000/api/userType.php", JSON.stringify({
            username: {username}.username,
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                type = response.data.message;
                setUserType(response.data.message);
            }
        }, (error) => {
            console.log(error);
        }).then(() => {
            if (type === "COMPANIES") {
                axios.post("http://localhost:9000/api/Jobs/getEmployeesApplying.php", JSON.stringify({
                    username: {username}.username,
                }))
                .then((response) => {
                    if (response.data.message === "error") {
                        // Go back to login page if there is any error
                        console.log(response);
                    }
                    else {
                        // Else display home page accordingly
                        console.log(response.data.message);
                        setEmployeesApplying(response.data.message);
                    }
                }, (error) => {
                    console.log(error);
                })
            }
            else {
                axios.post("http://localhost:9000/api/Jobs/getJobsApplied.php", JSON.stringify({
                    username: {username}.username,
                }))
                .then((response) => {
                    if (response.data.message === "error") {
                        // Go back to login page if there is any error
                        console.log(response);
                    }
                    else {
                        // Else display home page accordingly
                        console.log(response.data.message);
                        setJobsApplied(response.data.message);
                    }
                }, (error) => {
                    console.log(error);
                })
            }
        });
    }, []);

    const handleAcceptReject = (event) => {
        let jobs_detail = JSON.parse(event.target.id);
        console.log(jobs_detail)

        axios.post("http://localhost:9000/api/Jobs/handleAcceptReject.php", JSON.stringify({
            // username: {username}.username,
            // groupID: event.target.id,
            username_comp: jobs_detail.username,
            username_emp: jobs_detail.username_emp,
            title: jobs_detail.title
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                window.location.reload(false);
            }
        }, (error) => {
            console.log(error);
        })
    }

    return (
        <div style={{marginTop: 80, textAlign: "center"}}>
            {userType === "COMPANIES" ?
            <div>
                <Typography variant="h3"> Employees applying to jobs you posted </Typography>
                {employeesApplying.length > 0 ? employeesApplying.map((employee) => {
                    // Iterate pages to create pages tabs in AppBar
                    return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                        <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
                            <CardHeader
                                title={employee[0].username_emp}
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    {employee[0].title}
                                </Typography>
                                <Typography variant="body2">
                                    {employee[0].location}
                                </Typography>
                                <Typography variant="body2">
                                    salary($): {employee[0].salary}
                                </Typography>
                            </CardContent>
                            <Button style={{position: "absolute", left: 10, bottom: 10}} color="error" onClick={handleAcceptReject} id={JSON.stringify(employee[0])}>
                                <MeetingRoomIcon />
                                Reject
                            </Button>
                            <Button style={{position: "absolute", right: 10, bottom: 10}} color="success" onClick={handleAcceptReject} id={JSON.stringify(employee[0])}>
                                <MeetingRoomIcon />
                                Accept
                            </Button>
                        </Card>
                    </Box>
            }) : <div style={{textAlign: "center" }}> No one has applied to your job listings </div>}
            </div>
            :
            <div>
                <Typography variant="h3"> Jobs that you have applied </Typography>
                {jobsApplied.length > 0 ? jobsApplied.map((job) => {
                    // Iterate pages to create pages tabs in AppBar
                    return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                        <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
                            <CardHeader
                                title={job[0].username_comp}
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    {job[0].title}
                                </Typography>
                                <Typography variant="body2">
                                    {job[0].location}
                                </Typography>
                                <Typography variant="body2">
                                    salary($): {job[0].salary}
                                </Typography>
                            </CardContent>
                            <Typography sx={{mb: 3}} color="secondary">Waiting for company's action</Typography>
                        </Card>
                    </Box>
            }) : <div style={{textAlign: "center" }}> No one has applied to your job listings </div>}
            </div>
            }
        </div>
            
    );

}

function YourJobs() {
    const { username } = useParams();
    const [yourJobs, setYourJobs] = useState([]);
    const [userType, setUserType] = useState("");

    const handleJoinJob = (event) => {
        let jobs_detail = JSON.parse(event.target.id);
        console.log(jobs_detail)

        axios.post("http://localhost:9000/api/Jobs/apply.php", JSON.stringify({
            // username: {username}.username,
            // groupID: event.target.id,
            username_comp: jobs_detail.username,
            username_emp: {username}.username,
            title: jobs_detail.title
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                window.location.reload(false);
            }
        }, (error) => {
            console.log(error);
        })
    }
    
    // Component did mount
    useEffect(() => {
        axios.post("http://localhost:9000/api/jobs/getYourJobs.php", JSON.stringify({
            username: {username}.username
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                // console.log(response.data);
                setYourJobs(response.data.message);
                // console.log(response);
            }
        }, (error) => {
            console.log(error);
        })

        let type = '';
        axios.post("http://localhost:9000/api/userType.php", JSON.stringify({
            username: {username}.username,
        }))
        .then((response) => {
            if (response.data.message === "error") {
                // Go back to login page if there is any error
                console.log(response);
            }
            else {
                // Else display home page accordingly
                type = response.data.message;
                setUserType(response.data.message);
            }
        }, (error) => {
            console.log(error);
        })
    }, []) 

    return(
       <Box sx={{mt: 4}}>
           <Typography variant="h3" style={{textAlign: "center"}}>
                Job Board
           </Typography>
           {yourJobs.length > 0 ? yourJobs.map((yourJob) => {
                // Iterate pages to create pages tabs in AppBar
                return <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: "auto", mt: 2, width: 500, height: "fitContent"}}} >
                    <Card variant="outlined" sx={{ maxWidth: 500 }} style={{borderRadius: "20px", position: "relative"}} >
                        <CardHeader
                            title={yourJob[0].title}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                Company: {yourJob[0].username}
                            </Typography>
                            <Typography variant="body2">
                                location: {yourJob[0].location}
                            </Typography>
                            <Typography variant="body2">
                                salary($): {yourJob[0].salary}
                            </Typography>
                        </CardContent>
                        {userType === "EMPLOYEES" ? 
                        <Button style={{position: "absolute", right: 10, bottom: 10}} onClick={handleJoinJob} id={JSON.stringify(yourJob[0])}>
                            <MeetingRoomIcon />
                            Apply
                        </Button>
                        :
                        <div></div>
                        }
                    </Card>
                </Box>
            }) : <div style={{textAlign: "center" }}> There are no job listings right now! </div>}
       </Box>
    );
}

function Jobs() {
    return(
        <div>
            <NavBar />
            <JobFactsAddJobs />
            <JobsPostedApplied />
            <YourJobs />
            {/* <AvailableJobs /> */}
        </div>
    );
}

export default Jobs;
import React, { Component } from 'react';
import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EmployeeTaskDashboard.css';
import { format } from 'date-fns';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CompleteWorkStatus from '../WorkStatusPopUp';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import io from 'socket.io-client';

class EmployeeTaskDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      showMobile: "",
      count: 0,
      taskNum: '',
      addSta: "",
      btnHide: false,
      completeStatusModalShow: false,
      allTasksData: [],
      employeeData: [],
      name: '',
      email: '',
      mobileNumber: '',
      skills: '',
      selectedDate: new Date(),
      isEditing: false,
      tasks: [],
      isAdmin:false
    };
    this.pollingInterval = null; // Initialize polling interval
    this.socket = io("http://localhost:4000")
  }

  submitTaskApi = (num) => {
    this.setState({ completeStatusModalShow: true, taskNum: num });
  }

  componentDidMount() {
    this.getEmployeeDetailsApi();
    this.startPolling(); // Start polling when component mounts
  }

  componentWillUnmount() {
    this.stopPolling(); // Clean up polling when component unmounts
  }

  startPolling = () => {
    this.pollingInterval = setInterval(() => {
      this.getEmployeeTasksApi(this.state.addSta);
    }, 5000); // Poll every 5 seconds
  }

  stopPolling = () => {
    clearInterval(this.pollingInterval);
  }

  getEmployeeTasksApi = async (empId) => {
    const url = "https://unis-task-manager.onrender.com/getEmployeeAllTasks"
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ "emplId": empId }),
    }
    const response = await fetch(url, options);
    const data2 = await response.json();
    if (response.status === 201) {
      this.setState({ allTasksData: data2 });
    }
  }

  getEmployeeDetailsApi = async () => {
    const getGmailLo = localStorage.getItem("Employee Gmail");
    const url = "https://unis-task-manager.onrender.com/EmployeeDetails";
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ "email": getGmailLo }),
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status === 201) {
      this.setState({ employeeData: data, addSta: data.employeeId, mobileNumber: data.mobileNumber });
      this.getEmployeeTasksApi(data.employeeId);
    }
  }

  addDataFunction2 = (data5)=>{
  this.setState({allTasksData:data5})
}

  mobileNumberUpdate = async () => {
    const { employeeData, mobileNumber } = this.state;
    const url = "http://localhost:4000/EmployeeDetailsUpdate";
    const dataBody = {
      "email": employeeData.gmailId,
      "mobileNumber1": mobileNumber
    };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataBody),
    };
    if (mobileNumber.length === 10) {
      try {
        const response = await fetch(url, options);
        if (response.status === 201) {
          alert('Mobile Number updated successfully');
        } else {
          console.log('Error updating mobile number', response.status);
        }
      } catch (e) {
        console.log(`Error at updating mobile Number : ${e.message}`);
      }
    } else {
      alert("Enter 10 Digits");
    }
  }

  handleLogout = () => {
    Cookies.remove("Task_Secret_Token");
    localStorage.removeItem("Employee Gmail");
    this.props.navigate('/login');
  };

  handleMobileNumberChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      this.setState({ mobileNumber: inputValue });
    }
  };

  handleDownload = (pdf) => {
    window.open(`http://localhost:5000/download/${pdf}`, '_blank');
  };

  submitTaskCompleted = async (idNum1,taskNum1) =>{
  const url = "http://localhost:4000/EmployeeCompleteWorkStatus"
  const bodyData = {
      idNum: idNum1,
      taskNum:taskNum1,
      status1: "Completed",
      statusTime1: new Date().toLocaleString()
  }
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(bodyData),
  }
  try {
    const response = await fetch(url,options)
    const data = await response.json()
    if (response.status === 201){
      alert("Status Updated Successfully")
      this.setState({allTasksData:data})
    }
  } catch (e) {
    console.log(`Error at updating status ${e.message}`)
  }
}

submitNotTaskCompleted = async (idNum1,taskNum1) =>{
  const url = "http://localhost:4000/EmployeeCompleteWorkStatus"
  const bodyData = {
      idNum: idNum1,
      taskNum:taskNum1,
      status1: "Not Completed",
      statusTime1: ""
  }
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(bodyData),
  }
  try {
    const response = await fetch(url,options)
    const data = await response.json()
    if (response.status === 201){
      alert("Status Updated Successfully")
      this.setState({allTasksData:data})
    }
  } catch (e) {
    console.log(`Error at updating status ${e.message}`)
  }
}



  render() {
    const { mobileNumber, employeeData, allTasksData } = this.state;
    const jwtToken = Cookies.get('Task_Secret_Token');
    if (!jwtToken) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="employee-background">
        <Container fluid>
           {/* Notification Area */}
        <div className="notification-area">
          {this.state.notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification}
            </div>
          ))}
        </div>
          <Row>
             <Col md={12}>
               <div className="header">
                 <h1 className="head001">Employee Task Dashboard</h1>
                <Button variant="danger" onClick={this.handleLogout} className="logout-btn">
                   Logout
              </Button>
               </div>

               <Row className="mb-3">
                 <Col md={6}>
                   <Form.Group controlId="name">
                     <Form.Label>Name : </Form.Label>
                     <Form.Control type="text" placeholder="Enter Name" value={employeeData.employeeName} readOnly />
                   </Form.Group>
                 </Col>
                 <Col md={6}>
                   <Form.Group controlId="email">
                     <Form.Label>Email : </Form.Label>
                     <Form.Control type="email" placeholder="Enter Email" value={employeeData.gmailId} readOnly />
                   </Form.Group>
                 </Col>
                 <Col md={6}>
                   <Form.Group controlId="mobileNumber">
                     <Form.Label>Mobile Number : </Form.Label>
                     {/* <Button variant="success" className="logout-btn4">
//                   Submit
//                 </Button> */}
                    <input
                      type="text"
                      className='mobileNumb'
                      placeholder="Mobile Number"
                      value={mobileNumber}
                      onChange={this.handleMobileNumberChange}
                      maxLength={10}
                    />
                    <Button variant="success" onClick={this.mobileNumberUpdate} className="logout-btn4">
                  Submit
                </Button>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="skills">
                    <Form.Label>Role : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Skills"
                      value={employeeData.techStack}
                      onChange={(e) => this.setState({ skills: e.target.value })}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Task Number</th>
                        <th>Employee ID</th>
                        <th>Description</th>
                        <th>Created Time & Date</th>
                        <th>Assigned Time & Date</th>
                        <th>Assigned Status</th>
                        <th>Complete Date & Time</th>
                        <th>Complete Status</th>
                        <th>Employee Comment</th>
                        <th>Manager Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTasksData.map((task) => (
                        <tr key={task.taskNumber}>
                          <td>{task.taskNumber.slice(30,36)}</td>
                          <td>{task.employeeId}</td>
                          <td>{task.taskDiscription}</td>
                          <td>{task.taskCreateTime}</td>
                          <td>{task.taskAssignedTime}</td>
                          <td>{task.assignedStatus}</td>
                          <td>
                          {task.completeDateTime === "" ? <div><Button variant="success" 
                              onClick={() => this.submitTaskCompleted(task.employeeId,task.taskNumber)}>
                              <IoCheckmarkDoneCircle />
                            </Button>
                            <CompleteWorkStatus
                            addprop22 = {[task.employeeId,this.state.taskNum]}
                            adddatafunction = {this.addDataFunction2}
          show={this.state.completeStatusModalShow}
          onHide={() => this.setState({ completeStatusModalShow: false })}
        /> </div>  : task.completeDateTime}

{task.completeDateTime !== "" ? <div><Button variant="danger" 
                              onClick={() => this.submitNotTaskCompleted(task.employeeId,task.taskNumber)}>
                              <IoCheckmarkDoneCircle />
                            </Button>
                             </div>  : task.completeDateTime}



                            
                          </td>
                          <td>{task.completeStatus}</td>
                          <td>
                          {<div><Button variant="success" 
                              onClick={() => this.submitTaskApi(task.taskNumber)}>
                              <IoCheckmarkDoneCircle />
                            </Button>
                            <CompleteWorkStatus
                            addprop22 = {[task.employeeId,this.state.taskNum]}
                            adddatafunction = {this.addDataFunction2}
          show={this.state.completeStatusModalShow}
          onHide={() => this.setState({ completeStatusModalShow: false })}
        /> </div>} {task.employeeComment}
                          </td>
                          <td>{task.managerComment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const EmployeeTaskDashboardWrapper = () => {
  const navigate = useNavigate();
  return <EmployeeTaskDashboard navigate={navigate} />;
};

export default EmployeeTaskDashboardWrapper;












// import React, { Component } from 'react';
// import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './EmployeeTaskDashboard.css';
// import { format } from 'date-fns';
// import { Navigate, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import CompleteWorkStatus from '../WorkStatusPopUp';
// import { IoCheckmarkDoneCircle } from "react-icons/io5";

// class EmployeeTaskDashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showMobile:"",
//       count:0,
//       taskNum:'',
//       addSta:"",
//       btnHide:false,
//       completeStatusModalShow: false,
//       allTasksData:[],
//       employeeData:[],
//       name: '',
//       email: '',
//       mobileNumber: '',
//       skills: '',
//       selectedDate: new Date(),
//       isEditing: false,
//       tasks: [
//         {
//           id: 1,
//           task: 'Sample Task',
//           domainName: 'Backend',
//           description: 'Task description',
//           files: [],
//           createTime: new Date('2024-09-01T12:00:00'),
//           assignedTime: new Date('2024-09-02T10:00:00'),
//           workCompleteTime: null,
//           employeeComment: 'Employee comment',
//           managerComment: 'Manager comment',
//           isDone: false,
//         },
//       ],
//     };
//     this.pollingInterval = null;
//   }

//   componentDidMount() {
//     this.getEmployeeDetailsApi();
//     this.startPolling(); // Start polling when component mounts
//   }

//   componentWillUnmount() {
//     this.stopPolling(); // Clean up polling when component unmounts
//   }

//   startPolling = () => {
//     this.pollingInterval = setInterval(() => {
//       // this.getEmployeeTasksApi(this.state.addSta);
//       console.log('working')
//     }, 3000); // Poll every 5 seconds
//   }

//   stopPolling = () => {
//     clearInterval(this.pollingInterval);
//   }





//   submitTaskApi = (num) =>{
//     this.setState({ completeStatusModalShow: true })
//     this.setState({taskNum: num});
//   }

//   componentDidMount() {
//     this.getEmployeeDetailsApi();
//   }
  
//   getEmployeeTasksApi = async (empId)=>{
//     const url = "https://unis-task-manager.onrender.com/getEmployeeAllTasks"
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({ "emplId": empId }),
//     }
//     const response = await fetch(url,options)
//     const data2 = await response.json()
//     if (response.status === 201){
//       this.setState({allTasksData:data2})
//     }
//   }

//   getEmployeeDetailsApi = async ()=>{
//     const getGmailLo = localStorage.getItem("Employee Gmail")
//     const url = "https://unis-task-manager.onrender.com/EmployeeDetails"
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({ "email": getGmailLo }),
//     }
//     const response = await fetch(url,options)
//     const data = await response.json()
//     if (response.status === 201){
//       this.setState({employeeData:data})
//       this.getEmployeeTasksApi(data.employeeId)
//       this.setState({addSta: data.employeeId})
//       this.setState({mobileNumber:data.mobileNumber})
//     }
//   }

//   mobileNumberUpdata = async () =>{
//     const {employeeData, mobileNumber} = this.state
//     const url = "http://localhost:4000/EmployeeDetailsUpdate"
//     const dataBody = {
//       "email":employeeData.gmailId,
//     "mobileNumber1": mobileNumber
//     }
//     const options = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify(dataBody),
//     }
//     if(mobileNumber.length === 10){
//       try {
//         const response = await fetch(url,options)
//         const data = await response.json()
//         if (response.status === 201) {
//           alert('Mobile Number updated successfully')
//         } else {
//           console.log('Error updating mobile number', response.status);
//         }
//       } catch (e) {
//         console.log(`Error at updating mobile Number : ${e.message}`)
//       }
//     }else{
//       alert("Enter 10 Digits")
//     }

//   }

//   handleSaveChanges = () => {
//     this.setState({ isEditing: false });
//     alert('Changes saved!');
//   };

//   handleMarkAsDone = (index) => {
//     const updatedTasks = [...this.state.tasks];
//     updatedTasks[index].workCompleteTime = new Date();
//     updatedTasks[index].isDone = true;
//     this.setState({ tasks: updatedTasks });
//   };

//   formatDate = (date) => {
//     return date ? format(new Date(date), 'yyyy-MM-dd HH:mm') : 'Not completed';
//   };

//   handleLogout = () => {
//     Cookies.remove("Task_Secret_Token")
//     localStorage.removeItem("Employee Gmail")
//     this.props.navigate('/login')
//   };

//   handleEditClick = () => {
//     this.setState({ isEditing: true });
//   };

//   handleInputChange = (e, index, field) => {
//     const { value } = e.target;
//     const updatedTasks = [...this.state.tasks];
//     updatedTasks[index][field] = value;
//     this.setState({ tasks: updatedTasks });
//   };

//   handleMobileNumberChange = (e) => {
//     const inputValue = e.target.value
//     if (/^\d*$/.test(inputValue)) {
//       this.setState({ mobileNumber: inputValue });
//     }
//   };

//   handleDownload = (pdf) => {
//     window.open(`http://localhost:5000/download/${pdf}`, '_blank');
// };

// addDataFunction2 = (data5)=>{
//   this.setState({allTasksData:data5})
// }

// submitTaskCompleted = async (idNum1,taskNum1) =>{
//   const url = "http://localhost:4000/EmployeeCompleteWorkStatus"
//   const bodyData = {
//       idNum: idNum1,
//       taskNum:taskNum1,
//       status1: "Completed",
//       statusTime1: new Date().toLocaleString()
//   }
//   const options = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify(bodyData),
//   }
//   try {
//     const response = await fetch(url,options)
//     const data = await response.json()
//     if (response.status === 201){
//       alert("Status Updated Successfully")
//       this.setState({allTasksData:data})
//     }
//   } catch (e) {
//     console.log(`Error at updating status ${e.message}`)
//   }
// }

//   render() {
//     const { name, email, mobileNumber, skills, tasks, isEditing , employeeData} = this.state;
//     const { allTasksData } = this.state
//     const jwtToken = Cookies.get('Task_Secret_Token');
//     if (!jwtToken) {
//       return <Navigate to="/login" />;
//     }

//     return (
//       <div className="employee-background">
//         <Container fluid>
//           <Row>
//             <Col md={12}>
//               <div className="header">
//                 <h1 className="head001">Employee Task Dashboard</h1>
//                 <Button variant="danger" onClick={this.handleLogout} className="logout-btn">
//                   Logout
//                 </Button>
//               </div>

//               <Row className="mb-3">
//                 <Col md={6}>
//                   <Form.Group controlId="name">
//                     <Form.Label>Name : </Form.Label>
//                     <Form.Control type="text" placeholder="Enter Name" value={employeeData.employeeName} readOnly />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="email">
//                     <Form.Label>Email : </Form.Label>
//                     <Form.Control type="email" placeholder="Enter Email" value={employeeData.gmailId} readOnly />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="mobileNumber">
//                     <Form.Label>Mobile Number : </Form.Label>
//                     {/* <Button variant="success" className="logout-btn4">
//                   Submit
//                 </Button> */}
//                     <input
//                       type="text"
//                       className='mobileNumb'
//                       placeholder="Mobile Number"
//                       value={mobileNumber}
//                       onChange={this.handleMobileNumberChange}
//                       maxLength={10}
//                     />
//                     <Button variant="success" onClick={this.mobileNumberUpdata} className="logout-btn4">
//                   Submit
//                 </Button>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="skills">
//                     <Form.Label>Role : </Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Skills"
//                       value={employeeData.techStack}
//                       onChange={(e) => this.setState({ skills: e.target.value })}
//                       readOnly
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col>
//                   <Table striped bordered hover>
//                     <thead>
//                       <tr>
//                         <th> SI Number </th>
//                         <th>Task Number</th>
//                         <th>Employee ID</th>
//                         <th>Description</th>
//                         <th>Created Time & Date</th>
//                         <th>Assigned Time & Date</th>
//                         <th>Assigned Status</th>
//                         <th>Complete Date & Time</th>
//                         <th>Complete Status</th>
//                         <th>Employee Comment</th>
//                         <th>Manager Comment</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {allTasksData.map((task) => (
//                         <tr key={task.taskNumber}>
//                           <td>{(this.state.count+=1) -8 }</td>
//                           <td>{task.taskNumber.slice(30,36)}</td>
//                           <td>{task.employeeId}</td>
//                           <td>{task.taskDiscription}</td>
//                           <td>{task.taskCreateTime}</td>
//                           <td>{task.taskAssignedTime}</td>
//                           <td>{task.assignedStatus}</td>
//                           <td>
//                           {task.completeDateTime === "" ? <div><Button variant="success" 
//                               onClick={() => this.submitTaskCompleted(task.employeeId,task.taskNumber)}>
//                               <IoCheckmarkDoneCircle />
//                             </Button>
//                             <CompleteWorkStatus
//                             addprop22 = {[task.employeeId,this.state.taskNum]}
//                             adddatafunction = {this.addDataFunction2}
//           show={this.state.completeStatusModalShow}
//           onHide={() => this.setState({ completeStatusModalShow: false })}
//         /> </div>  : task.completeDateTime}
                            
//                           </td>
//                           <td>{task.completeStatus}</td>
//                           <td>
//                           {<div><Button variant="success" 
//                               onClick={() => this.submitTaskApi(task.taskNumber)}>
//                               <IoCheckmarkDoneCircle />
//                             </Button>
//                             <CompleteWorkStatus
//                             addprop22 = {[task.employeeId,this.state.taskNum]}
//                             adddatafunction = {this.addDataFunction2}
//           show={this.state.completeStatusModalShow}
//           onHide={() => this.setState({ completeStatusModalShow: false })}
//         /> </div>} {task.employeeComment}
//                           </td>
//                           <td>{task.managerComment}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// const EmployeeTaskDashboardWrapper = () => {
//   const navigate = useNavigate();
//   return <EmployeeTaskDashboard navigate={navigate} />;
// };

// export default EmployeeTaskDashboardWrapper;

import React, { Component } from 'react';
import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from './Sidebar';
import './Admin.css';
import { format } from 'date-fns';
import { Navigate, useNavigate } from 'react-router-dom';
import MyVerticallyCenteredModal from '../PopUpEdit';
import TaskPostApiPopUp from '../TaskPostPopUP';
import Cookies from 'js-cookie';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddBtn:false,
      updateDescription:"",
      updateMangerComments:"",
      updatePdf:"",
      showAddTaskPop:false,
      taskNumTooEdit:"",
      taskPostModalShow: false,
      showTask:"",
      empName:"",
      empTasksData:[],
      modalShow: false,
      getApiData:[],
      name: "",
      newData:[],
      email: '',
      mobileNumber: '',
      skills: '',
      selectedDate: new Date(),
      isEditing: false,
      tasks: [
        {
          id: 1,
          task: '',
          gmail: '',
          description: 'Task description',
          files: [],
          createTime: "",
          assignedTime: "",
          workCompleteTime: "",
          employeeComment: 'Employee comment',
          managerComment: 'Manager comment',
          createStatus: '',
          assignedStatus: '',
          workCompleteStatus: '',
          createStatusTime: "",
          assignedStatusTime: "",
          workCompleteStatusTime: "",
        },
      ],
    };
    this.pollingInterval2 = null;
  }

  handleShow2 = () => {
    this.setState({ taskPostModalShow: true });
  };

  handleClose3 = () =>{
    this.setState({ taskPostModalShow: false });
  }

  handleClose2 = (data2) => {
    this.setState({ taskPostModalShow: false });
    this.setState({empTasksData:data2})
  };


  handleShow = (num,desc,mangerCom) => {
    this.setState({ modalShow: true});
    this.setState({taskNumTooEdit:num })
    this.setState({updateDescription:desc })
    this.setState({updateMangerComments:mangerCom })
  };

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  handleSelectEmployee = (name3) => {
    const {name,getApiData} = this.state
    const a = getApiData.filter(c => c.employeeName === name3)
    this.setState({name:a[0]})
    this.setState({empName:a[0].employeeId})
  };

  formatDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd HH:mm') : 'N/A');

  handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedTasks = [...this.state.tasks];
    updatedTasks[index][field] = value;
    this.setState({ tasks: updatedTasks });
  };

  handleMobileNumberChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      this.setState({ mobileNumber: value });
    }
  };

  handleTeamsClick = () => {
    const chatUrl = `https://teams.microsoft.com/l/chat/0/0?users=${this.state.name}`;
    window.location.href = chatUrl;
  };

  handleRadioChange = (e, index, field) => {
    const { value } = e.target;
    const updatedTasks = [...this.state.tasks];
    updatedTasks[index][field] = value;
    this.setState({ tasks: updatedTasks });
  };

  handleTaskClick = (taskId) => {
    this.props.history.push(`/tasks/${taskId}`);
  };

  handleAddTask = () => {
      this.setState({showAddTaskPop:true})
  };

  componentWillUnmount() {
    this.stopPolling2(); // Clean up polling when component unmounts
  }

  stopPolling2 = () => {
    clearInterval(this.pollingInterval2);
  }


  startPolling2 = () => {
    this.pollingInterval2 = setInterval(() => {
      this.getApiEmployeeTasks()
    }, 5000); // Poll every 5 seconds
  }

  componentDidMount() {
    this.getApiEmployeesData()
    this.startPolling2();
    if (this.state.empName !== ""){
      this.getApiEmployeeTasks()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.empName && this.state.empName !== prevState.empName) {
      this.getApiEmployeeTasks();
    }
  }

    getApiEmployeeTasks = async ()=>{
          const {empName} = this.state
          const dataNa = {
            "empId":empName
          }
          const url = "https://unis-task-manager.onrender.com/tasksData"
          const getTask = await  fetch(url, {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(dataNa)
        })
          const resData = await getTask.json()
          if (getTask.status === 201){
            this.setState({empTasksData:resData})
            this.setState({showTask:"ganga"})
          }
        
    }

    
  

  getApiEmployeesData = async ()=>{
    const {getApiData} = this.state
    const url = "https://unis-task-manager.onrender.com/employeeDataAdd"
    const response = await fetch(url,{
      method:"GET"
    })
    const data = await response.json()
    this.setState({getApiData:data})
  }

  deleteTask = async (taskDeleteId,idNum4) => {
    const url = "https://unis-task-manager.onrender.com/oneTaskDelete"
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({"taskNum":taskDeleteId,"idNum":idNum4}),
    };
    const response = await fetch(url,options)
    const data = await response.json()
    if (response.status === 201) {
      this.setState({empTasksData:data})
      alert("Task Deleted successfully")
  }
  }


  assignTask = async (taskIdNum,idNum2) =>{
    const dataAssign = {
      "idNum":idNum2,
      "taskNum": taskIdNum,
      "taskAssignedTime3": new Date().toLocaleString(),
      "assignedStatus3":"Assigned"
    }
    const url = "https://unis-task-manager.onrender.com/updateTaskAssigned"
    const getTask = await fetch(url, {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(dataAssign)
    })
    const resData = await getTask.json()
    if (getTask.status === 201){
      this.setState({empTasksData:resData})
      alert("Task Assigned successfully")
    }
  }

  revokeTask = async (taskIdNum,idNum2) =>{
    const dataAssign = {
      "employeeId":idNum2,
      "taskNumber": taskIdNum,
      "taskAssignedTime": "",
      "assignedStatus":""
    }
    const url = "https://unis-task-manager.onrender.com/workAssignedStatus"
    const getTask = await fetch(url, {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(dataAssign)
    })
    const resData = await getTask.json()
    if (getTask.status === 201){
      this.setState({empTasksData:resData})
      alert("Task Updated Successfully")
    }
  }

  revokeIncompleteTask = async (taskIdNum,idNum2) =>{
    const dataAssign = {
      "employeeId":idNum2,
      "taskNumber": taskIdNum,
      "completeStatus": "Not Completed",
      "completeDateTime":""
    }
    const url = "https://unis-task-manager.onrender.com/inComplteStatus"
    const getTask = await fetch(url, {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(dataAssign)
    })
    const resData = await getTask.json()
    if (getTask.status === 201){
      this.setState({empTasksData:resData})
      alert("Task Updated Successfully")
    }
  }
  

  removeAdminToken = () =>{
    const token = Cookies.remove("Admin_Secret_Token")
    this.props.navigate('/')
  }

  convertTaskDashboard = () =>{
    this.props.navigate('/admin-all-tasks')
  }



  updatedGetData = (data3) =>{
    this.setState({empTasksData:data3})
  }

  render() {
    const {empName, empTasksData, newData,name,task, email, mobileNumber, skills, selectedDate, tasks, isEditing } = this.state;
    const {getApiData, taskNumTooEdit, updateDescription, updateMangerComments} = this.state
    const token = Cookies.get("Admin_Secret_Token")
    if (!token) {
      return <Navigate to="/" />;
    }
    return (
      <div className="admin-background">
        <Container fluid>
          <Row>
            <Col md={3}>
              <Sidebar prop={getApiData} onSelectEmployee={this.handleSelectEmployee} />
            </Col>

            <Col md={9}>
              <div className="header">
                <h1 className="head001">Admin Dashboard</h1>

                <div className='flexItems'>
                <div className='space-2'>
                <Button variant="success" className="logout-btn2" onClick={this.convertTaskDashboard}>
                  Tasks Dashboard
                </Button>
                </div>
                <div>
                <Button variant="danger" className="logout-btn" onClick={this.removeAdminToken}>
                  Logout
                </Button>
                </div>
                </div>

              </div>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label >Name : </Form.Label>
                    <Form.Control  
                    type="text" 
                    placeholder="Name" 
                    value={name.employeeName} 
                    readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label className='email66'>Email : </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={name.gmailId}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={name.mobileNumber}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="skills">
                    <Form.Label>Role : </Form.Label>
                    <Form.Control
                    
                      type="text"
                      placeholder="Enter Skills"
                      value={name.techStack}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead className='thead-dark55'>
                      <tr className='thead-dark5566'>
                        <th className='task5566'>Task</th>
                        <th className='task5566'>Employee ID</th>
                        <th className='task5566'>Description</th>
                        <th className='task5566'>Create Date & Time</th>
                        <th className='task5566'>Assigned Date & Time</th>
                        <th className='task5566'>Assigned Status</th>
                        <th className='task5566'>Complete Date & Time</th>
                        <th className='task5566'>Complete Status</th>
                        <th className='task5566'>Employee Comment</th>
                        <th className='task5566'>Manager Comment</th>
                        <th className='task5566'>Delete Task</th>
                      </tr>
                    </thead>
                    <tbody className='thredtask54'>
                      {empTasksData.map((task) => (
                        <tr className='thredtask5455' key={task.taskNumber}>
                          <td className='thredtask5466'>
                            <br />
                              <div>
                              <a className='addLink' 
                              onClick={() => this.handleShow(task.taskNumber,task.taskDiscription,task.managerComment)}>
                              {task.taskNumber.slice(30,36)}
                            </a>
                            <MyVerticallyCenteredModal
                            prop={[name.employeeId, taskNumTooEdit, updateDescription, updateMangerComments]}
                            show={this.state.modalShow}
                            onHide4= {this.updatedGetData}
                            onHide={this.handleClose}
                          />
                          </div>
                          </td>
                          <td className='thredtask5466'>
                              {name.employeeId}
                          </td>
                          <td className='thredtask5466'>
                              {task.taskDiscription}
                          </td>
                          <td className='thredtask5466'>{task.taskCreateTime}</td>
                          <td className='thredtask5466'>
                            {task.taskAssignedTime === "" ? <Button variant="primary" onClick={() => this.assignTask(task.taskNumber,name.employeeId)}>
                          <IoMdAddCircleOutline />
                            </Button> : task.taskAssignedTime}
                            {task.taskAssignedTime !== "" ? <Button variant="danger" onClick={() => this.revokeTask(task.taskNumber,name.employeeId)}>
                          <IoMdAddCircleOutline />
                            </Button> : task.taskAssignedTime}</td>
                          <td className='thredtask5466'>{task.assignedStatus}</td>
                          <td className='thredtask5466'>{task.completeDateTime}
                            {task.completeDateTime === "" ? "" : <Button variant="danger" onClick={() => this.revokeIncompleteTask(task.taskNumber,name.employeeId)}>
                          <IoMdAddCircleOutline />
                            </Button>}
                          </td>
                          <td className='thredtask5466'>{task.completeStatus}</td>
                          <td className='thredtask5466'>{task.employeeComment}</td>
                          <td className='thredtask5466'>{task.managerComment}</td>
                          <td className='thredtask5466'>
                          <Button variant="danger" onClick={() => this.deleteTask(task.taskNumber,name.employeeId,task.completeStatus)}>
                          <MdDelete />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {empName === "" ? "" : <Button variant="success" onClick={this.handleShow2} className="mb-3">
                    Add Task
                  </Button> }

                  <TaskPostApiPopUp
                  prop={[name.employeeId, name.techStack, name.employeeName]}
          show={this.state.taskPostModalShow}
          onHide2={this.handleClose2}
          onHide3={this.handleClose3}
        />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


const AdminTaskDashboardWrapper = () => {
  const navigate = useNavigate();
  return <Admin navigate={navigate} />;
};

export default AdminTaskDashboardWrapper ;


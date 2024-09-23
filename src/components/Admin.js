import React, { Component } from 'react';
import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from './Sidebar';
import './Admin.css';
import { format } from 'date-fns';
import { Link, withRouter } from 'react-router-dom';
import MyVerticallyCenteredModal from '../PopUpEdit';
import TaskPostApiPopUp from '../TaskPostPopUP';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleShow2 = () => {
    this.setState({ taskPostModalShow: true });
  };

  handleClose2 = () => {
    this.setState({ taskPostModalShow: false });
  };


  handleShow = (num,desc,mangerCom) => {
    this.setState({ modalShow: true});
    this.setState({taskNumTooEdit:num })
    this.setState({pdateDescription:desc })
    this.setState({updateMangerComments:mangerCom })
  };

  handleClose = () => {
    this.setState({ modalShow: false });
  };

  handleSaveChanges = () => {
    alert('Changes saved!');
  };

  handleSelectEmployee = (name2) => {
    const {name,getApiData} = this.state
    const a = getApiData.filter(c => c.employeeName === name2[0])
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

  componentDidMount() {
    this.getApiEmployeesData()
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
          const url = "http://localhost:4000/tasksData"
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
    const url = "http://localhost:4000/employeeDataAdd"
    const response = await fetch(url,{
      method:"GET"
    })
    const data = await response.json()
    this.setState({getApiData:data})
  }

  deleteTask = async (taskDeleteId) => {
    const url = "http://localhost:4000/oneTaskDelete"
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({"taskNum":taskDeleteId}),
    };
    const response = await fetch(url,options)
    const data = await response.json()
    if (response.status === 201) {
      alert("Task Deleted successfully")
  }
  }

  assignTask = async (taskIdNum) =>{
    const dataAssign = {
      "taskNum": taskIdNum,
      "taskAssignedTime3": new Date().toLocaleString(),
      "assignedStatus3":"Assinged"
    }
    const url = "http://localhost:4000/updateTaskAssigned"
    const getTask = await fetch(url, {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(dataAssign)
    })
    const resData = await getTask.json()
    if (getTask.status === 201){
      alert("Task Assigned successfully")
    }
  }
  

  render() {
    const {empName, empTasksData, newData,name,task, email, mobileNumber, skills, selectedDate, tasks, isEditing } = this.state;
    const {getApiData, taskNumTooEdit, updateDescription, updateMangerComments} = this.state
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

                <Button variant="danger" className="logout-btn">
                  Logout
                </Button>
              </div>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name.employeeName} readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={name.gmailId}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={mobileNumber}
                      onChange={this.handleMobileNumberChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="skills">
                    <Form.Label>Skills: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Skills"
                      value={skills}
                      onChange={(e) => this.setState({ skills: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Button variant="info" onClick={this.handleTeamsClick}>
                    Teams
                  </Button>
                </Col>
              </Row>

              {/* {getApiData.map(char=>(
          <h1>{char.employeeName}</h1>
        ))} */}

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Date:</Form.Label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => this.setState({ selectedDate: date })}
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Employee ID</th>
                        <th>Description</th>
                        <th>Files</th>
                        <th>Create Date & Time</th>
                        <th>Assigned Date & Time</th>
                        <th>Assigned Status</th>
                        <th>Complete Date & Time</th>
                        <th>Complete Status</th>
                        <th>Employee Comment</th>
                        <th>Manager Comment</th>
                        <th>Delete Task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empTasksData.map((task) => (
                        <tr key={task.taskNumber}>
                          <td>
                            <br />
                              <div>
                              <Button variant="primary" 
                              onClick={() => this.handleShow(task.taskNumber,task.taskDiscription,task.managerComment)}>
                              Task 
                            </Button>
                            <MyVerticallyCenteredModal
                            prop={[name.employeeId, taskNumTooEdit, updateDescription, updateMangerComments]}
                            show={this.state.modalShow}
                            onHide={this.handleClose}
                          />
                          </div>
                          </td>
                          <td>
                              {name.employeeId}
                          </td>
                          <td>
                              {task.taskDiscription}
                          </td>
                          <td>
                              {task.pdfFile}
                          </td>
                          <td>{task.taskCreateTime}</td>
                          <td>
                          <Button variant="primary" onClick={() => this.assignTask(task.taskNumber)}>
                              Assign Task
                            </Button>
                            {task.taskAssignedTime}</td>
                          <td>{task.assignedStatus}</td>
                          <td>{task.completeDateTime}</td>
                          <td>{task.completeStatus}</td>
                          <td>{task.employeeComment}</td>
                          <td>{task.managerComment}</td>
                          <td>
                          <Button variant="primary" onClick={() => this.deleteTask(task.taskNumber)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                    <Button variant="primary" onClick={this.handleSaveChanges}>
                      Save Changes
                    </Button>
                  <Button variant="success" onClick={this.handleShow2} className="mb-3">
                    Add Task
                  </Button>
                  <TaskPostApiPopUp
                  prop={[name.employeeId]}
          show={this.state.taskPostModalShow}
          onHide2={this.handleClose2}
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

export default Admin


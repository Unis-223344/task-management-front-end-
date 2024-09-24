import React, { Component } from 'react';
import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EmployeeTaskDashboard.css';
import { format } from 'date-fns';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CompleteWorkStatus from '../WorkStatusPopUp';

class EmployeeTaskDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnHide:false,
      completeStatusModalShow: false,
      allTasksData:[],
      employeeData:[],
      name: '',
      email: '',
      mobileNumber: '',
      skills: '',
      selectedDate: new Date(),
      isEditing: false,
      tasks: [
        {
          id: 1,
          task: 'Sample Task',
          domainName: 'Backend',
          description: 'Task description',
          files: [],
          createTime: new Date('2024-09-01T12:00:00'),
          assignedTime: new Date('2024-09-02T10:00:00'),
          workCompleteTime: null,
          employeeComment: 'Employee comment',
          managerComment: 'Manager comment',
          isDone: false,
        },
      ],
    };
  }

  submitTaskApi = async () =>{
    this.setState({ completeStatusModalShow: true })
  }

  componentDidMount() {
    this.getEmployeeDetailsApi();
  }
  
  getEmployeeTasksApi = async (empId)=>{
    const url = "http://localhost:4000/getEmployeeAllTasks"
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ "emplId": empId }),
    }
    const response = await fetch(url,options)
    const data2 = await response.json()
    if (response.status === 201){
      this.setState({allTasksData:data2})
    }
  }

  getEmployeeDetailsApi = async ()=>{
    const getGmailLo = localStorage.getItem("Emp Gmail")
    const url = "http://localhost:4000/EmployeeDetails"
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ "email": getGmailLo }),
    }
    const response = await fetch(url,options)
    const data = await response.json()
    if (response.status === 201){
      this.setState({employeeData:data})
      this.getEmployeeTasksApi(data.employeeId)
    }
  }

 

  handleSaveChanges = () => {
    this.setState({ isEditing: false });
    alert('Changes saved!');
  };

  handleMarkAsDone = (index) => {
    const updatedTasks = [...this.state.tasks];
    updatedTasks[index].workCompleteTime = new Date();
    updatedTasks[index].isDone = true;
    this.setState({ tasks: updatedTasks });
  };

  formatDate = (date) => {
    return date ? format(new Date(date), 'yyyy-MM-dd HH:mm') : 'Not completed';
  };

  handleLogout = () => {
    Cookies.remove("Task_Secret_Token")
    this.props.navigate('/login')
  };

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

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

  render() {
    const { name, email, mobileNumber, skills, tasks, isEditing , employeeData} = this.state;
    const { allTasksData } = this.state
    const jwtToken = Cookies.get('Task_Secret_Token');
    if (!jwtToken) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="employee-background">
        <Container fluid>
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
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={employeeData.employeeName} readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={employeeData.gmailId} readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="mobileNumber">
                    <Form.Label>Mobile Number: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={employeeData.mobileNumber}
                      onChange={this.handleMobileNumberChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="skills">
                    <Form.Label>Designation : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Skills"
                      value={employeeData.techStack}
                      onChange={(e) => this.setState({ skills: e.target.value })}
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
                        <th>Files</th>
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
                          <td>{task.pdfFile}</td>
                          <td>{task.taskCreateTime}</td>
                          <td>{task.taskAssignedTime}</td>
                          <td>{task.assignedStatus}</td>
                          <td>
                          {task.completeDateTime === "" ? <div><Button variant="primary" 
                              onClick={() => this.submitTaskApi()}>
                              Completed
                            </Button>
                            <CompleteWorkStatus
                            addProp={task.taskNumber}
          show={this.state.completeStatusModalShow}
          onHide={() => this.setState({ completeStatusModalShow: false })}
        /> </div>  : task.completeDateTime}
                            
                          </td>
                          <td>{task.completeStatus}</td>
                          <td>{task.employeeComment}</td>
                          <td>{task.managerComment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <Row>
                <Col className="text-right">
                  <Button variant="success" onClick={this.handleSaveChanges}>
                    Save Changes
                  </Button>
                  <Button variant="warning" className="ml-2" onClick={this.handleEditClick}>
                    Edit
                  </Button>
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

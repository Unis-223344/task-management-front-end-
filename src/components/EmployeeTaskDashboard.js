import React, { Component } from 'react';
import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EmployeeTaskDashboard.css';
import { format } from 'date-fns';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

class EmployeeTaskDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {
    this.getEmployeeDetailsApi();
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
    }
  }

  postEmployeeDetails = async (gmailId2) =>{
    const {mobileNumber, skills } = this.state;
    const url = "http://localhost:4000/EmployeeDetailsUpdate"
    const bodyData = {
      "email":gmailId2,
    "mobileNumber1": mobileNumber,
    "skillSet2": skills
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(bodyData),
    }
    const response = await fetch(url,options)
    const data = await response.json()
    if (response.status === 201){
      alert("Employee details updated successfully")
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
                    <Form.Label>Skills: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Skills"
                      value={employeeData.skillSet}
                      onChange={(e) => this.setState({ skills: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" onClick={() => this.postEmployeeDetails(employeeData.gmailId)}> Submit </Button>

              <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Domain</th>
                        <th>Description</th>
                        <th>Files</th>
                        <th>Created Time & Date</th>
                        <th>Assigned Time & Date</th>
                        <th>Work Complete Time & Date</th>
                        <th>Employee Comment</th>
                        <th>Manager Comment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr key={task.id}>
                          <td>{task.task}</td>
                          <td>{task.domainName}</td>
                          <td>{task.description}</td>
                          <td>{task.files.join(', ')}</td>
                          <td>{this.formatDate(task.createTime)}</td>
                          <td>{this.formatDate(task.assignedTime)}</td>
                          <td>{this.formatDate(task.workCompleteTime)}</td>
                          <td>
                            {isEditing ? (
                              <Form.Control
                                type="text"
                                value={task.employeeComment}
                                onChange={(e) => this.handleInputChange(e, index, 'employeeComment')}
                              />
                            ) : (
                              task.employeeComment
                            )}
                          </td>
                          <td>{task.managerComment}</td>
                          <td>
                            <Button
                              variant="success"
                              onClick={() => this.handleMarkAsDone(index)}
                              disabled={task.isDone}
                            >
                              Mark as Done
                            </Button>
                          </td>
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

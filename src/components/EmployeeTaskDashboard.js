import React from 'react';
import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EmployeeTaskDashboard.css';
import { format } from 'date-fns'; // Import date-fns for formatting dates
import { useNavigate } from 'react-router-dom'; // Import useNavigate
 
const EmployeeTaskDashboard = () => {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    mobileNumber: '', // Added mobile number field
    skills: '', // Added skills field
    selectedDate: new Date(),
    isEditing: false,
    tasks: [
      {
        id: 1,
        task: 'Sample Task',
        description: 'Task description',
        files: [], // Store files as an array
        createTime: new Date('2024-09-01T12:00:00'),
        assignedTime: new Date('2024-09-02T10:00:00'),
        workCompleteTime: null, // Initially null, will be set when task is marked as done
        employeeComment: 'Employee comment',
        managerComment: 'Manager comment',
        isDone: false, // Track if the task is done
      },
    ],
  });
 
  const navigate = useNavigate(); // Use navigate hook
 
  const handleSaveChanges = () => {
    setState((prevState) => ({ ...prevState, isEditing: false }));
    alert('Changes saved!');
  };
 
  const handleMarkAsDone = (index) => {
    const updatedTasks = [...state.tasks];
    updatedTasks[index].workCompleteTime = new Date(); // Set current date and time
    updatedTasks[index].isDone = true; // Mark task as done
    setState((prevState) => ({ ...prevState, tasks: updatedTasks }));
  };
 
  const formatDate = (date) => {
    return date ? format(new Date(date), 'yyyy-MM-dd HH:mm') : 'Not completed';
  };
 
  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
  };
 
  const handleEditClick = () => {
    setState((prevState) => ({ ...prevState, isEditing: true }));
  };
 
  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedTasks = [...state.tasks];
    updatedTasks[index][field] = value;
    setState((prevState) => ({ ...prevState, tasks: updatedTasks }));
  };
 
  const { name, email, mobileNumber, skills, tasks, isEditing } = state;
 
  return (
    <div className="employee-background">
      <Container fluid>
        <Row>
          {/* Form and content take the full width */}
          <Col md={12}>
            <div className="header">
              <h1 className="head001">Employee Task Dashboard</h1>
              <Button variant="danger" onClick={handleLogout} className="logout-btn">
                Logout
              </Button>
            </div>
 
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    readOnly
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
                    onChange={(e) => setState({ ...state, mobileNumber: e.target.value })}
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
                    onChange={(e) => setState({ ...state, skills: e.target.value })}
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
                      <th>Description</th>
                      <th>Files</th>
                      <th>Created Time & Date</th>
                      <th>Assigned Time & Date</th>
                      <th>Task Completed Time & Date</th>
                      <th>Employee Comment</th>
                      <th>Manager Comment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={task.id}>
                        <td>{task.task}</td>
                        <td>{task.description}</td>
                        <td>{task.files.join(', ')}</td>
                        <td>{formatDate(task.createTime)}</td>
                        <td>{formatDate(task.assignedTime)}</td>
                        <td>{formatDate(task.workCompleteTime)}</td>
                        <td>
                          {isEditing ? (
                            <Form.Control
                              type="text"
                              value={task.employeeComment}
                              onChange={(e) => handleInputChange(e, index, 'employeeComment')}
                            />
                          ) : (
                            task.employeeComment
                          )}
                        </td>
                        <td>{task.managerComment}</td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => handleMarkAsDone(index)}
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
                <Button variant="success" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
                <Button variant="warning" className="ml-2" onClick={handleEditClick}>
                  Edit
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
 
export default EmployeeTaskDashboard;
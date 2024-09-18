import React from 'react';
import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import Sidebar from './Sidebar';
import './Admin.css';
import { format } from 'date-fns'; 
import { useNavigate } from 'react-router-dom'; 

const Admin = () => {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    selectedDate: new Date(),
    isEditing: false,
    tasks: [
      {
        id: 1,
        task: 'Sample Task',
        description: 'Task description',
        files: [], 
        createTime: new Date('2024-09-01T12:00:00'),
        assignedTime: new Date('2024-09-02T10:00:00'),
        workCompleteTime: new Date('2024-09-05T16:00:00'),
        employeeComment: 'Employee comment',
        managerComment: 'Manager comment',
        createStatus: '', 
        assignedStatus: '', 
        workCompleteStatus: '',
        createStatusTime: null, 
        assignedStatusTime: null, 
        workCompleteStatusTime: null, 
      },
    ],
  });

  const navigate = useNavigate(); 

  const handleSaveChanges = () => {
    setState((prevState) => {
      const updatedTasks = prevState.tasks.map((task) => {
        return {
          ...task,
          createStatusTime: task.createStatus ? new Date() : task.createStatusTime,
          assignedStatusTime: task.assignedStatus ? new Date() : task.assignedStatusTime,
          workCompleteStatusTime: task.workCompleteStatus ? new Date() : task.workCompleteStatusTime,
        };
      });

      return { ...prevState, tasks: updatedTasks, isEditing: false };
    });
    alert('Changes saved!');
  };

  const handleSelectEmployee = (name) => {
    setState((prevState) => ({ ...prevState, name }));
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), 'yyyy-MM-dd HH:mm') : 'N/A';
  };

  const handleLogout = () => {
    navigate('/login');
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

  const handleFileChange = (e, index) => {
    const { files } = e.target;
    const updatedTasks = [...state.tasks];
    const fileNames = Array.from(files).map((file) => file.name);
    updatedTasks[index].files = fileNames;
    setState((prevState) => ({ ...prevState, tasks: updatedTasks }));
  };

  const handleTeamsClick = () => {
    const chatUrl = `https://teams.microsoft.com/l/chat/0/0?users=${state.name}`; 
    window.location.href = chatUrl; 
  };

  const handleRadioChange = (e, index, field) => {
    const { value } = e.target;
    const updatedTasks = [...state.tasks];
    updatedTasks[index][field] = value;
    setState((prevState) => ({ ...prevState, tasks: updatedTasks }));
  };

  const { name, email, selectedDate, tasks, isEditing } = state;

  return (
    <div className="admin-background">
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar onSelectEmployee={handleSelectEmployee} />
          </Col>

          <Col md={9}>
            <div className="header">
              <h1 className="head001">Admin Dashboard</h1>
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
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Button variant="info" onClick={handleTeamsClick}>
                  Teams
                </Button>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Date:</Form.Label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setState({ ...state, selectedDate: date })}
                    dateFormat="yyyy-MM-dd"
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
                      <th>Description</th>
                      <th>Files</th>
                      <th>Create Status Time</th>
                      <th>Create Status</th>
                      <th>Assigned Status Time</th>
                      <th>Assigned Status</th>
                      <th>Work Complete Status Time</th>
                      <th>Work Complete Status</th>
                      <th>Employee Comment</th>
                      <th>Manager Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={task.id}>
                        <td>
                          {isEditing ? (
                            <Form.Control
                              type="text"
                              value={task.task}
                              onChange={(e) => handleInputChange(e, index, 'task')}
                            />
                          ) : (
                            task.task
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <Form.Control
                              type="text"
                              value={task.description}
                              onChange={(e) => handleInputChange(e, index, 'description')}
                            />
                          ) : (
                            task.description
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <>
                              <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => handleFileChange(e, index)}
                              />
                              <div>
                                {task.files.map((file, i) => (
                                  <div key={i}>{file}</div>
                                ))}
                              </div>
                            </>
                          ) : (
                            task.files.join(', ')
                          )}
                        </td>

                        <td>
                          <small> {formatDate(task.createStatusTime)}</small>
                        </td>
                        <td>
                          <Form.Check
                            type="radio"
                            name={`createStatus-${index}`}
                            label="Created"
                            value="created"
                            checked={task.createStatus === 'created'}
                            onChange={(e) => handleRadioChange(e, index, 'createStatus')}
                          />
                          
                        </td>

                        <td>
                          <small> {formatDate(task.assignedStatusTime)}</small>
                        </td>
                        <td>
                          <Form.Check
                            type="radio"
                            name={`assignedStatus-${index}`}
                            label="Assigned"
                            value="completed"
                            checked={task.assignedStatus === 'completed'}
                            onChange={(e) => handleRadioChange(e, index, 'assignedStatus')}
                          />
                        </td>

                        <td>
                          <small> {formatDate(task.workCompleteStatusTime)}</small>
                        </td>
                        <td>
                          <Form.Check
                            type="radio"
                            name={`workCompleteStatus-${index}`}
                            label="Work Done"
                            value="completed"
                            checked={task.workCompleteStatus === 'completed'}
                            onChange={(e) => handleRadioChange(e, index, 'workCompleteStatus')}
                          />
                        </td>

                        <td>
                          {isEditing ? (
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={task.employeeComment}
                              onChange={(e) => handleInputChange(e, index, 'employeeComment')}
                            />
                          ) : (
                            task.employeeComment
                          )}
                        </td>

                        <td>
                          {isEditing ? (
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={task.managerComment}
                              onChange={(e) => handleInputChange(e, index, 'managerComment')}
                            />
                          ) : (
                            task.managerComment
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {isEditing && (
                  <div className="save-changes-btn">
                    <Button variant="primary" onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  </div>
                )}
                {!isEditing && (
                  <Button variant="secondary" onClick={handleEditClick}>
                    Edit
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
import React, { Component } from 'react';
import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker CSS
import DatePicker from 'react-datepicker'; // Import DatePicker component
import Cookies from 'js-cookie';

class TaskDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        getData:[],
      name: '',
      email: '',
      selectedDate: new Date(), // State for selected date
      tasks: [
        {
          id: 1,
          task: 'Sample Task',
          domainName: "Backend",
          description: 'Task description',
          files: 'file1.txt',
          createTime: '2024-09-01 12:00',
          assignedTime: '2024-09-02 10:00',
          workCompleteTime: '2024-09-05 16:00',
          employeeComment: 'Employee comment',
          managerComment: 'Manager comment'
        }
        // Add more tasks as needed
      ]
    };
  }

  componentDidMount() {
    this.getTasksData()
  }

  getTasksData = async ()=>{
    const url = "https://task-management-backend-4.onrender.com/tasksData"
    const jwtToken = Cookies.get('Task_Secret_Token')
    const response = await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${jwtToken}`
        }
    })
    const data = await response.json()
    this.setState({getData:[...data]})
  }

  handleSaveChanges = () => {
    // Implement save changes functionality here
    alert('Changes saved!');
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { name, email, selectedDate, tasks, getData } = this.state;
    console.log(getData[0])

    return (
      <div>
        <Container>
          <div>
            <h1 className='head001'>Admin Dashboard</h1>
          </div>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={this.handleNameChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={this.handleEmailChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Button variant="primary">Teams</Button>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Date: </Form.Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={this.handleDateChange} // Set selected date
                  dateFormat="yyyy-MM-dd" // Format the date
                  className="form-control" // Apply form control styling
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
                    <th>Domain</th>
                    <th>Description</th>
                    <th>Files</th>
                    <th>Create Time & Date</th>
                    <th>Assigned Time & Date</th>
                    <th>Work Complete Time & Date</th>
                    <th>Employee Comment</th>
                    <th>Manager Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((task) => (
                    <tr key={task._id}>
                      <td>{task.taskNumber}</td>
                      <td>{task.selectedDomain}</td>
                      <td>{task.taskPara}</td>
                      <td>{task.pdfFile}</td>
                      <td>{task.createTime}</td>
                      <td>{task.assignedTime}</td>
                      <td>{task.workCompleteDt}</td>
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
              <Button variant="success" onClick={this.handleSaveChanges}>Save Changes</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TaskDashboard;



// import React, { useState } from 'react';
// import { Table, Button, Form, Col, Row, Container } from 'react-bootstrap';  
// import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
// import 'react-datepicker/dist/react-datepicker.css'; // Import date picker CSS
// import DatePicker from 'react-datepicker'; // Import DatePicker component
// // import './index.css';  // Import the CSS file for styling
// const TaskDashboard = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
 
//   // Sample data for the table
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       task: 'Sample Task',
//       domainName:"Backend",
//       description: 'Task description',
//       files: 'file1.txt',
//       createTime: '2024-09-01 12:00',
//       assignedTime: '2024-09-02 10:00',
//       workCompleteTime: '2024-09-05 16:00',
//       employeeComment: 'Employee comment',
//       managerComment: 'Manager comment'
//     }
//     // Add more tasks as needed
//   ]);
 
//   const handleSaveChanges = () => {
//     // Implement save changes functionality here
//     alert('Changes saved!');
//   };
 
//   return (
   
//       <div>
//       <Container>
//       <div>
//       <h1 className='head001'>Admin Dashboard</h1>
     
     
//       </div>
//         <Row className="mb-3">
//           <Col>
//             <Form.Group controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
 
//         <Row className="mb-3">
//           <Col>
//             <Button variant="primary">Teams</Button>
//           </Col>
//         </Row>
 
//         <Row className="mb-3">
//           <Col>
//             <Form.Group>
//               <Form.Label>Date: </Form.Label>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)} // Set selected date
//                 dateFormat="yyyy-MM-dd" // Format the date
//                 className="form-control" // Apply form control styling
//               />
//             </Form.Group>
//           </Col>
//         </Row>
 
//         <Row>
//           <Col>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>Task</th>
//                   <th>Domain</th>
//                   <th>Description</th>
//                   <th>Files</th>
//                   <th>Create Time & Date</th>
//                   <th>Assigned Time & Date</th>
//                   <th>Work Complete Time & Date</th>
//                   <th>Employee Comment</th>
//                   <th>Manager Comment</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tasks.map((task) => (
//                   <tr key={task.id}>
//                     <td>{task.task}</td>
//                     <td>{task.domainName}</td>
//                     <td>{task.description}</td>
//                     <td>{task.files}</td>
//                     <td>{task.createTime}</td>
//                     <td>{task.assignedTime}</td>
//                     <td>{task.workCompleteTime}</td>
//                     <td>{task.employeeComment}</td>
//                     <td>{task.managerComment}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Col>
//         </Row>
 
//         <Row>
//           <Col className="text-right">
//             <Button variant="success" onClick={handleSaveChanges}>Save Changes</Button>
//           </Col>
//         </Row>
     
//       </Container>
//       </div>
   
//   );
// };
 
// export default TaskDashboard;
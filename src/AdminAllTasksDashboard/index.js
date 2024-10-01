import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import './index.css'; // Add this file for styling

class AllTasksDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDomain: "All",
      selectedStatus: "All",
      searchTerm: "",
      tasksData:[],
      employees: [
        { id: 1, name: "John Doe", task: "Develop Homepage", status: "Completed", domain: "Development" },
        { id: 2, name: "Jane Smith", task: "Design Logo", status: "Not Completed", domain: "Design" },
        { id: 3, name: "Tom Brown", task: "Deploy App", status: "Not Completed", domain: "Deployment" },
        { id: 4, name: "Alice Green", task: "Test Features", status: "Completed", domain: "Testing" },
      ],
    };
  }

  componentDidMount(){
    this.getAllTasksApiDash()
  }

  getAllTasksApiDash = async () =>{
    const url = "http://localhost:4000/getAllTasks"
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if(response.status === 201){
        this.setState({tasksData:data})
      }
    } catch (e) {
      console.log(`Error at getting all tasks : ${e.message}`)
    }
  }

  handleDomainChange = (e) => {
    this.setState({ selectedDomain: e.target.value });
  };

  handleStatusChange = (e) => {
    this.setState({ selectedStatus: e.target.value });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  filterEmployees = () => {
    const { tasksData, employees, selectedDomain, selectedStatus, searchTerm } = this.state;

    return tasksData.filter((employee) => {
      const matchesDomain = selectedDomain === "All" || employee.roleDesgnation === selectedDomain;
      const matchesStatus = selectedStatus === "All" || employee.completeStatus === selectedStatus;
      const matchesSearchTerm = employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDomain && matchesStatus && matchesSearchTerm;
    });
  };

  logOutRemoveToken = () =>{
    Cookies.remove("Admin_Secret_Token");
    window.location.reload();
  }

  render() {
    const { tasksData,selectedDomain, selectedStatus, searchTerm } = this.state;
    const filteredEmployees = this.filterEmployees();
    const domains = [
      "All","FULL STACK",'FRONTEND',"BACKEND","DATA BASE","BUSINESS ANALYST","Dev Ops","DATA SCIENCE","TESTING","FIGMA"
    ];
    const statuses = ["All", "Completed", "Not Completed"];
    const token = Cookies.get("Admin_Secret_Token")
    if (!token) {
      return <Navigate to="/Admin-Login" />;
    }
    return (
      <div className="dashboard-container">
        <div className="flexitems">
        <h1 className="dashboard-title">Admin Task Dashboard</h1>

        <div className="btn-flex">
        <div>
          <Link to="/admin">
          <button className="logout-btn2"> Task Assign </button>
          </Link>
            </div> 
        <div>
          <button className="logout-btn ght" onClick={this.logOutRemoveToken}> Logout </button>
            </div> 
            </div>

        </div>
        <h1 className="dashboard-title2">Domain Task Count : {tasksData.length}</h1>

        {/* Domain Selection */}
        <div className="domain-selection">
          <label htmlFor="domain" className="domain-label">Select Domain:</label>
          <select
            id="domain"
            value={selectedDomain}
            onChange={this.handleDomainChange}
            className="domain-select"
          >
            {domains.map((domain, index) => (
              <option key={index} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* Status Selection */}
        <div className="status-selection">
          <label htmlFor="status" className="status-label">Select Status:</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={this.handleStatusChange}
            className="status-select"
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Search by Employee Name */}
        <div className="search-employee">
          <label htmlFor="search" className="search-label">Search Employee:</label>
          <input
            type="text"
            id="search"
            placeholder="Enter employee name"
            value={searchTerm}
            onChange={this.handleSearchChange}
            className="search-input"
          />
        </div>
        <h1 className="dashboard-title2"> Task Count : {filteredEmployees.length}</h1>

        {/* Employee Task Table */}
        <div className="employee-task-table">
          <table className="task-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Task ID</th>
                <th>Discription</th>
                <th>Domain</th>
                <th>Task Create Time</th>
                <th>Task Assigned Time</th>
                <th>Task Completed Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.taskNumber} className={`task-row ${employee.completeStatus === "Completed" ? 'completed' : 'not-completed'}`}>
                    <td>{employee.employeeName}</td>
                    <td>{employee.taskNumber.slice(30,36)}</td>
                    <td>{employee.taskDiscription}</td>
                    <td>{employee.roleDesgnation}</td>
                    <td>{employee.taskCreateTime}</td>
                    <td>{employee.taskAssignedTime}</td>
                    <td>{employee.completeDateTime}</td>
                    <td className={`status ${employee.completeStatus === "Completed" ? 'status-completed' : 'status-not-completed'}`}>
                      {employee.completeStatus}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllTasksDashboard;

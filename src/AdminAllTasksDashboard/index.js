import React, { useState } from "react";
import './index.css'; // Add this file for styling

const AllTasksDashboard = () => {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", task: "Develop Homepage", status: "Completed", domain: "Development" },
    { id: 2, name: "Jane Smith", task: "Design Logo", status: "Not Completed", domain: "Design" },
    { id: 3, name: "Tom Brown", task: "Deploy App", status: "Not Completed", domain: "Deployment" },
    { id: 4, name: "Alice Green", task: "Test Features", status: "Completed", domain: "Testing" },
  ]);

  const domains = ["All", "Development", "Design", "Testing", "Deployment"];
  const statuses = ["All", "Completed", "Not Completed"];

  // Filter employees based on domain, status, and search term
  const filteredEmployees = employees.filter((employee) => {
    const matchesDomain = selectedDomain === "All" || employee.domain === selectedDomain;
    const matchesStatus = selectedStatus === "All" || employee.status === selectedStatus;
    const matchesSearchTerm = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesStatus && matchesSearchTerm;
  });

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Task Dashboard</h1>

      {/* Domain Selection */}
      <div className="domain-selection">
        <label htmlFor="domain" className="domain-label">Select Domain:</label>
        <select
          id="domain"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
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
          onChange={(e) => setSelectedStatus(e.target.value)}
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
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Employee Task Table */}
      <div className="employee-task-table">
        <table className="task-table">
          <thead>
            <tr>
              <th> Employee ID</th>
              <th>Task ID</th>
              <th>Description</th>
              <th>Task Create Time</th>
              <th>Task Assigned Time</th>
              <th> Task Completed Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className={`task-row ${employee.status === "Completed" ? 'completed' : 'not-completed'}`}>
                  <td>{employee.name}</td>
                  <td>{employee.task}</td>
                  <td>{employee.domain}</td>
                  <td>{employee.domain}</td>
                  <td>{employee.domain}</td>
                  <td>{employee.domain}</td>
                  <td className={`status ${employee.status === "Completed" ? 'status-completed' : 'status-not-completed'}`}>
                    {employee.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTasksDashboard;

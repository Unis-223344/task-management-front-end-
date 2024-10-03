import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Importing the CSS file

const TaskManagementPage = () => {
  return (
    <div className="task-page-container">
      {/* Header Section */}
      <header className="task-page-header">
        <h1 className="task-page-title">Unis Technosoft Task Management</h1>
        <p className="task-page-subtitle">Manage tasks effectively for Admins and Employees</p>
      </header>

      {/* Buttons Section */}
      <section className="button-section">
        <div className="button-container">
          <Link to="/Admin-Login">
          <button className="task-button admin-button">Admin</button>
          </Link>
          <Link to="/login">
          <button className="task-button employee-button">Employee</button>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="task-footer">
        <p className="footer-text">&copy; 2024 Unis Technosoft. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TaskManagementPage;

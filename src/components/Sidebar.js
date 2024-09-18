import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      activeDropdown: null,
      selectedDomain: '',
      filterData: [], 
      selectedEmployees: [], 
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() }, this.filterEmployees);
  };

  toggleDropdown = (index) => {
    this.setState((prevState) => ({
      activeDropdown: prevState.activeDropdown === index ? null : index,
    }));
  };

  handleSelectDomain = (title) => {
    this.setState({ selectedDomain: title, activeDropdown: null }, this.filterEmployees);
  };

  handleSelectEmployee = (name) => {
    this.setState((prevState) => {
      const { selectedEmployees } = prevState;
      const isSelected = selectedEmployees.includes(name);
 
      const updatedSelectedEmployees = isSelected
        ? selectedEmployees.filter((employee) => employee !== name)
        : [...selectedEmployees, name];

      this.props.onSelectEmployee(updatedSelectedEmployees);
      
      return { selectedEmployees: updatedSelectedEmployees };
    });
  };
  domains = [
    'Frontend', 'Backend', 'Database', 'Testing', 'BA', 'Devops', 'Admin'
  ];

  Employees = [
    { name: 'Sarvothama', domain: 'Frontend' },
    { name: 'Davood', domain: 'Frontend' },
    { name: 'Yaswanth', domain: 'Frontend' },
    { name: 'Chishwana', domain: 'Backend' },
    { name: 'Gangadhara', domain: 'Backend' },
    { name: 'Bhavani', domain: 'Backend' },
    { name: 'Rama Rao', domain: 'Database' },
    { name: 'Kiran', domain: 'Testing' },
    { name: 'Swapanith', domain: 'BA' },
    { name: 'Ranadeep', domain: 'Devops' },
    { name: 'Lakshmi', domain: 'Admin' },
  ];

  filterEmployees = () => {
    const { searchTerm, selectedDomain } = this.state;
    const filteredEmployees = this.Employees.filter(employee =>
      (selectedDomain === '' || employee.domain === selectedDomain) &&
      (searchTerm === '' || employee.name.toLowerCase().includes(searchTerm))
    );
    this.setState({ filterData: filteredEmployees });
  };

  componentDidMount() {
    this.filterEmployees(); 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm || prevState.selectedDomain !== this.state.selectedDomain) {
      this.filterEmployees();
    }
  }

  render() {
    const { searchTerm, activeDropdown, selectedDomain, filterData, selectedEmployees } = this.state;

    return (
      <div className="sidebar">
        <div className="dropdown-container">
          <button className="dropdown-btn" onClick={() => this.toggleDropdown(0)}>
            {selectedDomain || 'Select a domain'}
          </button>
          {activeDropdown === 0 && (
            <ul className="dropdown-content">
              {this.domains.map((domain, index) => (
                <li 
                  key={index} 
                  onClick={() => this.handleSelectDomain(domain)}
                  className={selectedDomain === domain ? 'selected' : ''}
                >
                  {domain}
                </li>
              ))}
            </ul>
          )}
        </div>
        <br />
        <input 
          type="text" 
          placeholder="Search by employee name"
          value={searchTerm}
          onChange={this.handleSearchChange}
        />

        {filterData.length > 0 ? (
          filterData.map((employee, index) => (
            <h3 
              key={index} 
              onClick={() => this.handleSelectEmployee(employee.name)}
              className={selectedEmployees.includes(employee.name) ? 'selected' : ''}
            >
              {employee.name}
            </h3>
          ))
        ) : (
          <p>No employees found</p>
        )}
      </div>
    );
  }
}

export default Sidebar;
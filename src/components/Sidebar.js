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
      selectEmp:"" 
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

  handleSelectEmployee = (name2) => {
    this.setState((prevState) => {
      const { selectedEmployees } = prevState;
      const isSelected = selectedEmployees.includes(name2.employeeName);
 
      const updatedSelectedEmployees = isSelected
        ? selectedEmployees.filter((employee) => employee !== name2.employeeName)
        : [...selectedEmployees, name2.employeeName]
      const employeeSelectedData = this.props.prop.filter(char =>(
        char.employeeName === updatedSelectedEmployees[0]
      ))
      this.setState({ selectEmp: employeeSelectedData})

      this.props.onSelectEmployee(updatedSelectedEmployees);
      
      return { selectedEmployees: updatedSelectedEmployees };
    });
  };
  domains = [
    "FULL STACK",'FRONTEND',"BACKEND","DATA BASE","BUSINESS ANALYST","Dev Ops","DATA SCIENCE","TESTING","FIGMA"
  ];

  filterEmployees = () => {
    const { searchTerm, selectedDomain } = this.state;
    const filteredEmployees = this.props.prop.filter(employee =>
      (selectedDomain === '' || employee.techStack === selectedDomain) &&
      (searchTerm === '' || employee.employeeName.toLowerCase().includes(searchTerm))
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
    const { selectEmp, searchTerm, activeDropdown, selectedDomain, filterData, selectedEmployees } = this.state;
    const getDataProp = this.props.prop
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
            <h1 
            style={{fontSize:"15px"}}
              key={index} 
              onClick={() => this.handleSelectEmployee(employee)}
              className={selectedEmployees.includes(employee.employeeName) ? 'selected' : ''}
            >
              {employee.employeeName}
            </h1>
          ))
        ) : (
          <p>No employees found</p>
        )}
      </div>
    );
  }
}

export default Sidebar;
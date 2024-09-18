import {Component} from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./index.css"
import TaskDashboard from '../TaskDashboard';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDomain: "",
      taskNumber:"",
      taskPara:"",
      pdfFile:"",
      assignedTime:"",
      workCompleteDt:"",
      employeeComment:"",
      managerComment:"",
    };
  }

  onChangeTaskNumber = event => {
    this.setState({taskNumber: event.target.value})
  }

  onChangeTaskPara = event => {
    this.setState({taskPara: event.target.value})
  }

  onChangePdfFile = event => {
    this.setState({pdfFile: event.target.value})
  }

  onSubmitForm = async (e) => {
    e.preventDefault();
    const {selectedDomain, taskNumber, taskPara, pdfFile, createTime, assignedTime, workCompleteDt, employeeComment, managerComment } = this.state;

    const postData = {           
        "selectedDomain1":selectedDomain,
        "taskNumber1":taskNumber,
        "taskPara1":taskPara,
        "pdfFile1":pdfFile,
        "assignedTime1": assignedTime,
        "workCompleteDt1":workCompleteDt,
        "employeeComment1":employeeComment,
        "managerComment1":managerComment
    }
    const url = "http://localhost:4000/taskPost"
    const jwtToken = Cookies.get('Task_Secret_Token');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify(postData),
    }
    const response = await fetch(url,options)
    const data = await response.json()
    console.log(response)
    if (response.status === 201) {
        alert("Task updated successfully")
    this.setState({selectedDomain: ""})
    this.setState({taskNumber:""})
    this.setState({taskPara:""})
    this.setState({pdfFile:""})
    }
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() });
  };

  handleChange = (event) => {
    this.setState({ selectedDomain: event.target.value });
  };

  filterEmployees = () => {
    const { searchTerm, selectedDomain } = this.state;

    const Employees = [
      { name: 'John Doe', domain: 'Frontend' },
      { name: 'Alice Johnson', domain: 'Frontend' },
      { name: 'Bob Johnson', domain: 'Frontend' },
      { name: 'Jane Smith', domain: 'Backend' },
      { name: 'Gangadhara', domain: 'Backend' },
      { name: 'Mike Johnson', domain: 'Database' },
      { name: 'Sarah Wilson', domain: 'Testing' },
      { name: 'Mark Wilson', domain: 'BA' },
      { name: 'David Wilson', domain: 'Devops' },
      { name: 'Sarah Wilson', domain: 'Admin' },
    ];

    const filteredEmployees = Employees.filter(employee =>
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
    const { searchTerm, selectedDomain} = this.state;

    const domains = [
      { title: 'Frontend' },
      { title: 'Backend' },
      { title: 'Database' },
      { title: 'Testing' },
      { title: 'BA' },
      { title: 'Devops' },
      { title: 'Admin' },
    ];

    const jwtToken = Cookies.get('Task_Secret_Token');
    if (!jwtToken) {
      return <Navigate to="/login" />;
    }
    return (
        <div className='centerItems'>

      {/* <div className="sidebar">
        <div className="dropdown-container">
          <select
            className="dropdown-select"
            value={selectedDomain}
            onChange={this.handleSelectDomain}
          >
            <option value="">Select a domain</option>
            {filteredDomains.length > 0 ? (
              filteredDomains.map((domain, index) => (
                <option key={index} value={domain.title}>
                  {domain.title}
                </option>
              ))
            ) : (
              <option disabled>No domains found</option>
            )}
          </select>
        </div>
        <br />
        <input
          type="text"
          placeholder="Search by employee name"
          value={searchTerm}
          onChange={this.handleSearchChange}
        />

        {filterData.length > 0 ? (
          filterData.map((char, index) => (
            <h3 key={index}>{char.name}</h3>
          ))
        ) : (
          <p>No employees found</p>
        )}
      </div> */}

        <div>
            <form className="form-container" onSubmit={this.onSubmitForm} >
            <h1 className='adminDash'>Admin DashBoard</h1>
            <div>
        <label htmlFor="domain-dropdown">Select a Domain:</label>
        <select
          id="domain-dropdown"
          value={this.state.selectedDomain}
          onChange={this.handleChange}
        >
          <option value="" disabled>Select a domain</option>
          {domains.map((domain, index) => (
            <option key={index} value={domain.title}>
              {domain.title}
            </option>
          ))}
        </select>
        <p>Selected Domain: {this.state.selectedDomain}</p>
      </div>

            <p> Task Number : <input type='text' onChange={this.onChangeTaskNumber} /> </p>
            <p> Task Discription : <input type='text' onChange={this.onChangeTaskPara} /> </p>
            <p> File : <input type="file" onChange={this.onChangePdfFile} /> </p>
            {/* <button>Create Date & Time</button> */}
            {/* <br />
            <button>Assigned Date & Time</button> */}
            {/* <br />
            <button>Work Complete Date & Time</button> */}
            {/* <br /> */}
            {/* <p> Employee Comment : <input type="text" /> </p> */}
            {/* <p> Manager Comment : <input type="text" /> </p> */}
            <br />
            <button type='submit'>Save Task</button>
            </form>
        </div>

        <TaskDashboard />

      </div>
    );
  }
}

export default DashBoard;


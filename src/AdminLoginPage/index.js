import React,{Component} from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'
import EmployeeTaskDashboard from '../components/EmployeeTaskDashboard';

class AdminLoginForm extends Component {
  constructor(props) {
    super(props);
  this.state = {
    name2: '',
    password3: '',
    sendGmail:""
  }
}

  submitFormPost = async (e)=>{
    e.preventDefault()
    const {name2, password3} = this.state
    const userDetails = {"name":name2.trimEnd(), "passWord2":password3.trimEnd()}
    const url = "http://localhost:4000/superAdminLogin"
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(userDetails),
    })
    const data = await response.json()

    if(response.status === 200){
        Cookies.set("Admin_Secret_Token", data.jwtToken, {expires:10})
        this.props.navigate('/admin')
    }

    if(response.status === 400){
      alert("Invalid Admin Credentials")
      this.setState({name2: "", password3: ""})
    }

  }

  onChangeName = event => {
    this.setState({name2: event.target.value})
  }

  onChangePassword2 = event => {
    this.setState({password3: event.target.value})
  }

  render() {
    const {name2,password3} =this.state
    const token = Cookies.get("Admin_Secret_Token")
    if (token !== undefined) {
      return <Navigate to="/admin" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://i.ibb.co/qJ6GCND/unis.png"
          className="login-image"
          alt="website login"
        />

        <form className="form-container" onSubmit={this.submitFormPost}>
            <div className='nameCont'>
          <h1 className='head2'> Unis Admin Login Form </h1>
          </div>
          <div className="input-container">
          <label className="input-label" htmlFor="username">
          Admin Name
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={name2}
          onChange={this.onChangeName}
        />
          </div>
          <div className="input-container">
          <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password3}
          onChange={this.onChangePassword2}
        />
          </div>
          <button type='submit' className='login-button'>
            Login
          </button>
          <Link to="/">
          <button className="task-button admin-button add3">Back To Home</button>
          </Link>
          </form>
      </div>
    )
  }
}

const SuperAdminLogin = () => {
    const navigate = useNavigate();
    return <AdminLoginForm navigate={navigate} />;
  };
  
  export default SuperAdminLogin ;
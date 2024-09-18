import React,{Component} from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  submitForm = async (e)=>{
    e.preventDefault()
    const {email, password} = this.state
    const userDetails = {"gmail":email, "employeePassWord":password}
    const url = "http://localhost:4000/employeesLoginPost"
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(userDetails),
    }
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
        this.setState({sucess:true})
        Cookies.set("Task_Secret_Token", data.jwtToken, {expires:10})
    }

  }

  onChangeGmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

//   renderPasswordField = () => {
//     const {password} = this.state
//     return (
//       <>
//         <label className="input-label" htmlFor="password">
//           PASSWORD
//         </label>
//         <input
//           type="password"
//           id="password"
//           className="password-input-filed"
//           value={password}
//           onChange={this.onChangePassword}
//         />
//       </>
//     )
//   }

//   renderUsernameField = () => {
//     const {email} = this.state
//     return (
//       <>
//         <label className="input-label" htmlFor="username">
//           Email
//         </label>
//         <input
//           type="text"
//           id="username"
//           className="username-input-filed"
//           value={email}
//           onChange={this.onChangeGmail}
//         />
//       </>
//     )
//   }

  render() {
    const {email,password} =this.state
    const jwtToken = Cookies.get('Task_Secret_Token')
    if (jwtToken !== undefined) {
      return <Navigate to="/" />
    }
    return (
      <div className="login-form-container">
        {/* <img
          src="https://i.ibb.co/qJ6GCND/unis.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        /> */}
        <img
          src="https://i.ibb.co/qJ6GCND/unis.png"
          className="login-image"
          alt="website login"
        />

        <form className="form-container" onSubmit={this.submitForm}>
            <div className='nameCont'>
          <h1 className='head2'> Unis Login Form </h1>
          </div>
          <div className="input-container">
          <label className="input-label" htmlFor="username">
          Email
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={email}
          onChange={this.onChangeGmail}
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
          value={password}
          onChange={this.onChangePassword}
        />
          </div>
          <button type='submit' className='login-button'>
            Login
          </button>
          </form>
      </div>
    )
  }
}

export default LoginForm
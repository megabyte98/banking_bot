import React, { Fragment, useState } from "react"
import "./fundForm.css"
import axios from "axios"

const Login = (props,state) => {
  const [formData, setFormData] = useState({
    AccountNumber: "",
    username: "",
  })

  const { AccountNumber,username } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async(e) => {
    e.preventDefault()
    console.log(formData)
    try{
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const body = JSON.stringify(formData)
      const res=await axios.post('http://localhost:5000/api/login',body,config);
      console.log(res);
      if(res.data.text === "invalid Credentials"){
          props.actionProvider.handleInvalid()
          return;
      }
      if(res.status === 200){
        localStorage.setItem("userId", res.data.id)  
        props.actionProvider.handleDefault();
        props.setState((state)=> ({...state,userId : res.data.id}))
      }
      }catch(err){
        console.log(err)
        props.actionProvider.handleLogin();
      }
   
  }

  return (
    <Fragment>
    <form onSubmit={(e) => onSubmit(e)}>
        <input
          className = "form-input"  
          placeholder="Account Number"    
          type="text"
          name="AccountNumber"
          value={AccountNumber}
          onChange={(e) => onChange(e)}
        />
        <input
          className = "form-input"  
          placeholder="Username"  
          type="text"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
        />
      
      <input className = "form-input" type="submit" value="Submit" />
    </form>
    </Fragment>
  )
}

export default Login
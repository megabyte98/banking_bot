import React, { Fragment, useState } from "react"
import "./fundForm.css";
import axios from "axios";
const AddBenForm = (props) => {
  console.log(props)
  const [formData, setFormData] = useState({
    name: "",
    AccountNumber: "",
    type: "",
    Ifsc : ""
  })

  const { name,AccountNumber,type,Ifsc } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async(e) => {
    e.preventDefault()
    try{
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const body = JSON.stringify(formData)
      const res=await axios.post(`http://localhost:5000/api/ben/newBen/${props.userId}`,body,config);
      console.log(res);
      }catch(err){
        console.log(err)
      }
  }

  return (
    <Fragment>
    <form onSubmit={(e) => onSubmit(e)}>
        <input
            className="form-input"
          placeholder=" Beneficiary Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
        className="form-input"
         placeholder="Account Type"
          type="text"
          name="type"
          value={type}
          onChange={(e) => onChange(e)}
        />
         <input
        className="form-input"
         placeholder="IFSC Code"
          type="text"
          name="Ifsc"
          value={Ifsc}
          onChange={(e) => onChange(e)}
        />
        <input
        className="form-input"
         placeholder="Account Number"
          type="Number"
          name="AccountNumber"
          value={AccountNumber}
          onChange={(e) => onChange(e)}
        />
      <input className="form-input" type="submit" value="Submit" />
    </form>
    </Fragment>
  )
}

export default AddBenForm
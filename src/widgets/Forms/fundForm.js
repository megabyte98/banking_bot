import React, { Fragment, useState,useEffect } from "react"
import "./fundForm.css";
import axios from "axios";

const FundForm = (props) => {
  console.log(props)  
  const [formData, setFormData] = useState({
    benName: "",
    type: "",
    amount: "",
  })
  const [Balance, setBalance] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        try{
            const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
            const res=await axios.get(`http://localhost:5000/api/balance/${props.userId}`,config);
            console.log(res.data); 
            setBalance(res.data.curBal)
          }catch(err){
            console.log(err)
          }
    } 
    fetchData()
  }, [])

  const { benName,type,amount } = formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try{
        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const newBal  = Balance-amount;
      if(newBal < 0){
        props.actionProvider.handleFailFund();
        return
    }
      if(newBal < 100){
          props.actionProvider.handleMinBal();
          return
      }
      console.log(newBal)
      const data  = {...formData, balance : newBal }
      const body = JSON.stringify(data)
      const res=await axios.post(`http://localhost:5000/api/fund/create/${props.userId}`,body,config);
      console.log(res);
      if(res.data.text === "Benficiary Not Found"){
        props.actionProvider.handleFail();
        return;
      }
      if(res.status === 200){
        props.actionProvider.handleSuccessful();
        const body = JSON.stringify({ bal : newBal})
        const res=await axios.post(`http://localhost:5000/api/balance/update/${props.userId}`,body,config);
        console.log(res)
      }
      }catch(err){
        console.log(err)
      }
  }

  return (
    <Fragment>
    <form onSubmit={(e) => onSubmit(e)}>
        <input
          className="form-input"  
          placeholder="Benificiary Name"
          type="text"
          name="benName"
          value={benName}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-input"    
          placeholder="Type"  
          type="text"
          name="type"
          value={type}
          onChange={(e) => onChange(e)}
        />
        <input 
          className="form-input"   
          placeholder="Amount"  
          type="Number"
          name="amount"
          value={amount}
          onChange={(e) => onChange(e)}
        />
      <input className="form-input" type="submit" value="Submit" />
    </form>
    </Fragment>
  )
}

export default FundForm
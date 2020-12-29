import React, { useState, useEffect } from "react";
import { ConditionallyRender } from "react-util-kit";
import axios from "axios";

import "./BeneficiarySelector.css";

const BeneficiarySelector = ({ selectedBeneficiary, setState, actionProvider }) => {
  const [displaySelector, toggleDisplaySelector] = useState(true);
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }    
    const res=await axios.get('http://localhost:5000/api/ben/allBen/2',config);
    console.log(res.data)
    setBeneficiaries(res.data);
    }
   fetchData();
  }, []);

  const handleSubmit = (e) => {
    setState((state) => ({
      ...state,
      selectedBeneficiary: "Manu"
    }));
  };

  const handleConfirm = () => {
    actionProvider.handleInitiate();
    toggleDisplaySelector((prevState) => !prevState);
  };


  const createBeneficiaryOptions = () => {
    return beneficiaries.map((item) => {
      return (
        <option key={item.name} value={item.name}>
          {item.name}
        </option>
      );
    });
  };

  return (
    <div className="beneficiary-selector-container">
      <ConditionallyRender
        ifTrue={displaySelector}
        show={
          <>
            {" "}
            <h2 className="beneficiary-selector-heading">Beneficiary</h2>
            <select
              className="beneficiary-selector"
              value={selectedBeneficiary.name}
              onChange={handleSubmit}
            >
              {createBeneficiaryOptions()}
            </select>
            <button className="beneficiary-button-confirm" onClick={handleConfirm}>
              Confirm
            </button>
          </>
        }
        elseShow={
          <>
            <h2 className="beneficiary-selector-heading">Beneficiary</h2>
            <p>
              Great! You have chosen this Beneficiary: {selectedBeneficiary.name}
            </p>
          </>
        }
      />
    </div>
  );
};
export default BeneficiarySelector;
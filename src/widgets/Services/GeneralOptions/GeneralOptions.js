import React,{useEffect} from "react";
import Services from "./../Services";

const GeneralOptions = (props) => {
  const services = [
    {
      name: "Fund Transfer",
      handler: props.actionProvider.handleFundTransfer,
      id: 1,
    },
    {
      name: "Balance",
      handler: props.actionProvider.handleBalance,
      id: 2,
    },
    {
      name: "Add Beneficiary",
      handler: props.actionProvider.handleAddBen,
      id: 3,
    },
    {
      name: "Mini  statement",
      handler: props.actionProvider.handleMiniStatement,
      id: 4,
    },
  ];

  return <Services services={services} />;
};

export default GeneralOptions;
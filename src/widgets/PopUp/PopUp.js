import React from "react";

import  "./PopUp.css";

import { ReactComponent as Cross } from "./../PopUp/times-circle.svg";

const PopUp= ({ children, setState }) => {
  return (
    <div className="informationBox">
      <button
        className="closeMessageBox"
        onClick={() => setState((state) => ({ ...state, infoBox: "" }))}
      >
        <Cross className="closeMessageBoxIcon" />
      </button>
      <div className="informationBoxContent">{children}</div>
    </div>
  );
};

export default PopUp;
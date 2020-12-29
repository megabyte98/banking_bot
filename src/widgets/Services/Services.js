import React from "react";

import "./Services.css"

const Services = ({services}) => {
    const markup = services.map((service) => (
    <button key={service.id} className="option" onClick={service.handler}>
      {service.name}
    </button>
  ));

  return <div className="options">{markup}</div>;
};

export default Services;
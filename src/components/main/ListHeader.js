import React, { Component } from "react";

const ListHeader =(props)=> {
    return (
      <div className="header">
        <h1>{props.name}</h1>
        &nbsp;
        <small style={{ color: "rgb(202, 131, 194)" }}>{props.number}</small>
      </div>
    );
  
}

export default ListHeader;

//"rgb(175, 197, 216)"

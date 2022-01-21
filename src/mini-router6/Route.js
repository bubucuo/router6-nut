import React from "react";

export default function Route({ element, children }) {
  console.log("children", element); //sy-log

  return element;
  // return children ? React.cloneElement(element, {}, children) : element;
}

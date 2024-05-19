import React from "react";

export default function Enem({ className, ...rest }) {
  return <div {...rest} className={`${className} enemBtn`}></div>;
}

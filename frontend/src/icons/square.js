import React from "react";

export default function Square(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 15 15"
      fill="none"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H12C13.1046 1 14 1.89543 14 3V14H1V1Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

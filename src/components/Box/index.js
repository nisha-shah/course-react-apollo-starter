import React from "react"

const Box = ({ children }) => (
  <div
    style={{
      padding: `10px`,
      border: `1px solid #ccc`,
    }}
  >
    {children}
  </div>
)

export default Box

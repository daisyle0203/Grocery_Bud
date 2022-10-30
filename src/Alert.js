import React, { useEffect } from "react"

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    // Once something changes from the list, clear out the timeout
    return () => clearTimeout(timeout)
  }, [list]) // Every time the list change, get a new timer
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert

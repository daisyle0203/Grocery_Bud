import React, { useEffect } from "react"

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    // After 3 seconds, run the callback function -> call removeAlert()
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)

    // clean up function
    // Once something changes from the list, clear out the timeout
    return () => clearTimeout(timeout)
  }, [list]) // Every time the list changes, get a new timer
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert

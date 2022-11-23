import React, { useState, useEffect } from "react"
import List from "./List"
import Alert from "./Alert"

const getLocalStorage = () => {
  // Get the item from local storage by key
  let list = localStorage.getItem("list")
  // If the list exists, return the list
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
    // If not, return an empty array
  } else {
    return []
  }
}

function App() {
  // state for the value that is in the form
  const [name, setName] = useState("")
  // state for the localStorage in  List
  const [list, setList] = useState(getLocalStorage())
  // flag for the state where it is editing or not
  const [isEditing, setIsEditing] = useState(false)
  // state for the ID which reflects which item we edit
  const [editID, setEditID] = useState(null)
  // state for keeping track the alert
  const [alert, setAlert] = useState({
    show: false,
    mgs: "",
    type: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // If the value is empty then display the alert
    if (!name) {
      showAlert(true, "danger", "Please enter value")
    }
    // If there's something in the value and if isEditing is true then display the alert
    else if (name && isEditing) {
      // Iterate over the list array
      // If the item id matches the id you have in the state 
      // then return all the previous items and change the title to the name in the state right now
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName("")
      setEditID(null)
      setIsEditing(false)
      showAlert(true, "success", "value change")
    }
    // If everything is correct then display the alert
    else {
      showAlert(true, "success", "item added to the list")
      // Create a new item with id and title and add it to the list
      // Because this is a list so we need an unique ID for it
      const newItem = { id: new Date().getTime().toString(), title: name } 
      // Function that controls the array
      // Get previous value from the state and then add newItem to the array
      setList([...list, newItem]) 
      // Set name to empty string so the moment you add the item, the input is clear
      setName("")
    }
  }

  // Once showAlert is revoked, if show is not passed -> default to false, type and msg to empty string
  // After 3 seconds, hide the alert
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  // Function to call the whole list
  const clearList = () => {
    showAlert(true, "danger", "empty list")

    // Wipe put all the value in the array
    setList([])
  }

  // Function to remove individual item from the list
  const removeItem = (id) => {
    // Show the alert that the item is removed
    showAlert(true, "danger", "item removed")
    // Set the list to the new value
    // filter() return a brand new array
    // return the item whose id does not match
    // If the id does not match then add it to the new array
    setList(list.filter((item) => item.id !== id))
  }

  // Function to edit each item
  const editItem = (id) => {
    // Get items whose id matches
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    // Display that item you want to edit
    setName(specificItem.title)
  }

  // Every time list changes, set the list to the local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App

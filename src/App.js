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
  const [name, setName] = useState("")
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
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
    // If there's something in the value and if isEditing is true then deal with edit
    else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id == editID) {
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
    // If everything is correct then show alert
    else {
      showAlert(true, "success", "item added to the list")
      // Create a new item with id and title and add it to the list
      // set name to empty string so the moment you add the item, the input is clear
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName("")
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, "danger", "empty list")
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed")
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

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

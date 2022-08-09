import React, { useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import "../css/My.css"
import {  Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"



export default function NavbarComponent() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand as={Link} to="/user">
        DSCE-AIML Drive
      </Navbar.Brand>
      
       {/* <RetrieveData />  */}
       {/* <SearchBar placeholder="Search ..." />  */}
      
      <div className="w-100 text-right mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </Navbar>
  )
}

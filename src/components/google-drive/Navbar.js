import React, { useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import "../css/My.css"
import { Card, Button, Alert } from "react-bootstrap"
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
      <Navbar.Brand as={Link} to="/">
        DSCE-AIML Drive
      </Navbar.Brand>
      
      <div class="group">
        <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
        <input placeholder="Search" type="search" class="input" />
      </div>
      
      <div className="w-100 text-right mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      
    </Navbar>
  )
}

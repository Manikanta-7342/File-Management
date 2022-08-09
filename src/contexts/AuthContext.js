import React, { useContext, useState, useEffect } from "react"
import { auth,database } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userprop, setUserprop] = useState()

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      
      let doc=user!=null && user.uid !=null ? await database.users.doc(user.uid).get():null
      //console.log(doc.data())
      let userobj = {}
       
      if(doc!=null){
        userobj= doc.data()
      }
      setCurrentUser(user)
      setUserprop(userobj)
      //console.log("authcontext",doc.data())
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    userprop,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

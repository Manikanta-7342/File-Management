import React from "react"
import { Button, Container } from "react-bootstrap"
import { useFolder } from "../../hooks/useFolder"
import AddFolderButton from "./AddFolderButton"
import AddFileButton from "./AddFileButton"
import Folder from "./Folder"
import File from "./File"
import SearchBar from "./SearchBar"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import 'font-awesome/css/font-awesome.min.css'
import "../css/My.css"
import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
//import { fire } from "../../firebase"
import Navbar from "./Navbar"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import { useParams, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import FolderRename from "./FolderRename"
import FileRename from "./FileRename"

//import * as functions from "firebase-functions"
//import * as admin from "firebase-admin"

const handleDelete = (e, data) => {
  //console.log( data.item )
  //console.log(data.name)
   const storage = getStorage();

   const desertRef = ref(storage, data.item);
   const db = getFirestore();

   const docRef = doc(db, "files", data.name);
   
   deleteDoc(docRef)
   .then(() => {
       console.log("Entire Document has been deleted successfully.")
   })
   .catch(error => {
       console.log(error);
   })

   // Delete the file
   deleteObject(desertRef).then(() => { console.log("File deleted successfully from storage");

    // File deleted successfully
  }).catch((error) => {
     // Uh-oh, an error occurred!
     console.log(error)
   });
}

const handleDeleteFolder =(event,data) =>{
  
  console.log(data.item);

   const db = getFirestore();

   const docRef = doc(db, "folders", data.name);
   
   deleteDoc(docRef)
   .then(() => {
       console.log("Folder has been deleted successfully.")
   })
   .catch(error => {
       console.log(error);
   })
}

export default function Dashboard() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { userprop }= useAuth()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

  return (
    <>
      <Navbar />
      <SearchBar placeholder="Search ..." /> 
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
           <AddFileButton currentFolder={folder} ></AddFileButton> 
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <ContextMenuTrigger id={childFolder.id}>
                <Folder folder={childFolder} />
                </ContextMenuTrigger>
                <ContextMenu id={childFolder.id}>
            <MenuItem className="btn-outline-warning" 
            >
              <FolderRename folderName={childFolder} />
            </MenuItem>
            <MenuItem divider />
            <MenuItem className="btn-outline-danger"
              data={{item:childFolder.url,name:childFolder.id}}
              onClick={handleDeleteFolder}
            >
              Delete
            </MenuItem>
            </ContextMenu>
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <ContextMenuTrigger id={childFile.id}>
                <File file={childFile} />
                </ContextMenuTrigger>
                <ContextMenu id={childFile.id}>
                <a href={childFile.url}>
              <MenuItem className="btn-outline-primary"
              data={{ action: 'Open' }}
            >
              Open
            </MenuItem>
            </a>
            <MenuItem className="btn-outline-warning" 
            >
              <FileRename file={childFile} />
            </MenuItem>
            <MenuItem divider />
            <MenuItem className="btn-outline-danger"
              data={{item:childFile.url,name:childFile.id}}
              onClick={handleDelete}
            >
              Delete
            </MenuItem>
            </ContextMenu>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

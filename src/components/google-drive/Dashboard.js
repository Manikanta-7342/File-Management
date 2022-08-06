import React from "react"
import { Container } from "react-bootstrap"
import { useFolder } from "../../hooks/useFolder"
import AddFolderButton from "./AddFolderButton"
import AddFileButton from "./AddFileButton"
import Folder from "./Folder"
import File from "./File"
import 'font-awesome/css/font-awesome.min.css';

import Navbar from "./Navbar"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import { useParams, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function Dashboard() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { userprop }= useAuth()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

  return (
    <>
      <Navbar />
      
      <Container fluid>
        
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          {userprop!=null && userprop.role=="student" && <AddFileButton currentFolder={folder} >Add File</AddFileButton> }
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
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
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

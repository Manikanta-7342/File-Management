import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import fire from "../../firebase"

export default function FolderRename({ folderName }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(folderName.name)

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (folderName == null) return
    const db = fire.firestore();
        const dataRef=db.collection("folders").doc(folderName.id);
        dataRef.update({name:name});
     setName("")
     closeModal()
  }

  return (
    <>
      <div onClick={openModal} variant="outline-success" size="sm">
        Rename
      </div>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Rename Folder</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder={folderName.name}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

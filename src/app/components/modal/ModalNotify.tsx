import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ModalNotify(props: {
  show: boolean,
  handleClose: any,
  header?: any,
  body?: any,
  footer?: any
}) {
  const { header, body, footer, show, handleClose } = props
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      {
        header && <Modal.Header closeButton>
          {header}
        </Modal.Header>
      }
      {
        body && <Modal.Body>
          {body}
        </Modal.Body>
      }
      {
        footer && <Modal.Footer>
          {footer}
        </Modal.Footer>
      }
    </Modal>
  )
}

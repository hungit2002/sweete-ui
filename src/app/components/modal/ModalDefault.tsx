import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ModalDefault(props: {
  show: boolean,
  handleClose: any,
  header?: any,
  body?: any,
  footer?: any
  size?: "sm" | "lg" | "xl"
}) {
  const { header, body, footer, show, handleClose,size } = props
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size={size}
    >
      {
        header && <Modal.Header closeButton>
          {header}
        </Modal.Header>
      }
      {
        body && <Modal.Body className={"px-0"}>
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

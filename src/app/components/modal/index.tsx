import React from 'react'

export default function ModalNotify(props:{
    header:any,
    body:any,
    footer:any
}) {
    const {header,body,footer} = props
  return (
    <div>
      <div>
        {header}
      </div>
      <div>
        {body}
      </div>
    </div>
  )
}

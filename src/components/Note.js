import React from 'react'
import '../index.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? 'Make not important ' : 'Make important '

  return (
    <tr>
      <td className="columns">{note.shop}</td>
      <td className="columns">{note.product}</td>
      <td className="columns">{note.price}</td>
      <td>
        <button onClick={toggleImportance}>{label}
        </button>
      </td>
      <td>
        <button onClick={deleteNote}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  )
}

export default Note
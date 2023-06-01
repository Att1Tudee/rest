import { useState, useEffect } from 'react'
import Note from './components/Note'
import Footer from './components/Footer'
import { getAll, create, update, removeId } from './services/notes'
import './index.css'
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({
    shop: '',
    product: '',
    price: '',
    important: Math.random() > 0.5,
  })
  const [showAll, setShowAll] = useState(false)
  useEffect(() => {
    console.log('effect')
    getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      shop: newNote.shop,
      product: newNote.product,
      price: newNote.price,
      important: Math.random() > 0.5,
    }
    create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote))
        setNewNote({
          shop: '',
          product: '',
          price: '',
          important: Math.random() > 0.5,
        })
      })
  }
  const handleNoteChange = (event) => {
    const { name, value } = event.target
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }))
  }
  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }
  const deleteNoteFrom = id => {
    console.log('Existence of ' + id + ' needs to be devastated')
    removeId(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  return (
    <div>
      <h1 className='notes_title'>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>{notesToShow.map(note =>
        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} deleteNote={() => deleteNoteFrom(note.id)} />
      )}
      <form onSubmit={addNote}>
        <input className="columns" type="text" name="shop" value={newNote.shop} onChange={handleNoteChange} placeholder="Shop" />
        <input className="columns" type="text" name="product" value={newNote.product} onChange={handleNoteChange} placeholder="Product" />
        <input className="columns" type="text" name="price" value={newNote.price} onChange={handleNoteChange} placeholder="Price" />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}
export default App
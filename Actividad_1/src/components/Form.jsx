import axios from "axios";
import PropTypes from "prop-types";

const baseUrl = "http://localhost:3001/api/notes";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "2px solid #2A4D69",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    maxWidth: "400px",
    margin: "auto",
  },
  input: {
    marginBottom: "10px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
  },
  button: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#2A4D69",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: "#1e4560",
    },
  },
};

export default function Form({ newNote, setNewNote, notes, setNotes }) {
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      date: new Date().toISOString(), // Formato ISO para compatibilidad con SQL
    };

    axios.post(baseUrl, noteObject).then((response) => {
      console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <form onSubmit={addNote} style={styles.form}>
      <input style={styles.input} value={newNote} onChange={handleNoteChange} />
      <button style={styles.button} type="submit">
        Save
      </button>
    </form>
  );
}

Form.propTypes = {
  newNote: PropTypes.string.isRequired,
  setNewNote: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  setNotes: PropTypes.func.isRequired,
};

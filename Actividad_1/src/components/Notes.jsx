import PropTypes from "prop-types";

const styles = {
  list: {
    listStyleType: "none",
    padding: "0",
    margin: "20px auto",
    maxWidth: "600px",
    backgroundColor: "#f0f4f8",
    border: "2px solid #2A4D69",
    borderRadius: "10px",
  },
  listItem: {
    padding: "15px 25px",
    borderBottom: "1px solid #cccccc",
    color: "#333333",
    fontSize: "18px",
    backgroundColor: "white",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#e6eef8",
    },
  },
};

export default function Notes({ notes }) {
  return (
    <ul style={styles.list}>
      {notes.map((note) => (
        <li key={note.id} style={styles.listItem}>
          {note.content}
        </li>
      ))}
    </ul>
  );
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
};

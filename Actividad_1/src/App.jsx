import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import Notes from "./components/Notes";
import Header from "./components/Header";

const baseUrl = "http://localhost:3001/api/notes";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get(baseUrl).then((response) => {
      setNotes(response.data);
    });
  }, []);

  return (
    <div>
      <Header text={"Notes"} />
      <Notes notes={notes} />
      <Form
        newNote={newNote}
        setNewNote={setNewNote}
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  );
};

export default App;

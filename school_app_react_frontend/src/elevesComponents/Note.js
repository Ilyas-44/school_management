import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Note = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eleveResponse = await axios.get(`http://127.0.0.1:8000/api/eleves/${id}`);
        const notesResponse = await axios.get(`http://127.0.0.1:8000/api/notes/etudaint/${id}`);

        const eleveData = eleveResponse.data;
        const notesData = notesResponse.data;

        console.log(notesData)

        // const filteredNotes = notesData.filter((note) => note.eleve_id === eleveData.id);
        setNotes(notesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Notes:</h2>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>Matieres</th>
            <th>Note</th>   
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.matiere_id}</td>
              <td>{note.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Note;

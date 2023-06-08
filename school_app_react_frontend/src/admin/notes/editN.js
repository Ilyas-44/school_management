import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../admin_navbar';


const EditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eleveId, setEleveId] = useState('');
  const [matiereId, setMatiereId] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [matieres, setMatiere] = useState([]);

  const [eleves, setEleve] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/notes/${id}`);
      const { eleve_id, matiere_id, note } = response.data.note;
      setEleveId(eleve_id);
      setMatiereId(matiere_id);
      setNote(note.toString()); // Convert note to a string
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/notes/${id}`, {
        eleve_id: eleveId,
        matiere_id: matiereId,
        note: parseFloat(note) // Parse note as a float
      });
      setMessage(response.data.message);
      navigate('/admin/note');
    } catch (error) {
      setMessage('Failed to update note');
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchMatiere = async () => {
      const { data } = await axios.get('http://127.0.0.1:8000/api/matieres');
      console.log(data);
      setMatiere(data);
    };
    fetchMatiere();
  }, []);


  useEffect(() => {
    const fetchEleve = async () => {
      const { data } = await axios.get('http://127.0.0.1:8000/api/eleves');
      console.log(data);
      setEleve(data);
    };
    fetchEleve();
  }, []);
  return (
    <div className="container bg-dark text-light p-4">
        <Navbar/>
      <h2>Edit Note</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <select
            id="eleveId"
            value={eleveId}
            onChange={(e) => setEleveId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select an Eleve</option>
            {eleves?.map((eleveItem) => (
              <option key={eleveItem.id} value={eleveItem.id}>
                {eleveItem.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <select
            id="matiereId"
            value={matiereId}
            onChange={(e) => setMatiereId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select a Matiere</option>
            {matieres?.map((matieretItem) => (
              <option key={matieretItem.id} value={matieretItem.id}>
                {matieretItem.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Note:
          </label>
          <input
            type="number" // Use type "number" for note input
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditNote;

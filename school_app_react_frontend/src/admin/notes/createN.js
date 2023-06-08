import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../admin_navbar';


const CreateNote = () => {
  const navigate = useNavigate();
  const [eleveId, setEleveId] = useState('');
  const [matiereId, setMatiereId] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [matieres, setMatiere] = useState([]);

  const [eleves, setEleve] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/notes', { eleve_id: eleveId, matiere_id: matiereId, note });
      setMessage(response.data.message);
      navigate('/admin/note');
      setEleveId('');
      setMatiereId('');
      setNote('');
    } catch (error) {
      setMessage('Failed to create note');
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
    <div className="bg-dark text-light p-4">
        <Navbar/>
      <h2>Add Note</h2>
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

        {/* <div className="mb-3">
          <label htmlFor="eleveId" className="form-label">
            Eleve ID:
          </label>
          <input type="text" id="eleveId" className="form-control" value={eleveId} onChange={(e) => setEleveId(e.target.value)} required />
        </div> */}
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
        {/* <div className="mb-3">
          <label htmlFor="matiereId" className="form-label">
            Matiere ID:
          </label>
          <input type="text" id="matiereId" className="form-control" value={matiereId} onChange={(e) => setMatiereId(e.target.value)} required />
        </div> */}
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Note:
          </label>
          <input type="number" id="note" className="form-control" value={note} onChange={(e) => setNote(e.target.value)} required min={0} max={20} />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;

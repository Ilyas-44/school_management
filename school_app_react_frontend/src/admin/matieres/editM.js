import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../admin_navbar';


const EditMatiere = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [enseignantId, setEnseignantId] = useState('');
  const [message, setMessage] = useState('');
  const [enseignants, setEnseignants] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/matieres/${id}`);
      const { nom, enseignant_id } = response.data.matiere;
      setNom(nom);
      setEnseignantId(enseignant_id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/matieres/${id}`, { nom, enseignant_id: enseignantId });
      setMessage(response.data.message);
      navigate('/admin/matiere');
    } catch (error) {
      setMessage('Failed to update matiere');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchEnseignants = async () => {
      const { data } = await axios.get('http://127.0.0.1:8000/api/enseignants');
      console.log(data);
      setEnseignants(data);
    };
    fetchEnseignants();
  }, []);
  return (
    <div className="container bg-dark text-light p-4">
        <Navbar/>
      <h2>Edit Matiere</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <select
            id="enseignantId"
            value={enseignantId}
            onChange={(e) => setEnseignantId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select a enseignant</option>
            {enseignants?.map((enseignantItem) => (
              <option key={enseignantItem.id} value={enseignantItem.id}>
                {enseignantItem.nom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Matiere
        </button>
      </form>
    </div>
  );
};

export default EditMatiere;

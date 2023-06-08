import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../admin_navbar';


const EditClasse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [niveau, setNiveau] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/classes/${id}`);
      const { nom, niveau } = response.data.classe;
      setNom(nom);
      setNiveau(niveau);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/classes/${id}`, { nom, niveau });
      setMessage(response.data.message);
      navigate('/admin/classe');
    } catch (error) {
      setMessage('Failed to update class');
      console.error(error);
    }
  };

  return (
    <div className="container bg-dark text-light p-4">
      <Navbar/>
      <h2>Edit Class</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="niveau" className="form-label">
            Niveau:
          </label>
          <input type="text" id="niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Class
        </button>
      </form>
    </div>
  );
};

export default EditClasse;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../admin_navbar';

const CreateClasse = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [niveau, setNiveau] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/classes', { nom, niveau });
      setMessage(response.data.message);
      navigate('/admin/classe');
      setNom('');
      setNiveau('');
    } catch (error) {
      setMessage('Failed to create class');
      console.error(error);
    }
  };

  return (
    <div className="bg-dark text-light p-4">
<Navbar/>
      <h2>Add Class</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input type="text" id="nom" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="niveau" className="form-label">
            Niveau:
          </label>
          <input type="text" id="niveau" className="form-control" value={niveau} onChange={(e) => setNiveau(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Class</button>
      </form>
    </div>
  );
};

export default CreateClasse;

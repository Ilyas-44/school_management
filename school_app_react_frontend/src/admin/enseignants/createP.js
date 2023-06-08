import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../admin_navbar';


const CreateEnseignant = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/enseignants', {
        nom,
        prenom,
        date_de_naissance: dateNaissance,
        adresse,
        email,
        telephone,
        password,
      });
      setMessage(response.data.message);
      navigate('/admin/enseignant');
      setNom('');
      setPrenom('');
      setDateNaissance('');
      setAdresse('');
      setEmail('');
      setPassword('');
      setTelephone('');
    } catch (error) {
      setMessage('Failed to create enseignant');
      console.error(error);
    }
  };

  return (
    <div className="bg-dark text-light p-4">
    <Navbar/>
      <h2>Add Enseignant</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input type="text" id="nom" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prénom:
          </label>
          <input type="text" id="prenom" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="dateNaissance" className="form-label">
            Date de Naissance:
          </label>
          <input type="date" id="dateNaissance" className="form-control" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="adresse" className="form-label">
            Adresse:
          </label>
          <input type="text" id="adresse" className="form-control" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">
            Téléphone:
          </label>
          <input type="text" id="telephone" className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Enseignant</button>
      </form>
    </div>
  );
};

export default CreateEnseignant

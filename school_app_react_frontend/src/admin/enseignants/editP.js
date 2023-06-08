import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../admin_navbar';


const EditEnseignant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const [telephone, setTelephone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/enseignants/${id}`);
      const { nom, prenom, date_de_naissance, adresse, email, password, telephone } = response.data.enseignant;
      setNom(nom);
      setPrenom(prenom);
      setDateNaissance(date_de_naissance);
      setAdresse(adresse);
      setEmail(email);
      setPassword(password);
      setTelephone(telephone);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/enseignants/${id}`, {
        nom,
        prenom,
        date_de_naissance: dateNaissance,
        adresse,
        email,
        password,
        telephone
      });
      setMessage(response.data.message);
      navigate('/admin/enseignant');
    } catch (error) {
      setMessage('Failed to update enseignant');
      console.error(error);
    }
  };

  return (
    <div className="container bg-dark text-light p-4">
      <Navbar/>
      <h2>Edit Enseignant</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prénom:
          </label>
          <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="dateNaissance" className="form-label">
            Date de Naissance:
          </label>
          <input type="date" id="dateNaissance" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="adresse" className="form-label">
            Adresse:
          </label>
          <input type="text" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">
            Téléphone:
          </label>
          <input type="text" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Enseignant
        </button>
      </form>
    </div>
  );
};

export default EditEnseignant;

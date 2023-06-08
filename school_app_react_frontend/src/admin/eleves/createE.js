import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../admin_navbar';

const CreateEleve = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [classeId, setClasseId] = useState('');
  const [password, setPassword] = useState('');
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eleve = {
      nom,
      prenom,
      date_de_naissance: dateNaissance,
      adresse,
      email,
      telephone,
      classe_id: classeId,
      password, // Add the password field
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/eleves', {
        ...eleve,
        password,
      });
      setMessage(response.data.message);

      setNom('');
      setPrenom('');
      setDateNaissance('');
      setAdresse('');
      setEmail('');
      setTelephone('');
      setClasseId('');
      setPassword('');
      navigate('/admin/eleve');
    } catch (error) {
      setMessage('Failed to create eleve');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      const { data } = await axios.get('http://127.0.0.1:8000/api/classes');
      console.log(data);
      setClasses(data);
    };
    fetchClasses();
  }, []);

  return (
    <div className="bg-dark text-light p-4">
      <Navbar />
      <h2>Add Eleve</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input
            type="text"
            id="nom"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prénom:
          </label>
          <input
            type="text"
            id="prenom"
            className="form-control"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateNaissance" className="form-label">
            Date de Naissance:
          </label>
          <input
            type="date"
            id="dateNaissance"
            className="form-control"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="adresse" className="form-label">
            Adresse:
          </label>
          <input
            type="text"
            id="adresse"
            className="form-control"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">
            Téléphone:
          </label>
          <input
            type="number"
            id="telephone"
            className="form-control"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <select
            id="classeId"
            value={classeId}
            onChange={(e) => setClasseId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select a class</option>
            {classes?.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.nom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Eleve
        </button>
      </form>
    </div>
  );
};

export default CreateEleve;

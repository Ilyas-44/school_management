import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../admin_navbar';

const EditEleve = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [classes, setClasses] = useState([]);
  const [classeId, setClasseId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/eleves/${id}`);
      const eleve = response.data.eleve;
      setNom(eleve.nom);
      setPrenom(eleve.prenom);
      setDateNaissance(eleve.date_de_naissance);
      setAdresse(eleve.adresse);
      setEmail(eleve.email);
      setTelephone(eleve.telephone);
      setClasseId(eleve.classe_id);
      setPassword(eleve.password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/eleves/${id}`,
        {
          nom,
          prenom,
          date_de_naissance: dateNaissance,
          adresse,
          email,
          telephone,
          classe_id: classeId,
          password, 
        }
      );
      setMessage(response.data.message);
      navigate('/admin/eleve');
    } catch (error) {
      setMessage('Failed to update eleve');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/classes');
        setClasses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="container bg-dark text-light p-4">
      <Navbar />
      <h2>Edit Eleve</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="form-control"
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
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="form-control"
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
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="adresse" className="form-label">
            Adresse:
          </label>
          <input
            type="text"
            id="adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="form-control"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
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
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
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
                {classItem.n}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Eleve
        </button>
      </form>
    </div>
  );
};

export default EditEleve;

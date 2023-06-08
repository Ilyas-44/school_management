import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ProfListEleve = () => {
  const [eleves, setEleves] = useState([]);
  const [message, setMessage] = useState('');
  const [classes, setClasses] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/eleves');
      setEleves(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEleve = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/eleves/${id}`);
      setMessage(response.data.message);
      fetchData();
    } catch (error) {
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
    <div>
      <h2>Tous les Eleves D'ecolle : </h2>
     

      {message && <p>{message}</p>}

      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date de Naissance</th>
            <th>Adresse</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Classe (ID)</th>
            <th>Password</th>
            
          </tr>
        </thead>
        <tbody>
          {eleves.map((eleve) => (
            <tr key={eleve.id}>
              <td>{eleve.id}</td>
              <td>{eleve.nom}</td>
              <td>{eleve.prenom}</td>
              <td>{eleve.date_de_naissance}</td>
              <td>{eleve.adresse}</td>
              <td>{eleve.email}</td>
              <td>{eleve.telephone}</td>
              <td>
  {classes.map((classItem) =>
    classItem.id === eleve.classe_id ? (
      <span key={classItem.id}>
        {classItem.nom} ({classItem.id})
      </span>
    ) : null
  )}
</td>

              <td>{eleve.password}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfListEleve;

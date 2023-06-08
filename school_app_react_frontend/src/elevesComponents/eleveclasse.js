import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Classe = () => {
  const { id } = useParams();
  const [eleves, setEleves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`http://127.0.0.1:8000/api/eleve/classe/${id}`)
        setEleves(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Students in Class {id}:</h2>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {eleves.map((eleve) => (
            <tr key={eleve.id}>
              <td>{eleve.id}</td>
              <td>{eleve.nom} {eleve.prenom}</td>
              <td>{eleve.date_de_naissance}</td>
              <td>{eleve.adresse}</td>
              <td>{eleve.email}</td>
              <td>{eleve.telephone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classe;

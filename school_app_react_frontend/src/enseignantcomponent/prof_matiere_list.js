import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfListMatiere = () => {


  const { id } = useParams();

  const [matieres, setMatieres] = useState([]);
  const [enseignants, setEnseignants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

//   console.log(id) 

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/enseignant/Matiere_List/${id}`);
      setMatieres(response.data);
    } catch (error) {
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
    <div>
      <h2>Matieres</h2>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Enseignant (ID)</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map((matiere) => (
            <tr key={matiere.id}>
              <td>{matiere.id}</td>
              <td>{matiere.nom}</td>
              <td>{enseignants.map((enseignantItem) =>
                  enseignantItem.id === matiere.enseignant_id ? (
                    <span key={enseignantItem.id}>
                      {enseignantItem.nom} ({enseignantItem.id})
                    </span>
                  ) : null
                )}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfListMatiere;

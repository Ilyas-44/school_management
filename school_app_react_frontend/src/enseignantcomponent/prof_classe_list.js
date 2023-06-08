import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProfListClasse = () => {
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClasse = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/classes/${id}`);
      setMessage(response.data.message);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Classes</h2>
    

      {message && <p>{message}</p>}

      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Niveau</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classe) => (
            <tr key={classe.id}>
              <td>{classe.id}</td>
              <td>{classe.nom}</td>
              <td>{classe.niveau}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfListClasse;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EleveDetailsPage = () => {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [classeId, setClasseId] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [classes, setClasses] = useState([]);
  const [eleve, setEleve] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eleveResponse, notesResponse, matieresResponse, classesResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/eleves/${id}`),
          axios.get('http://127.0.0.1:8000/api/notes'),
          axios.get('http://127.0.0.1:8000/api/matieres'),
          axios.get('http://127.0.0.1:8000/api/classes')
        ]);

        const eleveData = eleveResponse.data.eleve;
        const notesData = notesResponse.data;

        setEleve(eleveData);
        setNom(eleveData.nom);
        setPrenom(eleveData.prenom);
        setDateNaissance(eleveData.date_de_naissance);
        setAdresse(eleveData.adresse);
        setEmail(eleveData.email);
        setTelephone(eleveData.telephone);
        setClasseId(eleveData.classe_id);
        setPassword(eleveData.password);
        setNotes(notesData);
        setMatieres(matieresResponse.data);
        setClasses(classesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
          <Link to={`/eleve/classe/${id}`} className="btn btn-dark mr-2">
          check my classe

                </Link>
                &nbsp;
                <Link to={`/elevenote/${id}`} className="btn btn-dark mr-2">
          check my Notes
                </Link>
      
      <h2>Personnel informations : </h2>

      {eleve ? (
        <table className="table table-dark">
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>Nom:</td>
              <td>{nom}</td>
            </tr>
            <tr>
              <td>Prénom:</td>
              <td>{prenom}</td>
            </tr>
            <tr>
              <td>Date de Naissance:</td>
              <td>{dateNaissance}</td>
            </tr>
            <tr>
              <td>Adresse:</td>
              <td>{adresse}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Téléphone:</td>
              <td>{telephone}</td>
            </tr>
            <tr>
              <td>Classe (ID):</td>
              <td>
                {classes.map((classItem) =>
                  classItem.id === classeId ? (
                    <span key={classItem.id}>{classItem.nom}</span>
                  ) : null
                )}
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>{password}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading eleve details...</p>
      )}

     
    </div>
  );
};

export default EleveDetailsPage;

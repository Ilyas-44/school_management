import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../admin/styles.css'; 


import 'bootstrap/dist/css/bootstrap.css';

const ProfHome = () => {
  const [eleves, setEleves] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [elevesResponse, enseignantsResponse, matieresResponse, classesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/eleves'),
          axios.get('http://127.0.0.1:8000/api/enseignants'),
          axios.get('http://127.0.0.1:8000/api/matieres'),
          axios.get('http://127.0.0.1:8000/api/classes')
        ]);

        setEleves(elevesResponse.data);
        setEnseignants(enseignantsResponse.data);
        setMatieres(matieresResponse.data);
        setClasses(classesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6"> 
            <div className="card mb-4 bg-danger">
              <div className="card-body card-hover-zoom">
              <a href='/enseignant/Eleve_List'>  <h2 className="card-title text-black">Eleves :</h2></a>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th className="">Nom</th>
                      <th className="">Prenom</th>
                      <th className="">Classe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eleves.map((eleve) => (
                      <tr key={eleve.id}>
                        <td>{eleve.nom}</td>
                        <td>{eleve.prenom}</td>
                        <td>
                          {classes.map((classItem) =>
                            classItem.id === eleve.classe_id ? (
                              <span key={classItem.id}>{classItem.nom}</span>
                            ) : null
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
         
          <div className="col-md-6">
            <div className="card mb-4 bg-danger">
              <div className="card-body card-hover-zoom">
              <a href='/admin/enseignant'>  <h2 className="card-title text-black">Enseignants :</h2> </a>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th className="">Nom</th>
                      <th className="">Prenom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enseignants.map((enseignant) => (
                      <tr key={enseignant.id}>
                        <td>{enseignant.nom}</td>
                        <td>{enseignant.prenom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4 bg-danger">
              <div className="card-body card-hover-zoom">
              <a href='/enseignant/Classe_List'>  <h2 className="card-title text-black">Classes</h2> </a>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th className="">Classe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((classe) => (
                      <tr key={classe.id}>
                        <td>{classe.nom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
              
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4 bg-danger">
              <div className="card-body card-hover-zoom">
               <a href='/enseignant/Matiere_List/:id'> <h2 className="card-title text-black">Matieres</h2></a>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th className="">Matiere</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matieres.map((matiere) => (
                      <tr key={matiere.id}>
                        <td>{matiere.nom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfHome;

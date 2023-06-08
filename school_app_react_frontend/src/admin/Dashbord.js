import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './admin_navbar';

const Dashboard = () => {
  const [eleves, setEleves] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const elevesResponse = await axios.get('http://127.0.0.1:8000/api/eleves');
        const enseignantsResponse = await axios.get('http://127.0.0.1:8000/api/enseignants');
        const matieresResponse = await axios.get('http://127.0.0.1:8000/api/matieres');
        const classesResponse = await axios.get('http://127.0.0.1:8000/api/classes');

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
    <div className="wrapper">
      {/* <nav className="main-header navbar navbar-expand navbar-dark bg-dark">
        <a href="#" className="brand-link">
          <span className="brand-text font-weight-light">My Dashboard</span>
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
        </ul>
      </nav> */}
      <Navbar/>

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
             <center> <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              </center>
              
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <a className="nav-link" href="/admin/eleve">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Eleves ({eleves.length})</h3>
                    </div>
                    <div className="card-body">
                      <ul>
                        {eleves.map(eleve => (
                          <li key={eleve.id}>{eleve.nom}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-6">
                <a className="nav-link" href="/admin/enseignant">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Enseignants ({enseignants.length})</h3>
                    </div>
                    <div className="card-body">
                      <ul>
                        {enseignants.map(enseignant => (
                          <li key={enseignant.id}>{enseignant.nom}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <a className="nav-link" href="/admin/matiere">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Matieres ({matieres.length})</h3>
                    </div>
                    <div className="card-body">
                      <ul>
                        {matieres.map(matiere => (
                          <li key={matiere.id}>{matiere.nom}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-6">
                <a className="nav-link" href="/admin/classe">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Classes ({classes.length})</h3>
                    </div>
                    <div className="card-body">
                      <ul>
                        {classes.map(classe => (
                          <li key={classe.id}>{classe.nom}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../admin_navbar';

const ListEleve = () => {
  const [eleves, setEleves] = useState([]);
  const [message, setMessage] = useState('');
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEleves = eleves.filter(
    (eleve) =>
      eleve.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eleve.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEleves.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEleves.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center' }}>Eleves</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="searchInput" style={{ marginRight: '8px' }}>
            Search:
          </label>
          <input
            type="text"
            id="searchInput"
            placeholder="Search by nom or prenom"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link to="/admin/eleve/create" className="btn btn-primary mt-2">
          New Eleve
        </Link>

        {message && <p>{message}</p>}

        <br></br>

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((eleve) => (
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
                <td>
                  <Link to={`/admin/eleve/edit/${eleve.id}`} className="btn btn-primary mr-2">
                    Edit
                  </Link>
                  <button onClick={() => deleteEleve(eleve.id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav style={{ marginTop: '1rem' }}>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ListEleve;

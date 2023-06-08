import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../admin_navbar';

const ListMatiere = () => {
  const [matieres, setMatieres] = useState([]);
  const [message, setMessage] = useState('');
  const [enseignants, setEnseignants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    fetchData();
    fetchEnseignants();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/matieres');
      setMatieres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMatiere = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/matieres/${id}`);
      setMessage(response.data.message);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnseignants = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/enseignants');
      setEnseignants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMatieres = matieres.filter((matiere) =>
    matiere.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMatieres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMatieres.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <h2>Matieres</h2>

      <Link to="/admin/matiere/create" className="btn btn-primary mr-2">
        Add Matiere
      </Link>

      {message && <p>{message}</p>}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="searchInput" style={{ marginRight: '8px' }}>
          Search:
        </label>
        <input
          type="text"
          id="searchInput"
          placeholder="Search by nom"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Enseignant (ID)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((matiere) => (
            <tr key={matiere.id}>
              <td>{matiere.id}</td>
              <td>{matiere.nom}</td>
              <td>
                {enseignants.map(
                  (enseignantItem) =>
                    enseignantItem.id === matiere.enseignant_id && (
                      <span key={enseignantItem.id}>
                        {enseignantItem.nom} ({enseignantItem.id})
                      </span>
                    )
                )}
              </td>
              <td>
                <Link to={`/admin/matiere/edit/${matiere.id}`} className="btn btn-primary mr-2">
                  Edit
                </Link>
                <button onClick={() => deleteMatiere(matiere.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Pagination">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ListMatiere;

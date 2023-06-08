import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../admin_navbar';

const ListEnseignant = () => {
  const [enseignants, setEnseignants] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/enseignants');
      setEnseignants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEnseignant = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/enseignants/${id}`);
      setMessage(response.data.message);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEnseignants = enseignants.filter(
    (enseignant) =>
      enseignant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enseignant.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnseignants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnseignants.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <h2>Enseignants</h2>
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
      <br></br>
      <Link to="/admin/enseignant/create" className="btn btn-primary mr-2">
        New Enseignant
      </Link>

      {message && <p>{message}</p>}
<br></br>
<br></br>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((enseignant) => (
            <tr key={enseignant.id}>
              <td>{enseignant.id}</td>
              <td>{enseignant.nom}</td>
              <td>{enseignant.prenom}</td>
              <td>{enseignant.password}</td>
              <td>
                <Link to={`/admin/enseignant/edit/${enseignant.id}`} className="btn btn-primary mr-2">
                  Edit
                </Link>
                <button onClick={() => deleteEnseignant(enseignant.id)} className="btn btn-danger">
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
  );
};

export default ListEnseignant;

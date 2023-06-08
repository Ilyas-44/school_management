import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../admin_navbar';

const ListClasse = () => {
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClasses = classes.filter((classe) => classe.nom.toLowerCase().includes(searchTerm.toLowerCase()));

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClasses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <h2>Classes</h2>
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
      <Link to={`/admin/classe/create`} className="btn btn-primary mr-2">
        Add Classe
      </Link>

      {message && <p>{message}</p>}

      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Niveau</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((classe) => (
            <tr key={classe.id}>
              <td>{classe.id}</td>
              <td>{classe.nom}</td>
              <td>{classe.niveau}</td>
              <td>
                <Link to={`/admin/classe/edit/${classe.id}`} className="btn btn-primary mr-2">
                  Edit
                </Link>
                <button onClick={() => deleteClasse(classe.id)} className="btn btn-danger">
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

export default ListClasse;

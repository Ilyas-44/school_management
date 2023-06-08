import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../admin_navbar';

const ListNote = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');
  const [matieres, setMatiere] = useState([]);
  const [eleves, setEleve] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    fetchData();
    fetchMatiere();
    fetchEleve();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/notes/${id}`);
      setMessage(response.data.message);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMatiere = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/matieres');
      setMatiere(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEleve = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/eleves');
      setEleve(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.note.toString().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <h2>Notes</h2>
      <Link to="/note/create" className="btn btn-primary mr-2">
        Add Note
      </Link>

      {message && <p>{message}</p>}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="searchInput" style={{ marginRight: '8px' }}>
          Search:
        </label>
        <input
          type="text"
          id="searchInput"
          placeholder="Search by note"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Note</th>
            <th>Eleve (ID)</th>
            <th>Matiere (ID)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.note}</td>
              <td>
                {eleves.map((eleveItem) =>
                  eleveItem.id === note.eleve_id ? (
                    <span key={eleveItem.id}>
                      {eleveItem.nom} ({eleveItem.id})
                    </span>
                  ) : null
                )}
              </td>
              <td>
                {matieres.map((matiereItem) =>
                  matiereItem.id === note.matiere_id ? (
                    <span key={matiereItem.id}>
                      {matiereItem.nom} ({matiereItem.id})
                    </span>
                  ) : null
                )}
              </td>
              <td>
                <Link to={`/admin/note/edit/${note.id}`} className="btn btn-primary mr-2">
                  Edit
                </Link>
                <button onClick={() => deleteNote(note.id)} className="btn btn-danger">
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

export default ListNote;

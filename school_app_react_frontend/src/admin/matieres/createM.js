import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../admin_navbar';


const CreateMatiere = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [enseignantId, setEnseignantId] = useState('');
  const [message, setMessage] = useState('');
  const [enseignants, setEnseignants] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/matieres', { nom, enseignant_id: enseignantId });
      setMessage(response.data.message);
      navigate('/admin/matiere');
      setNom('');
      setEnseignantId('');
    } catch (error) {
      setMessage('Failed to create matiere');
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
    <div className="bg-dark text-light p-4">
        <Navbar/>
      <h2>Add Matiere</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom:
          </label>
          <input type="text" id="nom" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div className="mb-3">
          <select
            id="enseignantId"
            value={enseignantId}
            onChange={(e) => setEnseignantId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select a enseignant</option>
            {enseignants?.map((enseignantItem) => (
              <option key={enseignantItem.id} value={enseignantItem.id}>
                {enseignantItem.nom}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="mb-3">
          <label htmlFor="enseignantId" className="form-label">
            Enseignant ID:
          </label>
          <input type="text" id="enseignantId" className="form-control" value={enseignantId} onChange={(e) => setEnseignantId(e.target.value)} required />
        </div> */}
        <button type="submit" className="btn btn-primary">Add Matiere</button>
      </form>
    </div>
  );
};

export default CreateMatiere;

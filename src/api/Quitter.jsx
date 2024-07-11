import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quitter = () => {
  const [quitters, setQuitters] = useState([]);
  const [newQuitter, setNewQuitter] = useState({
    empName: '',
    quitLeavingDate: ''
  });

  useEffect(() => {
    fetchQuitters();
  }, []);

  const fetchQuitters = async () => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get('http://localhost:9000/api/v1/intrabucks/quitter/select', { // 포트 번호 9000 명시,
        headers: {
          'Authorization': token
      }
      });
      setQuitters(response.data.content);
    } catch (error) {
      console.error('Error fetching quitters:', error);
    }
  };

  const createQuitter = async () => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.post('http://localhost:9000/api/v1/intrabucks/quitter/create', { // 포트 번호 9000 명시,
        headers: {
          'Authorization': token
      }
      });
      alert(`Quitter created with ID: ${response.data}`);
      fetchQuitters();
    } catch (error) {
      console.error('Error creating quitter:', error);
    }
  };

  const deleteQuitter = async (quitId) => {
    try {
      const token = sessionStorage.getItem('jwt');
      await axios.delete(`http://localhost:9000/api/v1/intrabucks/quitter/delete/${quitId}`, { // 포트 번호 9000 명시,
        headers: {
          'Authorization': token
      }
      });
      alert('Quitter deleted');
      fetchQuitters();
    } catch (error) {
      console.error('Error deleting quitter:', error);
    }
  };

  return (
    <div>
      <h1>Quitter Management</h1>
      <div>
        <h2>Create Quitter</h2>
        <input
          type="text"
          placeholder="Name"
          value={newQuitter.empName}
          onChange={(e) => setNewQuitter({ ...newQuitter, empName: e.target.value })}
        />
        <input
          type="date"
          value={newQuitter.quitLeavingDate}
          onChange={(e) => setNewQuitter({ ...newQuitter, quitLeavingDate: e.target.value })}
        />
        <button onClick={createQuitter}>Create</button>
      </div>
      <div>
        <h2>Quitters</h2>
        <ul>
          {quitters.map((quitter) => (
            <li key={quitter.quitId}>
              {quitter.empName} ({quitter.quitLeavingDate})
              <button onClick={() => deleteQuitter(quitter.quitId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quitter;

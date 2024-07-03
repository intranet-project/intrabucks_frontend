import React, { useState } from 'react';
import axios from 'axios';

const Department = () => {
  const [department, setDepartment] = useState({});
  const [newDepartment, setNewDepartment] = useState({ deptName: '' });

  const createDepartment = async () => {
    try {
      const response = await axios.post('/api/department/create', newDepartment);
      alert(`Department created with ID: ${response.data}`);
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  return (
    <div>
      <h1>Department Management</h1>
      <div>
        <h2>Create Department</h2>
        <input
          type="text"
          placeholder="Name"
          value={newDepartment.deptName}
          onChange={(e) => setNewDepartment({ ...newDepartment, deptName: e.target.value })}
        />
        <button onClick={createDepartment}>Create</button>
      </div>
      <div>
        <h2>Edit Department</h2>
        <input
          type="text"
          placeholder="Name"
          value={department.deptName}
          onChange={(e) => setDepartment({ ...department, deptName: e.target.value })}
        />
      </div>
    </div>
  );
};

export default Department;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({});
  const [newEmployee, setNewEmployee] = useState({ empName: '', empJoinDate: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/intrabucks/employee/select'); // 포트 번호 9000 명시
      setEmployees(response.data.content);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchEmployeeById = async (empId) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/employee/${empId}`); // 포트 번호 9000 명시
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const createEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/v1/intrabucks/employee/create', newEmployee); // 포트 번호 9000 명시
      alert(`Employee created with ID: ${response.data}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const updateEmployee = async (empId) => {
    try {
      await axios.put(`http://localhost:9000/api/v1/intrabucks/employee/update/${empId}`, employee); // 포트 번호 9000 명시
      alert('Employee updated');
      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const deleteEmployee = async (empId) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/intrabucks/employee/delete/${empId}`); // 포트 번호 9000 명시
      alert('Employee deleted');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <div>
        <h2>Create Employee</h2>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.empName}
          onChange={(e) => setNewEmployee({ ...newEmployee, empName: e.target.value })}
        />
        <input
          type="date"
          value={newEmployee.empJoinDate}
          onChange={(e) => setNewEmployee({ ...newEmployee, empJoinDate: e.target.value })}
        />
        <button onClick={createEmployee}>Create</button>
      </div>
      <div>
        <h2>Employees</h2>
        <ul>
          {employees.map((emp) => (
            <li key={emp.empId}>
              {emp.empName} ({emp.empJoinDate})
              <button onClick={() => fetchEmployeeById(emp.empId)}>Edit</button>
              <button onClick={() => deleteEmployee(emp.empId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {employee.empId && (
        <div>
          <h2>Edit Employee</h2>
          <input
            type="text"
            value={employee.empName}
            onChange={(e) => setEmployee({ ...employee, empName: e.target.value })}
          />
          <input
            type="date"
            value={employee.empJoinDate}
            onChange={(e) => setEmployee({ ...employee, empJoinDate: e.target.value })}
          />
          <button onClick={() => updateEmployee(employee.empId)}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Employee;

// EmployeeList.js
import React, { useContext } from 'react';
import { EmployeeContext } from '../Context/EmployeeContext';
import styles from '../assets/styles/EmployeeList.module.css';
import ActionArea from './ActionArea';
import EmployeeTable from './EmployeeTable';

const EmployeeList = () => {
  const {
    employees,
    loading,
    error,
  } = useContext(EmployeeContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.employeeList}>
      <h1 className={styles.heading}>Employee List</h1>

      <ActionArea />

      {employees.length > 0 ? (
        <EmployeeTable />
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;

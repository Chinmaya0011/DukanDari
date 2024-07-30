import React, { useContext, useState } from 'react';
import styles from '../assets/styles/EmployeeListTable.module.css';
import { FaEdit, FaEye, FaEnvelope, FaWhatsapp, FaPhone, FaCreditCard, FaChartLine, FaTrashAlt } from 'react-icons/fa';
import EmployeeModal from './EmployeeModal';
import { EmployeeContext } from '../Context/EmployeeContext';

const EmployeeTable = () => {
  const { employees, handleEmail, handleWhatsapp, handleCall, handlePayment} = useContext(EmployeeContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Position</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.gender}</td>
              <td>{employee.position}</td>
              <td>{employee.address}</td>
              <td className={styles.actions}>
                <button
                  onClick={() => handleView(employee)}
                  className={`${styles.actionButton} ${styles.viewButton}`}
                  title="View Details"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEmail(employee.email)}
                  className={`${styles.actionButton} ${styles.emailButton}`}
                  title="Send Email"
                >
                  <FaEnvelope />
                </button>
                <button
                  onClick={() => handleWhatsapp(employee.mobile)}
                  className={`${styles.actionButton} ${styles.whatsappButton}`}
                  title="Send WhatsApp"
                >
                  <FaWhatsapp />
                </button>
                <button
                  onClick={() => handleCall(employee.mobile)}
                  className={`${styles.actionButton} ${styles.callButton}`}
                  title="Make Call"
                >
                  <FaPhone />
                </button>
                <button
                  onClick={() => handlePayment(employee._id)}
                  className={`${styles.actionButton} ${styles.paymentButton}`}
                  title="Process Payment"
                >
                  <FaCreditCard />
                </button>
                <button
                  onClick={() => {/* Handle analysis click here */}}
                  className={`${styles.actionButton} ${styles.analysisButton}`}
                  title="Analyze Data"
                >
                  <FaChartLine />
                </button>
              
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEmployee && (
        <EmployeeModal employee={selectedEmployee} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default EmployeeTable;

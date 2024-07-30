import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaTransgender, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import styles from '../assets/styles/EmployeeRegistration.module.css';

const EmployeeRegistration = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    position: '',
    address: '',
    startDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/employees/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get the error message
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Employee registered:', data);
      setEmployee({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        position: '',
        address: '',
        startDate: '',
      });
    } catch (error) {
      console.error('Error registering employee:', error);
    }
  };
  

  return (
    <div className={styles.registration}>
      <h1 className={styles.heading}>Employee Registration</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}><FaUser className={styles.icon}/> Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}><FaEnvelope className={styles.icon}/> Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}><FaPhone className={styles.icon}/> Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}><FaTransgender className={styles.icon}/> Gender:</label>
          <select name="gender" value={employee.gender} onChange={handleChange} required className={styles.select}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}><FaBriefcase className={styles.icon}/> Position:</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}><FaMapMarkerAlt className={styles.icon}/> Address:</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}><FaCalendarAlt className={styles.icon}/> Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={employee.startDate}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {success && <p className={styles.success}>{success}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default EmployeeRegistration;

// ActionArea.js
import React, { useContext } from 'react';
import { FaPlus, FaPrint, FaDownload, FaUsers, FaSearch, FaSyncAlt, FaCalculator, FaBullhorn, FaBell, FaUserCircle } from 'react-icons/fa';
import styles from '../assets/styles/ActionArea.module.css';
import Calculator from './Calculator';
import Modal from './Modal';
import { EmployeeContext } from '../Context/EmployeeContext'; // Ensure the correct path to EmployeeContext

const ActionArea = () => {
  const {
    employees,
    handleAdd,
    handlePrint,
    handleDownload,
    handleRefresh,
    showCalculator,
    handleOpenCalculator,
    handleCloseCalculator,
    isRefresh,
  } = useContext(EmployeeContext);

  return (
    <div className={styles.actionArea}>
      <button 
        onClick={handleAdd} 
        className={`${styles.actionButton} ${styles.addButton}`}
        title="Add New"
      >
        <FaPlus />
      </button>
      <button 
        onClick={handlePrint} 
        className={`${styles.actionButton} ${styles.printButton}`}
        title="Print"
      >
        <FaPrint />
      </button>
      <button 
        onClick={handleDownload} 
        className={`${styles.actionButton} ${styles.downloadButton}`}
        title="Download"
      >
        <FaDownload />
      </button>
      <button 
        className={`${styles.actionButton} ${styles.countButton}`}
        title="Total Employees"
      >
        <FaUsers />
        <span className={styles.count}>{employees.length}</span>
      </button>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search..." 
          className={styles.searchInput}
          title="Search Employees"
        />
      </div>
      <div className={styles.filterContainer}>
        <select className={styles.filterSelect} title="Filter by Gender">
          <option value="">Filter by Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button 
          className={`${styles.actionButton} ${styles.refreshButton}`} 
          onClick={handleRefresh}
          title="Refresh"
        >
          <FaSyncAlt className={`${styles.refresh} ${isRefresh ? styles.clicked : ''}`} />
        </button>
        <button 
          className={`${styles.actionButton} ${styles.calculatorButton}`} 
          onClick={handleOpenCalculator}
          title="Open Calculator"
        >
          <FaCalculator />
        </button>
        {showCalculator && (
          <Modal onClose={handleCloseCalculator}>
            <Calculator />
          </Modal>
        )}
        <button 
          className={`${styles.actionButton} ${styles.campaignButton}`}
          title="Campaign"
        >
          <FaBullhorn />
        </button>
        <button 
          className={`${styles.actionButton} ${styles.notificationButton}`}
          title="Notifications"
        >
          <FaBell />
        </button>
        <button 
          className={`${styles.actionButton} ${styles.accountButton}`}
          title="Account"
        >
          <FaUserCircle />
        </button>
      </div>
    </div>
  );
};

export default ActionArea;

import React, { createContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  // Fetch employees from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees'); // Ensure this URL is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Sync employees with local storage
  useEffect(() => {
    // Load employees from local storage
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees) {
      setEmployees(storedEmployees);
    }
  }, []);

  // Persist employees to local storage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleUpdate = async (id, updatedEmployee) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEmployees(employees.map((emp) => (emp._id === id ? data : emp)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleView = (id) => {
    // Handle view logic here
    console.log('View employee with ID:', id);
  };

  const handleAdd = () => {
    // Redirect to registration page
    navigate('/Register');
  };

  const handlePrint = () => {
    // Handle print logic here
    console.log('Print employee list');
  };

  const handleDownload = () => {
    // Handle download logic here
    console.log('Download employee list');
  };

  const handleEmail = (email) => {
    // Handle send email logic
    window.location.href = `mailto:${email}`;
  };

  const handleWhatsapp = (phone) => {
    // Handle send WhatsApp message logic
    const encodedPhone = encodeURIComponent(phone);
    window.location.href = `https://wa.me/${encodedPhone}`;
  };

  const handleCall = (phone) => {
    // Handle call logic
    window.location.href = `tel:${phone}`;
  };

  const handleOpenCalculator = () => {
    setShowCalculator(true);
  };

  const handleCloseCalculator = () => {
    setShowCalculator(false);
  };

  const handleRefresh = () => {
    setIsRefresh(true);

    // Remove the class after animation duration to allow re-triggering
    setTimeout(() => {
      setIsRefresh(false);
    }, 600); // Match the duration of the animation
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        showCalculator,
        isRefresh,
        handleAdd,
        handlePrint,
        handleDownload,
        handleEmail,
        handleWhatsapp,
        handleCall,
        handleUpdate,
        handleDelete,
        handleView,
        handleOpenCalculator,
        handleCloseCalculator,
        handleRefresh,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeProvider, EmployeeContext };

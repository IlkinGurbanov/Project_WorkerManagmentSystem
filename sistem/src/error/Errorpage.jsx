import React from 'react';

function ErrorPage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.heading}>404 - Not Found</h1>
          <p style={styles.message}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </div>
        <div style={styles.actions}>
          <button style={styles.button} onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  content: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
  },
  heading: {
    fontSize: '36px',
    color: '#343a40',
  },
  message: {
    fontSize: '18px',
    color: '#6c757d',
    marginBottom: '20px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    marginRight: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#007bff',
    textDecoration: 'none',
    border: '1px solid #007bff',
    borderRadius: '4px',
  },
};

export default ErrorPage;

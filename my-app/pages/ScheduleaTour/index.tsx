import React from 'react';

const ScheduleaTour = () => {
  return (
    <div style={{
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      width: '80%', 
      maxWidth: '400px',
      background: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: '1000'
    }}>
      <h1>Schedule a Tour</h1>
      <p>Fill out the form below to schedule a tour of the property.</p>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
          <input type="text" id="name" name="name" required 
            style={{ width: '100%', padding: '8px', margin: '0 0 10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
         <div style={{ marginBottom: '10px' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone</label>
            <input type="tel" id="phone" name="phone" required 
              style={{ width: '100%', padding: '8px', margin: '0 0 10px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
        {/* Repeat the above style for the rest of your form fields */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input type="email" id="email" name="email" required 
            style={{ width: '100%', padding: '8px', margin: '0 0 10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        {/* ...other form fields... */}
        <button type="submit" 
          style={{ display: 'block', width: '100%', padding: '10px 0', background: '#fae042', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ScheduleaTour;

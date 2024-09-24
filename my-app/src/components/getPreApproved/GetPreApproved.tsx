//create a pre-approved page
//lourdes wants to display 1-3 lenders that buyers can submit their info and connect 

//information to be captured:
//name
//phone
//email
//how soon they are looking to buy 

"use client";
import React, {useState} from 'react';

const GetPreApproved: React.FC = () => {
    //state variables for form fields
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [timeframe, setTimeframe] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();


        //collection of data for backend 
        const formData = {
            name,
            phone,
            email,
            timeframe,
        };

        console.log('Form Submitted:' , formData);

        //set as submitted 
        setSubmitted(true);
    };

  
    return (
        <div style={styles.container}>
            {submitted ? (
                <div style={styles.thankYouMessage}>
                    <h2>Thank you for your submission!</h2>
                    <p>We will contact you soon!</p>
                    </div>
            ) : (
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2>Get Pre-Approved survey!</h2>

                    <label style={styles.label}>Name:</label>
                    <input
                        style={styles.input}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />

                    <label style={styles.label}>Phone:</label>
                    <input
                    style={styles.input}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    />

                    <label style={styles.label}>Email:</label>
                    <input
                        style={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />

                    <label style={styles.label}>When are you looking to buy a home?</label>
                    <select 
                        style={styles.select}
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        required
                        >
                            <option value="">Select Timeframe</option>
                            <option value="Within 3 months">Within 3 months</option>
                            <option value="Within 6 months">Within 6 months</option>
                            <option value="Within 12 months">Within 9 months</option>
                            <option value="Not sure yet">Not sure yet</option>
                        </select>

                        <button style={styles.button} type="submit">Submit</button>

                    </form>
            )}
        </div>
    );
};


    const styles: {[key: string]: React.CSSProperties} = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f7f7f7',
        

        },
        form: {
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '600px',
            minWidth: '300px',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',

        },
        input:{
            width: '100%',
            padding: '10px',
            marginBottom: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
        },
        select: {
            width: '100%',
            padding: '10px',
            marginBottom: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#007BFF',
            color: '#fff',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
        },
        thankYouMessage: {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
         maxWidth: '400px',
        },
        
        
};


export default GetPreApproved;

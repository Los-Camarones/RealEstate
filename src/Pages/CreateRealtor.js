import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import supabase from "../config/supabaseClient"

const CreateRealtor = () => {
    const navigate = useNavigate
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [agency, setAgency] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipCode] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if(!firstName || !lastName|| !phoneNumber ||!email || !zipcode || !agency ||
        !userName || !password || !address || !city || !state) {
            setFormError('Please fill in all the fields correctly')
            return
        }
    
        console.log(firstName,lastName,phoneNumber,email,agency,address,city,state,zipcode,userName,password)
        const {data, error} = await supabase
            .from('Homes')
            .insert([{firstName,lastName,phoneNumber,email,zipcode,userName,password,address,city,state}])
    
            if(error) {
                console.log(error)
                setFormError('Please fill in all the fields correctly')
            }
    
            if(data) {
                console.log(data)
                setFormError(null)
                navigate('/')
            }
    }

    return (
        <div className="page create">
            <form onSubmit = {handleSubmit}>
                <label htmlFor="FirstName">First Name:</label>
                <input
                    type="text"
                    id="FirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                <label htmlFor="LastName">Last Name:</label>
                <textarea
                    type="text"
                    id="LastName"
                    value={lastName}
                    onChange = {(e) => setLastName(e.target.value)}
                />
                <label htmlFor="Email">Email Address:</label>
                <input
                    type="text"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <label htmlFor="PhoneNumber">Phone Number:</label>
                <input
                    type="number"
                    id="PhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                <label htmlFor="Agency">Agency</label>
                <input
                    type="text"
                    id="Agency"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                />
               
               <label htmlFor="Address">Address:</label>
                <textarea
                    type="text"
                    id="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                <label htmlFor="City">City:</label>
                <input
                    type="text"
                    id="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <label htmlFor="State">State:</label>
                <input
                    type="text"
                    id="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    />
                <label htmlFor="ZipCode">Zipcode:</label>
                <input
                    type="number"
                    id="ZipCode"
                    value={zipcode}
                    onChange={(e) => setZipCode(e.target.value)}
                    />
    
            <label htmlFor="UserName">User Name:</label>
                <input
                    type="text"
                    id="UserName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
    
            <label htmlFor="Password">Password:</label>
                <input
                    type="text"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    
    
                <button>Create New Realtor</button>
    
                {formError && <p className="error">{formError}</p>}
            </form>
            
        </div>
    )
    }
    
    export default CreateRealtor
    
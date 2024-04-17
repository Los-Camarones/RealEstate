import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import supabase from "./config/supabaseClient"

const CreateHomes = () => {
    const navigate = useNavigate
    const [size, setSize] = useState('')
    const [address, setAddress] = useState('')
    const [status, setStatus] = useState('')
    const [price, setPrice] = useState('')
    const [yearBuilt, setYearBuilt] = useState('')
    const [numberRooms, setNumberRooms] = useState('')
    const [numberBathrooms, setNumberBathrooms] = useState('')
    const [anemities, setAnemities] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!size || !address || !status|| !price ||!yearBuilt || !numberRooms ||
        !numberBathrooms || !anemities || !city || !state || !zipCode) {
            setFormError('Please fill in all the fields correctly')
            return
        }

        console.log(size, address,status,price,yearBuilt,numberRooms,numberBathrooms,anemities,city,state,zipCode)
        const {data, error} = await supabase
            .from('Homes')
            .insert([{address,status,price,yearBuilt,numberRooms,numberBathrooms,anemities,city,state,zipCode}])

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
                <label htmlFor="Size">Size in sq.ft:</label>
                <input
                    type="number"
                    id="Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    />
                <label htmlFor="Address">Address:</label>
                <input
                    type="text"
                    id="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                <label htmlFor="Status">Status:</label>
                <textarea
                    type="text"
                    id="Status"
                    value={status}
                    onChange = {(e) => setStatus(e.target.value)}
                />
                <label htmlFor="Price">Price:</label>
                <input
                    type="number"
                    id="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                <label htmlFor="YearBuilt">Year Built:</label>
                <input
                    type="number"
                    id="YearBuilt"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    />

                <label htmlFor="NumberRooms">Number of Rooms:</label>
                <input
                    type="number"
                    id="NumberRooms"
                    value={numberRooms}
                    onChange={(e) => setNumberRooms(e.target.value)}
                    />

            <label htmlFor="NumberBathrooms">Number of Bathrooms:</label>
                <input
                    type="number"
                    id="NumberBathrooms"
                    value={numberBathrooms}
                    onChange={(e) => setNumberBathrooms(e.target.value)}
                    />

            <label htmlFor="Anemities">Anemities:</label>
                <input
                    type="text"
                    id="Anemities"
                    value={anemities}
                    onChange={(e) => setAnemities(e.target.value)}
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
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    />

                <button>Create Home Description</button>

                {formError && <p className="error">{formError}</p>}
            </form>
            
        </div>
    )
}

export default CreateHomes
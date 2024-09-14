import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
    const {id} = useParams()
    const navigate = useNavigate()

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

        const {data, error} = await supabase
            .from('Homes')
            .update({size, address, status, price, yearBuilt, numberRooms, numberBathrooms,
            anemities, city, state, zipCode})
            .eq('id', id)
            .select()

        if(error){
            console.log(error)
            setFormError('Please fill in all the fields correctly')
        }

        if(data) {
            console.log(data)
            setFormError(null)
            navigate('/')
        }

    }

    useEffect(() => {
        const fetchHomes = async() => {
            const {data, error} = supabase  
                .from('Homes')
                .select()
                .eq('id', id)
                .single()

            if(error) {
                navigate('/', {replace: true})
            }
            if(data) {
                setSize(data.size)
                setAddress(data.address)
                setStatus(data.Status)
                setPrice(data.price)
                setYearBuilt(data.YearBuilt)
                setNumberRooms(data.NumberRooms)
                setNumberBathrooms(data.NumberBathrooms)
                setAnemities(data.Anemities)
                setCity(data.City)
                setCity(data.State)
                setZipCode(data.ZipCode)
                console.log(data)
            }
        }

        fetchHomes()
    }, [id, navigate])
    return (
        <div className="page update">
             <form>
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

                <button>Update Home Description</button>

               {formError && <p className="error">{formError}</p>}
                </form>
        </div>
    )
}

export default Update
import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import supabase from "..src/config/supabaseClient"

const Create = () => {
    const navigate = useNavigate
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!title || !method || !rating) {
            setFormError('Please fill in all the fields correctly')
            return
        }

        console.log(title,rating,method)
        const {data, error} = await supabase
            .from('Homes')
            .insert([{title, method, rating}])

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
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <label htmlFor="method">Method:</label>
                <textarea
                    id="method"
                    value={method}
                    onChange = {(e) => setMethod(e.target.value)}
                />

<label htmlFor="rating">Rating:</label>
                <textarea
                    type="number"
                    id="rating"
                    value={method}
                    onChange = {(e) => setRating(e.target.value)}
                />

                <button>Create Home Description</button>

                {formError && <p className="error">{formError}</p>}
            </form>
            
        </div>
    )
}

export default Create
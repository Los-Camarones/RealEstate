import {Link} from 'react-router-dom'
import supabase from '../config/supabaseClient'

const RealtorCard = ({realtor}) => {

    const handleDelete = async () => {
        const {data, error} = await supabase
        .from('Realtor')
        .delete()
        .eq('id', realtor.id)
        
        if(error) {
            console.log(error)
        }

        if(data) {
            console.log(data);
        }
    }
    return (
       <div className="Realtor-card">
       <h3>{home.FirstName}</h3>
        <p>{home.LastName}</p>
        <p>{home.EmailAddress}</p>
        <p>{home.PhoneNumber}</p>
        <p>{home.Agency}</p>
        <p>{home.Address}</p>
        <p>{home.City}</p>
        <p>{home.State}</p>
        <p>{home.ZipCode}</p>
        <div className="buttons">
                <Link to ={'/' + realtor.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick = {handleDelete}>delete</i>
            </div>
       </div>
    )
}

export default RealtorCard
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
       <h3>{realtor.FirstName}</h3>
        <p>{realtor.LastName}</p>
        <p>{realtor.EmailAddress}</p>
        <p>{realtor.PhoneNumber}</p>
        <p>{realtor.Agency}</p>
        <p>{realtor.Address}</p>
        <p>{realtor.City}</p>
        <p>{realtor.State}</p>
        <p>{realtor.ZipCode}</p>
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
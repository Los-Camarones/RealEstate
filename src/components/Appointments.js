import {Link} from 'react-router-dom'
import supabase from '../config/supabaseClient'

const AppointmentsCard = ({appointment}) => {
    const handleDelete = async () => {
        const {data, error} = await supabase
        .from('User Information')
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
       <div className="Appointments-card">
        <h3>{appointment.userID}</h3>
        <p>{appointment.FirstName}</p>
        <p>{appointment.LastName}</p>
        <p>{appointment.PhoneNumber}</p>
        <p>{appointment.Email}</p>
        <p>{appointment.ZipCode}</p>
        <p>{appointment.UserName}</p>
        <p>{appointment.Password}</p>
        <div className="buttons">
                <Link to ={'/' + appointment.userID}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick = {handleDelete}>delete</i>
            </div>
       </div>
    )
}

export default UserInformationCard
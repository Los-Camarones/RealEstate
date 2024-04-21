import {Link} from 'react-router-dom'
import supabase from '../config/supabaseClient'

const UserInformationCard = ({user}) => {
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
       <div className="UserInformation-card">
        <h3>{user.userID}</h3>
        <p>{user.FirstName}</p>
        <p>{user.LastName}</p>
        <p>{user.PhoneNumber}</p>
        <p>{user.Email}</p>
        <p>{user.ZipCode}</p>
        <p>{user.UserName}</p>
        <p>{user.Password}</p>
        <div className="Credit Score">{user.creditScore}</div>
        <div className="buttons">
                <Link to ={'/' + user.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick = {handleDelete}>delete</i>
            </div>
       </div>
    )
}

export default UserInformationCard
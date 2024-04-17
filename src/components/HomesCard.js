import {Link} from 'react-router-dom'
import supabase from '../config/supabaseClient'
const HomesCard = ({home, onDelete}) => {

    const handleDelete = async () => {
        const {data, error} = await supabase
        .from('Homes')
        .delete()
        .eq('id', home.id)
        
        if(error) {
            console.log(error)
        }

        if(data) {
            console.log(data);
            onDelete(home.id)
        }
    }
    return (
       <div className="Homes-card">
            <h3>{home.ListingNumber}</h3>
            <p>{home.Address}</p>
            <p>{home.Status}</p>
            <p>{home.Size}</p>
            <p>{home.Type}</p>
            <p>{home.Price}</p>
            <p>{home.YearBuilt}</p>
            <p>{home.NumberRooms}</p>
            <p>{home.NumberBathrooms}</p>
            <p>{home.Anemities}</p>
            <p>{home.City}</p>
            <p>{home.State}</p>
            <p>{home.ZipCode}</p>
            <div className="buttons">
                <Link to ={'/' + home.id}>
                    <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick = {handleDelete}>delete</i>
            </div>
       </div>
    )
}

export default HomesCard
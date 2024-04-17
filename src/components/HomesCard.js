import {Link} from 'react-router-dom'

const HomesCard = ({home}) => {
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
            </div>
       </div>
    )
}

export default HomesCard
const RealtorCard = ({realtor}) => {
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
       </div>
    )
}

export default RealtorCard
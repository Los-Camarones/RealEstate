const RealtorCard = ({realtor}) => {
    return (
       <div className="Realtor-card">
        <h3>{realtor.title}</h3>
        <p>{realtor.method}</p>
        <div className="Rating">{realtor.rating}</div>
       </div>
    )
}

export default RealtorCard
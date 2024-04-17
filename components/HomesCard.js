const HomesCard = ({home}) => {
    return (
       <div className="Homes-card">
        <h3>{home.title}</h3>
        <p>{home.method}</p>
        <div className="Price">{home.price}</div>
       </div>
    )
}

export default HomesCard
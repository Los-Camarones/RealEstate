const UserInformationCard = ({user}) => {
    return (
       <div className="UserInformation-card">
        <h3>{user.title}</h3>
        <p>{user.method}</p>
        <div className="Credit Score">{user.creditScore}</div>
       </div>
    )
}

export default UserInformationCard
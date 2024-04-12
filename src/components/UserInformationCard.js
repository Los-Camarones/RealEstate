const UserInformationCard = ({user}) => {
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
       </div>
    )
}

export default UserInformationCard
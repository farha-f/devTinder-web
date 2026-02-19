const UserCards = ({user}) => {
    const {firstName,lastName,photo,about,skill}= user;
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={user.photo}
                    alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName+' '+lastName}</h2>
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-secondary">Ignore</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>
    )
}
export default UserCards;
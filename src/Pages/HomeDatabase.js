import supabase from "../config/supabaseClient"
import {useEffect, useState} from 'react'

//components
import HomesCard from "./components/HomesCard"

const Databases = () => {
   console.log(supabase)
    const [fetchError, setFetchError] = useState(null)
    const [Homes, setHome] = useState(null)
    const [Realtor, setRealtor] = useState(null)
    const [UserInformation, setUserInformation] = useState(null)

    const handleDelete = (id) => {
        setHome(prevHomes => {
            return prevHomes.filter(hm => hm.id !== id)
        })
    } 
    useEffect(() => {
        const fetchData = async () => {
            try {
                /*
                const {data: HomesData, error: HomesError } = await supabase.from('Homes').select()
                const {data: RealtorData, error: RealtorError } = await supabase.from('Realtor').select()
                const {data: UserInfoData, error: UserInfoError} = await supabase.from('UserInformation').select()
                */
            
            
            const {data, error} = await supabase
                .from('Homes')
                .select() //get all data

                if(error) {
                    setFetchError('Could not fetch table Homes')
                    setHome(null)
                    console.log(error)
                }

                if(data) {
                    setHome(data)
                    setFetchError(null)
                }
                
                /*
               if(HomesError) setFetchError(prevErrors => ({...prevErrors, Homes: 'Could not fetch Homes data'}))
               if(RealtorError) setFetchError(prevErrors => ({...prevErrors, Realtor: 'Could not fetch Realtor data'}))
               if(UserInfoError) setFetchError(prevErrors => ({...prevErrors, UserInformation: 'Could not fetch User Information data'}))
               
               */
               if(data){
                setHome(data)
                setRealtor(data)
                setUserInformation(data)
                setFetchError(null)
               }
        } catch (error){
            console.error('Error fetching data:', error.message)
        }
        }
        
        fetchData()
    }, [] )

    /*
    return (
        <div className="page home">
            {Object.keys(fetchError).map((table, index) => (
                <p key={index}>{fetchError[table]}</p>
            ))}
            <div className="tables">
                {Object.keys(data).map((table, index) => (
                    <div key={index} className={`${table} table`}>
                        <h2>{table}</h2>
                        <div className="table-grid">
                            {data[table] && data[table].map(item => (
                                <HomesCard key={item.id} house={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    */
   return (
    <div className = "page home">
        {fetchError && (<p>{fetchError}</p>)}
        {Homes && (
            <div className="Homes">
                <div className="homes-grid">
                    {Homes.map(home => (
                        <HomesCard  
                            key={home.id}
                            home={home}
                            onDelete = {handleDelete}
                            />
                    ))}
                </div>

            </div>
        )}
        {Realtor && (
        <div className ="Realtor">
                <div className="realtor-grid">
                    {Realtor.map(realtor => (
                        <RealtorCard  
                            key={realtor.id}
                            home={realtor}
                            onDelete = {handleDelete}
                            />
                    ))}
                </div>
        </div>
        )}
        {UserInformation && (
        <div className ="UserInformation">
                <div className="userInformation-grid">
                    {UserInformation.map(user => (
                        <UserInformationCard  
                            key={user.id}
                            home={user}
                            onDelete = {handleDelete}
                            />
                    ))}
                </div>
        </div>
        )}
    </div>

   )

   
}
export default Databases
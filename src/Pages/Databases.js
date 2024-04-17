import supabase from "../config/supabaseClient"
import {useEffect, useState} from 'react'

//components
import HomesCard from "../components/HomesCard"

const Databases = () => {
   console.log(supabase)
    const [fetchError, setFetchError] = useState(null)
    const [Homes, setHome] = useState(null)
    const [Realtor, setRealtor] = useState(null)
    const [UserInformation, setUserInformation] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: HomesData, error: HomesError } = await supabase.from('Homes').select()
                const {data: RealtorData, error: RealtorError } = await supabase.from('Realtor').select()
                const {data: UserInfoData, error: UserInfoError} = await supabase.from('UserInformation').select()
            
            /*
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
                */
               if(HomesError) setFetchError(prevErrors => ({...prevErrors, Homes: 'Could not fetch Homes data'}))
               if(RealtorError) setFetchError(prevErrors => ({...prevErrors, Realtor: 'Could not fetch Realtor data'}))
               if(UserInfoError) setFetchError(prevErrors => ({...prevErrors, UserInformation: 'Could not fetch User Information data'}))
               
               setData({
                Homes: HomesData,
                Realtor: RealtorData,
                UserInformation: UserInfoData
               })
        } catch (error){
            console.error('Error fetching data:', error.message)
        }
        }
        
        fetchData()
    }, [] )

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
}
export default Databases
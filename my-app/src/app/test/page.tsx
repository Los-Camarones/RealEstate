import React from 'react'
import {getSubscriberCount} from '../../actions/HomeFinderActions' 

const page = async () => {

    const response = await getSubscriberCount();
    // if(response.success)
    // {
    //     console.log(response.subscriberCount);
    // }
    // else
    // {
    //     console.log(response.error);
    // }
  return (

    <div>
        <h1>{response.subscriberCount}</h1>
    </div>
  )
}

export default page
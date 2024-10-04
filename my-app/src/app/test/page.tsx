import React from 'react'
import {getSubscriberCount} from '../../actions/HomeFinderActions' 
import { insertSubscriberCount } from '@/actions/StatisticActions';

const page = async () => {

    const response = await getSubscriberCount();

    if (response.success && typeof response.subscriberCount === 'number') {
      let subscriberNumber: number = response.subscriberCount;

      const insertResponse = await insertSubscriberCount(subscriberNumber);

      if (insertResponse.success) {
        console.log("inserted subscriber successfully");
      }
      else {
        console.log(insertResponse.error);
      }

    } else {
      console.error("Subscriber count is undefined");
    }
    
  return (

    <div>
        <h1>{response.subscriberCount}</h1>
    </div>
  )
}

export default page
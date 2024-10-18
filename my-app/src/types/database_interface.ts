/**
 * This file serves as the collection of interfaces for each entity of our database
 */

import { UUID } from "crypto";

type IUser = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }
  export interface ITestimonial {
    id?: UUID,
    created_at: string,
    rating: number,
    comments: string,
    user_name: string,
    profile_picture: string,
    is_displayed: boolean
  };

  export interface IStatistic {
    id: number;
    created_at: string;
    type: string;
    count: number;
  }
import React from "react";
import Booking from "../components/Booking";

import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// import SkillsList from '../components/SkillsList';
// import SkillForm from '../components/SkillForm';

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { userId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.name) {
    return (
      <h4>
        You need to be logged in to see your bookings page. Use the navigation
        links above to log in!
      </h4>
    );
  }

  return (
    <div>
      <h2 className="card-header">Your bookings are as follows:</h2>
      <Booking />
    </div>
  );
};

export default Profile;

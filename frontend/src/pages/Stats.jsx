import React from 'react'

import { ChartsContainer, StatItem, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (e) {
    return e;
  }
};
const Stats = () => {
  const {defaultStats,monthlyApplications}=useLoaderData();
  console.log(defaultStats);
  console.log(monthlyApplications);
  return (
    <>
      <StatsContainer defaultStats={defaultStats}/>
      {
        monthlyApplications?.length>1 && (
        <ChartsContainer data={monthlyApplications}/>
      )
      }
    </>
  )
}

export default Stats

import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";


export const loader=async()=>{
try{
const {data}=await customFetch.get('/jobs');
return {data};
}catch(e){
toast.error(e?.response?.data?.msg);
return e;
}
}
const AllJobsContext=createContext()
const AllJobs = () => {
  const {data}=useLoaderData()
  return <AllJobsContext.Provider value={{data}}>
  <SearchContainer/>
  <JobsContainer/>
  </AllJobsContext.Provider>;
};
export const useAllJobsContext=()=>useContext(AllJobsContext);
export default AllJobs;

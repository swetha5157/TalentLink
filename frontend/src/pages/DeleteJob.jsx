import React from 'react'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
export const action=async({params})=>{
  try{
await customFetch.delete(`/jobs/${params.id}`);
toast.success('Job deleted successfully');

  }catch(e){
    toast.error(e?.response?.data?.msg);
    return e;
  }
  return redirect('/dashboard/alljobs');
}
const DeleteJob = () => {
  return (
    <div>
      Delete job
    </div>
  )
}

export default DeleteJob

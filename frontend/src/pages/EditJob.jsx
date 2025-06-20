import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({params}) => {
 try{ 
  const {data}=await customFetch.get(`/jobs/${params.id}`)
  return data;
}catch(e){
toast.error(e?.response?.data?.msg);
return redirect('/dashboard/alljobs');
  }
};
export const action = async ({request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try{
await customFetch.patch(`/jobs/${params.id}`,JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json", // ✅ Ensure JSON format
      },
    });
toast.success("Job edited successfully");
return redirect("/dashboard/alljobs");
  }catch(e){
 toast.error(e?.response?.data?.msg);
 return e;
  }
};

const EditJob = () => {
  const {job}=useLoaderData();
  console.log(job);
 
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

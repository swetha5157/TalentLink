import { FormRow ,FormRowSelect, SubmitBtn} from "../components/index.js";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
export const action=async({request})=>{
  const formData=await request.formData()
  const data=Object.fromEntries(formData)
  try{
    await customFetch.post('/jobs',data)
    toast.success('Job added successfully');
    return redirect("/dashboard/alljobs"); 
  }
catch(e){
  toast.error(e?.response?.data?.msg);
  }
  return null;
}
const AddJob = () => {
  const {user}=useOutletContext();
  
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelTxt="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
if(process.env.NODE_ENV==='development'){
app.use(morgan("dev"));
}

const port=process.env.PORT||5100;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});
//get all jobs
app.get('/jobs/getall',(req,res)=>{
    res.status(200).json({jobs});
})
//create jobs
app.post("/jobs/add", (req, res) => {
  const {company,position}=req.body;
  if(!company ||!position) return res.status(400).json({message:"No company or position"});
 
  const id=nanoid(10);
  const job={id,company,position};
  jobs.push(job);
  res.status(201).json({job})
 
});
//get single job
app.get('/jobs/get/:id',(req,res)=>{
    const {id}=req.params;
    const job=jobs.find((job)=>job.id===id);
    if(!job){
        return res.status(404).json({msg:`No job with the id ${id}`});
    }
    res.status(200).json({job});
});
//edit job
app.patch('/jobs/edit/:id',(req,res)=>{
        const { company, position } = req.body;
        if(!company||!position) return res.status(400).json({msg:'provide comapny and position'})
     const { id } = req.params;
     const job = jobs.find((job) => job.id === id);
     if (!job) {
       return res.status(404).json({ msg: `No job with the id ${id}` });
     }
    if(company) job.company=company;
    if(position)job.position=position;
    return res.status(201).json({job});
})
//delete job
app.delete('/jobs/del/:id',(req,res)=>{
    const { id } = req.params;
     const job = jobs.find((job) => job.id === id);
     if (!job) {
       return res.status(404).json({ msg: `No job with the id ${id}` });
     }
     const newJobs=jobs.filter((job)=>job.id!==id)
     jobs=newJobs
     return res.status(200).json({msg:`job with id ${id} is deleted.`})
});  

//not found middleware
app.use('*',(req,res)=>{
    res.status(404).json({msg:'not found'});
});

//error middleware
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({msg:'something went wrong'});
});

app.use()
app.listen(port, () => {
  console.log(`server running in ${port}`);
});

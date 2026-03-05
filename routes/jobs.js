const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Job = require("../models/Job")
const {protect} = require("../middlewares/authMiddleware")

router.get("/",protect,async (req,res)=>{
    try {
      let queryObj = {user: req.user._id};

      if (req.query.status) {
        queryObj.status = req.query.status;
      }
      if(req.query.search){
        queryObj.$or = [
          {position: { $regex: req.query.search, $options: "i" } },
          {company: { $regex: req.query.search, $options: "i" } },
        ]
      }
    const jobs = await Job.find(queryObj).sort({createdAt:-1})
    res.status(200).json(jobs)
    } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
})
// create new job
router.post("/",protect,async (req,res)=>{
  try{
    const {position,company,status,location,salary} = req.body;
    if(!position || !company){
        return res.status(400).json({message:"Please enter all required fields"})
    }
    const job = await Job.create({
      position,
      company,
      status,
      location,
      salary,
      user: req.user._id
    })
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
})

router.get("/:id",protect,async (req,res)=>{
  const job = await Job.findById(req.params.id);  
  if (!job) {
        return res.status(404).json({ msg: "Job not found" });
    }

    if (job.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ msg: "Not authorized" });
    }

    res.status(200).json(job);
})

router.put("/:id",protect,async (req,res)=>{
  try{
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({ msg: "Job not found" });
     }
     if(job.user.toString() !== req.user._id.toString()){
        return res.status(401).json({ msg: "Not authorized" });
     }
    const updjob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    )
      res.status(200).json(updjob);

    }catch (error) {
    res.status(500).json({ message: "Error updating job", error: error.message });
  }
})

router.delete("/:id",protect,async (req,res)=>{
  try{
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({ msg: "Job not found" });
     }
     if(job.user.toString() !== req.user._id.toString()){
        return res.status(401).json({ msg: "Not authorized" });
     }
    await job.deleteOne();
     res.status(200).json({ msg: "Job deleted successfully" });
  }catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
})


module.exports = router;
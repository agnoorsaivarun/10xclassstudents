const express = require("express");
const route = express();

const classModel = require("../models/class")
const studentModel=require("../models/student")

route.post("/v1/myClass",async (req,res)=>{
    try {
        const data = await classModel.find()
    let id = -1
    if (data.length === 0) id = 1
    else id = data[data.length - 1]._id + 1
    const tenxclass = await classModel.create({
        _id:id,
        class:req.body.class,
        StudentCount:req.body.StudentCount
    })
    res.status(201).json({id:id})
    } catch (error) {
        res.status(404).json({message:error.message})   
    } 
})
route.post("/v1/:myClassId/students",async (req,res)=>{
    try {
        const tenxClass= req.params.myClassId
        const Classes = await classModel.find()
        let flag=false
        for(let i=0;i<Classes.length;i++){
            if(tenxClass==Classes[i]._id) flag=true
        }
        if(flag){const data = await studentModel.find()
        let id = -1
    if (data.length === 0) id = 1
    else id = Number(data[data.length - 1]._id) + 1
    const tenxStudent = await studentModel.create({
        _id:id,
        name:req.body.name,
        classId:tenxClass
    })
    res.status(201).json({studentId:id})}
    else res.status(404).json({message:"there is no class with given class id"})
    } catch (error) {
        res.status(404).json({message:error.message})   
    } 
})
route.get("/v1/myClass",async (req,res)=>{
    try {
    const tenxClasses = await classModel.find()
    res.status(200).json(tenxClasses)
    } catch (error) {
        res.status(404).json({message:error.message})   
    } 
})
route.get("/v1/myClass/:myClassId",async (req,res)=>{
    try {
    const tenxClass= req.params.myClassId
    const tenxClasses = await classModel.find({_id:tenxClass})
    res.status(200).json(tenxClasses)
    } catch (error) {
        res.status(404).json({ error: "There is no class at that id"})   
    } 
})
route.get("/v1/myClass/:myClassId/students",async (req,res)=>{
    try {
    const tenxClass= req.params.myClassId
    const tenxStudents = await studentModel.find({classId:tenxClass})
    res.status(200).json(tenxStudents)
    } catch (error) {
        res.status(404).json({ error: "There is no students at this class"})   
    } 
})
route.get("/v1/myClass/:myClassId/students/:studentId",async (req,res)=>{
    try {
    const tenxClass= req.params.myClassId
    const tenxStudent=req.params.studentId
    const tenxStudents = await studentModel.find({_id:tenxStudent})
    res.status(200).json(tenxStudents)
    } catch (error) {
        res.status(404).json({ error: "There is no students of that id"})   
    } 
})
route.put("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    try {
        const tenxStudent=req.params.studentId
        const Student = await studentModel.find({_id:tenxStudent})
        const student=await studentModel.updateOne({_id:tenxStudent},
            {
                _id:Student[0]._id,
                name:req.body.name,
                classId:Student[0].classId
            }
        )
        res.status(204).json({student:student})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})
route.delete("/v1/myClass/:myClassId",async(req,res)=>{
    try {
        const tenxClass=req.params.myClassId
        const Students = await studentModel.deleteMany({classId:tenxClass})
        const Class=await classModel.deleteOne({_id:tenxClass})
        res.status(204).json({
            deletedClass:Class,
            deletedStudents:Students        
        })
    } catch (error) {
        res.status(404).json({error:"There is no task at that id"})
    }
})
route.delete("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    try {
        const tenxStudent=req.params.studentId
        const student=await studentModel.deleteOne({_id:tenxStudent})
        res.status(204).json({deletedStudent:student})
    } catch (error) {
        res.status(404).json({error:"There is no task at that id"})
    }
})


module.exports=route
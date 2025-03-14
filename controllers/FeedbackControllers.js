import express from "express";
import nodemailer from "nodemailer";
import sendEmail from "../utils/sendFeedback.js";

export const getFeedback = (req, res) => {
    res.render("Feedback");
}

export const createFeedback = async(req,res)=>{
    try {
        const {name,email,feedback,rating} = req.body;
      await  sendEmail({
            name,
            email,
            feedback,
            rating
        });
        res.status(200).json({
            success:true,
            message:"Email sent successfully"
        });
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message: "Error sending email"
        });
    }
}
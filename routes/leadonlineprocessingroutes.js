import express from "express";
import Leadonlineprocessing from "../models/leadonlineprocessing.js";
import Leadserveyonline from "../models/leadserveyonline.js";
import User from "../models/user.js";
import Onlineprospect from "../models/onlineprospect.js";

const router = express.Router();

router.post('/onlinelead/assign', async (req, res) => {
    const { username, leadSurveyonlineIds } = req.body;

    if (!Array.isArray(leadSurveyonlineIds)) {
        return res.status(400).json({ error: 'leadServeyonlineIds must be an array' });
    }
    try {
        const assignments = await Promise.all(leadSurveyonlineIds.map(async (leadonlineSurveyId) => {
            const leadSurveyonline = await Leadserveyonline.findById(leadonlineSurveyId)
            if (!leadonlineSurveyId) {
                return null;
            }
            await Leadserveyonline.findByIdAndUpdate(leadonlineSurveyId, { assigned: true });
            const leadonlineprocessing = await Leadonlineprocessing.create({
                username,
                leadonlineSurveyId,
                leadonlineserveyDetails: leadSurveyonline.toObject(),
            });

            const updatedUser = await User.findOneAndUpdate(
                { username: username },
                { $set: { hasUnreadMessages: true }, $push: { leadonlineprocessing: leadonlineprocessing.toObject() } },
                { new: true }
            );

            if (!updatedUser) {
                console.error('User not found for username:', username);
                return null;
            }
            return leadonlineprocessing;
        }))
        res.status(200).json(assignments.filter(assignment => assignment !== null))
    } catch (error) {
        console.error('Error assigning leadonline surveys:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/leadonlineprocessing/:id', async (req, res) => {
    try {
        const { interested, date } = req.body;
        const notInterested = !interested;

        const updatedLeadonline = await Leadonlineprocessing.findByIdAndUpdate(req.params.id, { interested, date, notInterested }, { new: true })

        if (interested) {
            const { leadonlineSurveyId, username } = updatedLeadonline;
            const leadonlineserveyDetails = updatedLeadonline.toObject();

            const onlineprospect = new Onlineprospect({
                leadonlineDetails: leadonlineserveyDetails,
                date: new Date()
            });
            await onlineprospect.save();
        }
        res.json(updatedLeadonline)
    } catch (error) {
        console.error('Error updating leadonline interest status:', error);
        res.status(500).send('Error updating leadonline interest status');
    }
})

router.get('/leadonlineprocessing', async (req, res) => {
    try {
        const leadonlineprocessing = await Leadonlineprocessing.find()
        res.status(200).json(leadonlineprocessing)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching leadonline processing details.' })
    }
})

router.get('/online-prospect', async (req, res) => {
    try {
        const onlineprospect = await Onlineprospect.find();
        res.status(200).json(onlineprospect)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching onlineprospect details.' })
    }
})
export default router
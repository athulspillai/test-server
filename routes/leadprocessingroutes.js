
import express from "express";
import Leadprocessing from "../models/leadprocessing.js";
import Leadservey from "../models/leadservey.js";
import User from "../models/user.js";
import Prospect from "../models/prospect.js";

const router = express.Router();

router.post('/assign', async (req, res) => {
    const { username, leadSurveyIds } = req.body;

    if (!Array.isArray(leadSurveyIds)) {
        return res.status(400).json({ error: 'leadSurveyIds must be an array' });
    }

    try {
        const assignments = await Promise.all(leadSurveyIds.map(async (leadSurveyId) => {
            const leadSurvey = await Leadservey.findById(leadSurveyId);
            if (!leadSurvey) {
                return null;
            }
            await Leadservey.findByIdAndUpdate(leadSurveyId, { assigned: true });
            const leadProcessing = await Leadprocessing.create({
                username,
                leadSurveyId,
                leadserveyDetails: leadSurvey.toObject(),
            });

            // Update user document atomically
            const updatedUser = await User.findOneAndUpdate(
                { username: username },
                { $set: { hasUnreadMessages: true }, $push: { leadProcessing: leadProcessing.toObject() } },
                { new: true } // Return the modified document
            );

            if (!updatedUser) {
                console.error('User not found for username:', username);
                return null; // Return early if user is not found
            }

            return leadProcessing;
        }));

        res.status(200).json(assignments.filter(assignment => assignment !== null));
    } catch (error) {
        console.error('Error assigning lead surveys:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// router.put('/leadprocessing/:id', (req, res) => {
//     const { interested } = req.body;
//     const notInterested = !interested; // Toggle the value to set notInterested

//     Leadprocessing.findByIdAndUpdate(req.params.id, { interested, notInterested }, { new: true })
//         .then(updatedLead => {
//             res.json(updatedLead);
//         })
//         .catch(err => {
//             console.error('Error updating lead interest status:', err);
//             res.status(500).send('Error updating lead interest status');
//         });
// });

router.put('/leadprocessing/:id', async (req, res) => {
    try {
        const { interested, date } = req.body;
        const notInterested = !interested;

        // Update the interested status in the Leadprocessing model
        const updatedLead = await Leadprocessing.findByIdAndUpdate(req.params.id, { interested, date, notInterested }, { new: true });

        // If interested, create a new entry in the Prospect model
        if (interested) {
            // Extract relevant data from updatedLead or req.body
            const { leadSurveyId, leadserveyDetails, username } = updatedLead;

            // Create a new prospect entry
            const prospect = new Prospect({
                leadSurveyId,
                username,
                leadDetails: leadserveyDetails,
                interested: true,
                date: new Date()
            });

            // Save the prospect entry
            await prospect.save();
        }

        // Return the updated lead
        res.json(updatedLead);
    } catch (error) {
        console.error('Error updating lead interest status:', error);
        res.status(500).send('Error updating lead interest status');
    }
});


router.delete('/leadprocessing/:id', async (req, res) => {
    try {
        const deletedItem = await Leadprocessing.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/leadprocessing', async (req, res) => {
    try {
        const leadprocessing = await Leadprocessing.find();
        res.status(200).json(leadprocessing)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching lead processing details.' })
    }
});

router.delete('/delete-all-leadprocessing', async (req, res) => {
    try {
        await Leadprocessing.deleteMany({});
        res.status(200).json({ message: 'All leadprocessing entries deleted successfully' });
    } catch (error) {
        console.error('Error deleting all leadprocessing entries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/prospect', async (req, res) => {
    try {
        const prospect = await Prospect.find();
        res.status(200).json(prospect)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching prospect details.' })
    }
})

export default router;









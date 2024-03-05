import express from 'express'
import Module from '../models/module.js'
import ModuleController from '../controllers/module.js';


const router = express.Router();

router.post('/add-module', ModuleController.AddModule)
router.post('/delete-module', ModuleController.DeleteModule)
router.post('/update-module', ModuleController.UpdateModule)

router.put('/update-module/:id', async (req, res) => {
  const moduleId = req.params.id;

  try {
    const updatedModule = await Module.findByIdAndUpdate(moduleId, req.body, { new: true });

    if (!updatedModule) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.json(updatedModule);
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/module/update/:moduleId', async (req, res) => {
  const { moduleId } = req.params;

  try {
    const updatedModule = await Module.findOneAndUpdate(
      { moduleid: moduleId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.json(updatedModule);
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/module/update-and-reset/:moduleId', async (req, res) => {
  const { moduleId } = req.params;

  try {
    // Update the module with the new data
    const updatedModule = await Module.findOneAndUpdate(
      { moduleid: moduleId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Reset specific properties to false
    await Module.updateOne({ moduleid: moduleId }, { $set: { add: false, edit: false, delete: false, view: false } });

    res.json(updatedModule);
  } catch (error) {
    console.error('Error updating module and resetting properties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/modules', async (req, res) => {
  try {
    const modules = await Module.find();
    res.status(200).json(modules)
  } catch (error) {
    res.status(500).json({ message: 'Error while module details.' });
  }
})

router.post('/module/reset-database', async (req, res) => {
  try {
    // Assuming you want to reset all modules to their default state
    const resetResult = await Module.updateMany({}, { add: false, edit: false, delete: false, view: false });

    res.json({ message: 'Module database reset successfully', resetResult });
  } catch (error) {
    console.error('Error resetting module database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router
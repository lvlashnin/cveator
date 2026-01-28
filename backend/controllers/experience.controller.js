const { Experience } = require('../models');

exports.createExperience = async (req, res) => {
  try {
    const { resumeId, company, role, duration, description } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'resumeId is required' });
    }

    const newExperience = await Experience.create({
      resumeId,
      company,
      role,
      duration,
      description,
    });

    res.status(201).json({ message: 'Experience added/created', experience: newExperience });
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ message: 'Server error during creating experience' });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, duration, description } = req.body;

    const updatedData = {};
    if (company !== undefined) updatedData.company = company;
    if (role !== undefined) updatedData.role = role;
    if (duration !== undefined) updatedData.duration = duration;
    if (description !== undefined) updatedData.description = description;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'No experience data to update' });
    }

    const [updatedRows] = await Experience.update(updatedData, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json({ message: 'experience updated successfully' });
  } catch (error) {
    console.error('error updating experience:', error);
    res.status(500).json({ message: 'server error during updating experience' });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Experience.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'experience not found' });
    }

    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('error deleting experience:', error);
    res.status(500).json({ message: 'server error during deleting experience' });
  }
};

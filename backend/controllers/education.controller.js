const { Education } = require('../models');

exports.createEducation = async (req, res) => {
  try {
    const { resumeId, university, degree, startDate, endDate } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'resumeId is required' });
    }

    const newEducation = await Education.create({
      resumeId,
      university,
      degree,
      startDate,
      endDate,
    });

    res.status(201).json({ message: 'education created', education: newEducation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during creating education' });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { university, degree, startDate, endDate } = req.body;

    const updatedData = {};
    if (university !== undefined) updatedData.university = university;
    if (degree !== undefined) updatedData.degree = degree;
    if (startDate !== undefined) updatedData.startDate = startDate;
    if (endDate !== undefined) updatedData.endDate = endDate;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'no data to update' });
    }

    const [updatedRows] = await Education.update(updatedData, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'education not found' });
    }

    res.json({ message: 'education updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during updating education' });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Education.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'education entry not found' });
    }

    res.json({ message: 'eucation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during deleting education' });
  }
};

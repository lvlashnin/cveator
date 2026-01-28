const { underscoredIf } = require('sequelize/lib/utils');
const { Hobby } = require('../models');

exports.createHobby = async (req, res) => {
  try {
    const { resumeId, name } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'resume id is required' });
    }

    const newHobby = await Hobby.create({
      resumeId,
      name,
    });

    res.status(201).json({ message: 'hobby created', hobby: newHobby });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error creating hobby' });
  }
};

exports.updateHobby = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedDate = {};

    if (name != undefined) updatedDate.name = name;

    if (Object.keys(updatedDate).length === 0) {
      return res.status(400).json({ message: 'no hobby data to update' });
    }

    const [updatedRows] = await Hobby.update(updatedDate, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'hobby not found' });
    }

    res.json({ message: 'hobby updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during updating hobby' });
  }
};

exports.deleteHobby = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Hobby.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'hobby not found' });
    }

    res.json({ message: 'hobby deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error deleting hobby' });
  }
};

const { Skill } = require('../models');

exports.createSkill = async (req, res) => {
  try {
    const { resumeId, name, level } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'resumeId is required' });
    }

    const newSkill = await Skill.create({
      resumeId,
      name,
      level,
    });

    res.status(201).json({ message: 'skill created', skill: newSkill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during creating skill' });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level } = req.body;

    const updatedData = {};
    if (name !== undefined) updatedData.name = name;
    if (level !== undefined) updatedData.level = level;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'no skill data to update' });
    }

    const [updatedRows] = await Skill.update(updatedData, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'skill not found' });
    }

    res.json({ message: 'skill updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during updating skill' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Skill.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'skill not found' });
    }

    res.json({ message: 'skill deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during deleting skill' });
  }
};

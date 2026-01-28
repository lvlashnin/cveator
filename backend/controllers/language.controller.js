const { Language } = require('../models');

exports.createLanguage = async (req, res) => {
  try {
    const { resumeId, language, level } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'resume id is required' });
    }

    const newLanguage = await Language.create({
      resumeId,
      language,
      level,
    });

    res.status(201).json({ message: 'language created', language: newLanguage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error creating language' });
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { language, level } = req.body;

    const updatedData = {};
    if (language !== undefined) updatedData.language = language;
    if (level !== undefined) updatedData.level = level;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'no new lenguage data' });
    }

    const [updatedRows] = await Language.update(updatedData, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'language not found' });
    }

    res.json({ message: 'language updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error updating language' });
  }
};

exports.deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Language.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'language not found' });
    }

    res.json({ message: 'language deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error deleting language' });
  }
};

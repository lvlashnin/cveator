const { PersonalDetails } = require('../models');

exports.getPersonalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const personalDetails = await PersonalDetails.findByPk(id);

    if (!personalDetails) {
      return res.status(404).json({ message: 'personalDetails not found' });
    }

    res.json(personalDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during getting personalDetails' });
  }
};

exports.createPersonalDetails = async (req, res) => {
  try {
    const userId = req.body.userId || 1;

    const { fullName, workEmail, phone, address, linkedin, github, website } = req.body;
    const newPersonalDetails = await PersonalDetails.create({
      userId,
      fullName,
      workEmail,
      phone,
      address,
      linkedin,
      github,
      website,
    });

    res.status(201).json({ message: 'personalDetails created', id: newPersonalDetails.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error creating personalDetails' });
  }
};

exports.updatePersonalDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const changes = req.body;

    const details = await PersonalDetails.findByPk(id);

    if (!details) {
      return res.status(404).json({ message: 'Personal details not found' });
    }

    await details.update(changes);

    return res.json(details);
  } catch (error) {
    console.error('Error updating personal details:', error);
    res.status(500).json({ message: 'Server error updating personal details' });
  }
};

exports.deletePersonalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPersonalDetails = await PersonalDetails.destroy({ where: { id } });

    if (deletedPersonalDetails === 0) {
      return res.status(404).json({ message: 'personalDetails not found' });
    }

    res.json({ message: 'personalDetails deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error during deleting PersonalDetails' });
  }
};

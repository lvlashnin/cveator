const { PersonalDetails } = require('../models');

exports.getPersonalDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const [details, created] = await PersonalDetails.findOrCreate({
      where: { userId: userId },
      defaults: {
        fullName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        jobTitle: '',
      },
    });

    res.json(details);
  } catch (error) {
    console.error('Get details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePersonalDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    let details = await PersonalDetails.findOne({ where: { userId } });

    if (details) {
      await details.update(updates);
    } else {
      details = await PersonalDetails.create({
        ...updates,
        userId: userId,
      });
    }

    res.json(details);
  } catch (error) {
    console.error('Update details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

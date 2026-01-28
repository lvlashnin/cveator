const { User, PersonalDetails } = require('../models');

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let details = await PersonalDetails.findOne({ where: { userId: id } });

    if (!details) {
      details = await PersonalDetails.create({
        userId: id,
        fullName: '',
        email: '',
        phone: '',
        jobTitle: '',
        address: '',
      });
    }

    const userWithDetails = user.toJSON();
    userWithDetails.personalDetails = details;

    res.json(userWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

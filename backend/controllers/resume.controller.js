const {
  User,
  Resume,
  PersonalDetails,
  Experience,
  Education,
  Skill,
  Language,
  Hobby,
} = require('../models');

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username'],
          include: [
            {
              model: PersonalDetails,
              as: 'personalDetails',
              attributes: ['fullName'],
            },
          ],
        },
      ],
      order: [['updatedAt', 'DESC']],
    });

    res.json(resumes);
  } catch (err) {
    console.error('couldn not get resumes list', err);
    res.status(500).json({ message: 'server error during fetching resumes' });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'loginEmail'],
          include: [{ model: PersonalDetails, as: 'personalDetails' }],
        },
        { model: Experience, as: 'experiences' },
        { model: Education, as: 'educations' },
        { model: Skill, as: 'skills' },
        { model: Language, as: 'languages' },
        { model: Hobby, as: 'hobbies' },
      ],
    });

    if (!resume) {
      return res.status(404).json({ message: 'resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('could not get resume by id', error);
    res.status(500).json({ message: 'server error during fetching resume by id' });
  }
};

exports.createResume = async (req, res) => {
  try {
    const userId = req.body.userId || 1;
    const title = 'Untitled Resume';

    const newResume = await Resume.create({ userId, title });

    res.status(201).json({ message: 'resume created', id: newResume.id });
  } catch (error) {
    console.error('server error during creating resume', error);

    res.status(500).json({ message: 'error creating resume' });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResumes = await Resume.destroy({ where: { id } });

    if (deletedResumes === 0) {
      return res.status(404).json({ message: 'resume not found' });
    }

    res.json({ message: 'resume deleted successfully' });
  } catch (err) {
    console.log('server error --', err);

    res.status(500).json({ message: 'server error during deleting resume' });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary } = req.body;
    const updatedData = {};
    if (title !== undefined) updatedData.title = title;
    if (summary !== undefined) updatedData.summary = summary;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: 'no new data to update' });
    }

    const [updatedRows] = await Resume.update(updatedData, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'resume not found or no data changes' });
    }

    res.json({ message: 'resume updated, success' });
  } catch (err) {
    console.error('update err', err);

    res.status(500).json({ message: 'err during updating resume' });
  }
};

//======================================================================
// const { Resume } = require('../models');

// exports.getAllResumes = async (req, res) => {
//   try {
//     const resumes = await Resume.findAll({
//       order: [['updatedAt', 'DESC']],
//     });
//     res.json(resumes);
//   } catch (err) {
//     console.error('could not get all resumes', err);

//     res.status(500).json({ message: 'server err during loading resumes' });
//   }
// };

// exports.getResumeById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const resume = await Resume.findbyPk(id);

//     if (!resume) {
//       return res.status(404).json({ message: 'no resume with such id---', id });
//     }
//     res.json(resume);
//   } catch (err) {
//     console.error('could not get resume with id---', req.id);

//     res.status(500).json({ message: 'server err during loading resume by id' });
//   }
// };

// exports.createResume = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const newResume = await Resume.create({ title, content });

//     res.status(201).json({
//       message: 'Resume created',
//       id: newResume.id,
//     });
//   } catch (err) {
//     console.error('server err during creating resume', err);
//     res.status(500).json({ message: 'err during creating resume' });
//   }
// };

// exports.updateResume = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, contetn } = req.body;
//     const [updatedRows] = await Resume.update({ title, content }, { where: { id } });

//     if (updatedRows === 0) {
//       return res.status(404).json({ message: 'resume not found, nothing changed' });
//     }

//     res.json({ message: 'resume updated successfully' });
//   } catch (err) {
//     console.error('server err during updating', err);
//     res.status(500).json({ message: 'err updating resume' });
//   }
// };

// exports.deleteResume = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedResume = await Resume.destroy({
//       where: { id },
//     });

//     if (deletedResume === 0) {
//       return res.status(404).json({ message: 'no resume with such id' });
//     }
//     res.json({ message: 'resume deleted, success' });
//   } catch (err) {
//     console.error('server err during deleting resume');
//     res.status(500).json({ message: 'error during deleting resume' });
//   }
// };

//=========================================================================================

// const db = require('../config/db');

// exports.getAllResumes = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT id, title, created_at FROM resumes');
//     res.json(rows);
//   } catch (error) {
//     console.error('smth wiht db', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// exports.getResumeById = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM resumes WHERE id = ?', [req.params.id]);

//     if (!rows.length) {
//       return res.status(404).json({ message: 'no resume with such id' });
//     }

//     res.json(rows[0]);
//   } catch (error) {
//     console.error('fault during searcheing resume by id', error);
//     res.status(500).json({ message: 'server error' });
//   }
// };

// exports.createResume = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const sql = 'INSERT INTO resumes (title, content) VALUES (?, ?)';
//     const resumeTitle = title || content?.personalDetails?.fullName || 'resume_from_db';
//     const [result] = await db.query(sql, [resumeTitle, JSON.stringify(content)]);

//     res.status(201).json({
//       message: 'Resume created',
//       id: result.insertId,
//     });
//   } catch (error) {
//     console.error('could not create resume', error);
//     res.status(500).json({ message: 'error due saving resume' });
//   }
// };

// exports.updateResume = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content } = req.body;

//     const sql = 'UPDATE resumes SET content = ?, title = ? WHERE id = ?';
//     const newTitle = title || content?.personalDetails?.fullName || 'Resume';
//     const [result] = await db.query(sql, [JSON.stringify(content), newTitle, id]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'no resume with such title' });
//     }
//     res.json({ message: 'Resume updated' });
//   } catch (err) {
//     console.error('error during updating', err);
//   }
// };

// exports.deleteResume = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const sql = 'DELETE FROM resumes WHERE id = ?';

//     const [result] = await db.query(sql, [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'NO cv with such id' });
//     }
//     res.json({ message: 'cv was deleted' });
//   } catch (err) {
//     console.error('deleting error', err);
//     res.status(500).json({ message: 'server error' });
//   }
// };

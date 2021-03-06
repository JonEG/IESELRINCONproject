/*
 *  Copyright (C) 2020 ThePringaos
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const Tutor = require('../models/Tutor');

const controller = 'tutor';

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Tutor.sync({ force: false })
  .then(() => {
    console.log(`SYNC MODEL ${controller.toUpperCase()}`);
  });

const tutorController = {};

tutorController.getAll = async (req, res) => {
  Tutor.findAll()
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      return res.json({ success: true, data: data });
    }).catch(err => {
      console.log(err);
    });
};

tutorController.getId = (req, res) => {
  const { id } = req.params;
  Tutor.findAll({ where: { id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else if (each.length === 0) {
        return res.json({ success: false, data: null });
      } else {
        res.status(400).json({ status: 'Unexpected error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

tutorController.add = (req, res) => {
  const { name } = req.body;
  Tutor.create({ name })
    .then(each => {
      if (each.id) {
        res.json({ success: true, message: 'Successfully added', id: each.id });
      } else {
        res.status(400).json({ status: `The ${controller} couldn't be added` });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

tutorController.edit = (req, res) => {
  // const {id}=req.params;
  const { id, name } = req.body;
  Tutor.update({ name },
    { where: { id } })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      if (data.length > 0) {
        res.json({ success: true, message: 'Successfully updated' });
      } else {
        res.status(400).json({ status: `The ${controller} couldn't be updated` });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

tutorController.delete = (req, res) => {
  const { id } = req.params;
  Tutor.destroy({ where: { id } })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      if (data === 1) {
        res.json({ success: true, message: 'Succesfully deleted' });
      } else {
        res.status(400).json({ status: `The ${controller} couldn't be deleted` });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = tutorController;

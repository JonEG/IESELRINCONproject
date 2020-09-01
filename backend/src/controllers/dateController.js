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

const Date = require('../models/Date');

const Professional = require('../models/Professional');
const DateType = require('../models/DateType');
const DateState = require('../models/DateState');

const controller = 'date';

/**
 * SYNC ALL MODELS WITH DB
 */
// sequelize.sync();
Date.sync({ force: false })
  .then(() => {
    console.log(`SYNC MODEL ${controller.toUpperCase()}`);
  });

const dateController = {};

dateController.getAll = async (req, res) => {
  Date.findAll({
    include: [Professional, DateType, DateState]
  })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      return res.json({ success: true, data: data });
    }).catch(err => {
      console.log(err);
    });
};

dateController.getId = (req, res) => {
  const { id } = req.params;
  Date.findAll({ where: { id } })
    .then(each => {
      if (each.length > 0) {
        const data = JSON.parse(JSON.stringify(each));
        return res.json({ success: true, data: data });
      } else if (each.length === 0) {
        return res.json({ success: false });
      } else {
        res.status(400).json({ status: 'Unexpected error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

dateController.getDate = (req, res) => {
  const { id, day } = req.body;

  // TODO get dateStateId confirmado from dateStates table, not like this.
  Date.findAll({
    include: [{ model: DateType }],
    where: { professionalId: id, date: day, dateStateId: 1 }
  })
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

dateController.add = (req, res) => {
  const { email, date, time, professionalId, dateTypeId, dateStateId } = req.body;
  Date.create({ email, date, time, professionalId, dateTypeId, dateStateId })
    .then(each => {
      if (each.id) {
        res.json({ success: true, message: 'Successfully added', id: each.id });
      } else {
        res.json({ status: `The ${controller} couldn't be added` });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

dateController.edit = (req, res) => {
  const { id, email, name, departmentId, roleId, comment } = req.body;
  Date.update({ email, name, departmentId, roleId, comment },
    {
      where: { id }
    })
    .then(each => {
      const data = JSON.parse(JSON.stringify(each));
      console.log(data);
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

dateController.modifyDateState = (id, dateStateId) => {
  let data = null;
  console.log('PARAMS', id, dateStateId);
  Date.update({ dateStateId: dateStateId },
    {
      where: { id: id }
    })
    .then(each => {
      data = JSON.parse(JSON.stringify(each));
      console.log('MY DATA ', data);
    })
    .catch(err => {
      console.log(err);
    });
  return data;
};

dateController.delete = (req, res) => {
  const { id } = req.params;
  Date.destroy({ where: { id } })
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
module.exports = dateController;

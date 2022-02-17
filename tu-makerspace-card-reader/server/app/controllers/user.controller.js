const db = require("../models");
const Users = db.user;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name ||!req.body.splash||!req.body.email) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      // Create a user
      const user = {
        name: req.body.name,
        splash: req.body.splash,
        email: req.body.email,
        fabTech: 0,
        mill: 0,
        lathe: 0,
        waterjet: 0,
        wood1: 0,
        wood2: 0,
        metal1: 0,
        metal2: 0,
      };
      // Save user in the database
      Users.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
};
// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {  name: { [Op.like]: `%${name}%` } } : null;
    Users.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};
// Find a single user with an id
exports.findOne = (req, res) => {
    exports.findOne = (req, res) => {
        const id = req.params.id;
        Users.findByPk(id)
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find User with id=${id}.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving User with id=" + id
            });
          });
      };
};
// Update a user by the id in the request
exports.update = (req, res) => {
    exports.update = (req, res) => {
        const id = req.params.id;
        Users.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "User was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating User with id=" + id
            });
          });
      };
};
// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};
// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Users.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        });
};
// Find all fabtech users
exports.findAllFabtechs = (req, res) => {
    exports.findAllPublished = (req, res) => {
        Users.findAll({ where: { fabTech: 1 } })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving fabTechs."
            });
          });
      };
};
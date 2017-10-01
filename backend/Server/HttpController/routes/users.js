var express = require('express');
var router = express.Router();

module.exports = function() {

  // GET users listing.
  router.get('/', async (req, res, next) => {
    let data = await this.server.db.sequelize.models.user.findAll()
    res.send(data);
  });
  // POST new user (via userManager or admin account)
  router.post('/', async (req, res, next) => {
    let data = await this.server.db.sequelize.models.user.create({
      firstName: 'Ted',
      lastName: 'Mosby',
      role: 'admin',
    })
    res.send(data)
  });
  // PUT modify an existing user
  router.put('/:id', async (req, res, next) => {
    let id = req.params.id;
    //if user, verify that id corresponds with id in token
    //else if userManager or admin, allow edit
    let user = await this.server.db.sequelize.models.user.findById(id)
    let resp = await user.update({firstName: "Barney", lastName: "Stinson"})
    res.send(resp)
  });
  // DELETE a user
  router.delete('/:id', async (req, res, next) => {
    // only allow userManager or admin
    let id = req.params.id;
    let user = await this.server.db.sequelize.models.user.findById(id)
    let resp = await user.destroy();
    res.send(resp)
  });
  return router
}

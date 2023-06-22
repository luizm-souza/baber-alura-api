const { service } = require('../models/index');

class ServiceController {

  static async getServices(req, res) {
    try {
        const allServices = await service.findAll()
        return res.status(200).json(allServices)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }

}

module.exports = ServiceController;

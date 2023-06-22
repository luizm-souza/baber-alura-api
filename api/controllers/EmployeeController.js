const { employees } = require('../models/index');

class EmployeeController {

  static async getEmployees(req, res) {
    try {
        const allEmployees = await employees.findAll()
        return res.status(200).json(allEmployees)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }


  static async deleteEmployee(req, res) {
    const { id } = req.params
    try {
        await employees.destroy({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(`O usuário de Id ${id} foi deletado com sucesso`)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }

}

module.exports = EmployeeController;

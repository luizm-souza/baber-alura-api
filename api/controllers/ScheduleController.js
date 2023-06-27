const { request } = require('express');
const { schedule } = require('../models/index');

class ScheduleController {

  static async createSchedule(req, res) {
    const clientId = req.user.sub;

    const {
      scheduleTime,
      barberId,
      serviceId
    } = req.body

    

    const newSchedule = {
      scheduleTime,
      clientId,
      barberId,
      serviceId
    }


    const scheduleTimeLocal = new Date(scheduleTime).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    try {
      const scheduleExists = await schedule.findOne({where: {scheduleTime: scheduleTime, barberId: barberId}})

      console.log(typeof barberId != 'number')

      if(typeof barberId != 'number' || typeof serviceId != 'number'){
        return res.status(401).json({message: `O Id do barbeiro e do serviço tem que ser um tipo Number`})
      }

      if(scheduleExists){
        return res.status(401).json({message: 'Horário não está disponível'})
      }
      const createNewSchedule = await schedule.create(newSchedule);
      return res.status(200).json(createNewSchedule);
    } catch (error) {
      return res.status(500).json(error.message);
    }
    
  }

  static async getSchedules(req, res) {
    try {
        const allSchedules = await schedule.findAll()
        return res.status(200).json(allSchedules)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }

  static async getByclientIdSchedules(req, res) {
    const clientId = req.user.sub
    try {
        const allSchedules = await schedule.findAll(
          {where: {clientId: clientId}}
        )
        return res.status(200).json(allSchedules)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }


  static async getByemployeesIdSchedules(req, res) {
    const employeeId = req.params.id
    console.log(employeeId)
    try {
        const allSchedules = await schedule.findAll(
          {where: {barberId: employeeId}}
        )
        const horarios = allSchedules.map((e) => {
          const dataBanco = e.scheduleTime;
          var dia = dataBanco.getDate()
          var mes = dataBanco.getMonth()+1
          var ano = dataBanco.getFullYear()
          const diaConvertido = `${dia}/${mes}/${ano}`
          console.log(diaConvertido)

          var hora = dataBanco.getHours()+4
          var minuto = dataBanco.getMinutes()
          const horaConvertida = `${hora}h${minuto}`
          console.log(horaConvertida)
          return {
            id: e.id,
            realTime: e.scheduleTime,
            date: diaConvertido,
            hour: horaConvertida,
            clientId: e.clientId,
            barberId: e.barberId,
            serviceId: e.serviceId,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
          }
        })
        return res.status(200).json(horarios)
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }

  static async deleteSchedule(req, res){
    const idSchedule = req.params.id
    const clientId = req.user.sub
    try {
      const verifyScheduleTime = await schedule.findOne({ where: {id: Number(idSchedule)} })
      
      const verifyScheduleTimeByClientId = await schedule.findOne({ where: {id: Number(idSchedule), clientId: clientId} })

      console.log(verifyScheduleTime)

      if(!verifyScheduleTime){
        return res.status(401).json({message: `Horário não existente`})
      }else{
        if(!verifyScheduleTimeByClientId){
          return res.status(401).json({message: `Não é permitido apagar o horário de outro cliente`})
        }
      }

      const scheduleTime = verifyScheduleTime.scheduleTime

      const currentTime = new Date();
      const differenceInHours = Math.floor((scheduleTime - currentTime) / (1000 * 60 * 60));

      if(differenceInHours < 1){
        return res.status(400).json('O horário só pode ser desmarcado com no máximo 1 hora de antecedência')
      }

      await schedule.destroy({
        where: {
          id: Number(idSchedule)
        }
      });
      return res.status(200).json(`O horário ${idSchedule} foi desmarcado`)
  } catch (error) {
      return res.status(500).json(error.message)
  }
  }

}

module.exports = ScheduleController;

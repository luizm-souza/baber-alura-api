'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      schedule.belongsTo(models.client, { foreignKey: 'clientId' });
      schedule.belongsTo(models.employees, { foreignKey: 'barberId' });
      schedule.belongsTo(models.service, { foreignKey: 'serviceId' });
    }
  }
  schedule.init({
    scheduleTime: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    barberId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'schedule',
  });
  return schedule;
};
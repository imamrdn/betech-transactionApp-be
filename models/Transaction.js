"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association between Transaction and User
      Transaction.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("income", "expense"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Name of the related model
          key: "id", // Primary key in the related model
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "Transactions",
      timestamps: true,
    }
  );

  return Transaction;
};

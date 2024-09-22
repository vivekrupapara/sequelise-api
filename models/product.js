const {  DataTypes } = require('sequelize');
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");


class Product extends Model {}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hsn_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other product fields as needed
}, {
    ...getTableConfigs(sequelize, "products"),
    indexes: [
    {
      unique: true,
      fields: ['user_id', 'hsn_code'],  // Unique constraint
    },
  ],
});

Product.associate = (models) =>{
    Product.belongsTo(models.Users, {
        foreignKey: "user_id",
        targetKey: "id",
      });
}

module.exports = Product;

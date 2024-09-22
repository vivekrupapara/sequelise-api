const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");
const bcrypt = require("bcryptjs");

class Users extends Model {
  // Set display name
  setDisplayName() {
    this.display_name = `${this.first_name} ${this.last_name}`;
  }
  // verify password
  isValidPassword(password) {
    // Log the input password and the hashed password for debugging


    const result = bcrypt.compareSync(password, this.password);
    // Log the comparison result

    return result;
  }

}

Users.init(
  {
    first_name: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING(75),
    },
    email: {
      type: DataTypes.STRING(75),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(10),
    },
    bio: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user', 'consumer'], // Define your roles here
      allowNull: false,
      defaultValue: 'user', // Set a default role if needed
    },
  },
  {
    ...getTableConfigs(sequelize, "users"),
    hooks: {
      beforeCreate: (user) => {
        user.setDisplayName();
      },
    },
  }
);

Users.associate = (models) => {
  console.log('models: ', models);
  Users.hasMany(models.EmailSendHistory, {
    foreignKey: "user_id",
    sourceKey: "id",
  });
  Users.hasMany(models.Products, {
    foreignKey: "user_id",
    sourceKey: "id",
  });
};

module.exports = Users;

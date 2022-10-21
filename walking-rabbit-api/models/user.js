module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(100),
      },
    },
    {
      indexes: [
        {
          fields: ['email'],
          unique: true,
        },
      ],
    }
  );
};

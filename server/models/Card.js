module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define("Card", {
        cardname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cardnumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CVV: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // date: {
        //     type: DataTypes.DATEONLY,
        //     allowNull: false
        // }
    });

    Card.associate = (models) => {
        Card.belongsTo(models.User, {
        foreignKey: "userId",
        as: 'user'
        });
        }

    return Card;
}

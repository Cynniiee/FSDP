module.exports = (sequelize, DataTypes) => {
const Events = sequelize.define("Event", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        constraints: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        evdate: {
            type:DataTypes.DATE,
            allowNull: false
        }
    });
    return Events;
}
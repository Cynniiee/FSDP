module.exports = (sequelize, DataTypes) => {
    const CarRental = sequelize.define("CarRental", {
        carPlateNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carLocation: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        carBattery: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return CarRental;
}
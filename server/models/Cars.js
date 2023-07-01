module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define("Car", {
        carPlateNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carMakeModel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carLastMaintained: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carBattery: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carRates: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carLease: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Car;
}
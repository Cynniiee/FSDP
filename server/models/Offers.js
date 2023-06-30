module.exports = (sequelize, DataTypes) => {
    const Offers = sequelize.define("Offers", {
        brandName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        offerTitle: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        numberOfPoints: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    return Offers;
};

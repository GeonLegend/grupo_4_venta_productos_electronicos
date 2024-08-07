module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define
    (
        "Product",
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(120),
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            discount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            
            image: {
                type: DataTypes.STRING(300),
                allowNull: false,
                defaultValue: "default.png",
            },
            idCategory: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,  
                field: "id_category",
            },
            idProductFeatures: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
                field: "id_product_features",
            },
        },{
            tableName: "products",
            timestamps: false,
        } 
    );

    Product.associate = function (models){
        Product.belongsTo(models.Category, {
            as: "categorias",
            foreignKey: "id_category"
        }),
        Product.belongsTo(models.ProductFeatures, {
            as: "productoCaracteristicas",
            foreignKey: "id_product_features"
        }),
        Product.belongsToMany(models.User, {
            as: "usuarios",
            through: "users_products",
            foreignKey: "id_product",
            otherKey: "id_user",
            timestamps: false
        }),
        Product.belongsToMany(models.Cart, {
            as: "carritoDeProductos",
            through: models.CartProduct,
            foreignKey: "id_product",
            otherKey: "id_cart",
            timestamps: false
        })
    }
    
    return Product;

}

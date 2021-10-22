import { DataTypes } from 'sequelize';

const uuidPrimaryKey = () => ( {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
} );

export default uuidPrimaryKey;

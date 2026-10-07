import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../db/connection.js";

// Tabla: books
// ────────────
// id          INTEGER PK AUTOINCREMENT
// title       VARCHAR(200) NOT NULL
// year        INTEGER      NOT NULL
// author_id   INTEGER      NOT NULL  FK → authors.id
// available   BOOLEAN      NOT NULL  DEFAULT true

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare role: string;
  declare passwordHash: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(200), allowNull: false },
    role: { type: DataTypes.STRING(200), allowNull: false },
    passwordHash: { type: DataTypes.STRING(200), allowNull: false }

  },
  { sequelize, tableName: "users", timestamps: false }
);

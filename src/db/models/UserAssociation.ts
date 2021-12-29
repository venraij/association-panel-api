import { AllowNull, Column, CreatedAt, DeletedAt, ForeignKey, IsUUID, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Association } from './Association.js';
import { User } from './User.js';

@Table({
  paranoid: true,
  defaultScope: {
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    },
  },
  scopes: {
    userList: {
      attributes: [],
    },
  },
})
export class UserAssociation extends Model {
    @IsUUID(4)
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
      userId: string;

    @IsUUID(4)
    @PrimaryKey
    @ForeignKey(() => Association)
    @Column
      associationId: string;

    @AllowNull(false)
    @CreatedAt
    @Column
      createdAt: Date;

    @AllowNull(false)
    @UpdatedAt
    @Column
      updatedAt: Date;

    @AllowNull(true)
    @DeletedAt
    @Column
      deletedAt: Date;
}

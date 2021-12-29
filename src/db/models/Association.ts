import { AllowNull, BelongsToMany, Column, CreatedAt, DeletedAt, IsUUID, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { User } from './User.js';
import { UserAssociation } from './UserAssociation.js';

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
      attributes: [
        'name',
      ],
    },
  },
})
export class Association extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column
      id: string;

    @AllowNull(false)
    @Unique
    @Column
      name: string;

    @AllowNull(true)
    @Column
      websiteUrl: string;

    @AllowNull(true)
    @Column
      logoUrl: string;

    @BelongsToMany(() => User, () => UserAssociation)
      users: User[];

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

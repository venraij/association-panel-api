import { AllowNull, Column, CreatedAt, DeletedAt, IsUUID, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';

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
    jwt: {
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'studentId',
        'createdAt',
      ],
    },
  },
})
export class User extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column
      id: string;

    @AllowNull(false)
    @Unique
    @Column
      email: string;

    @AllowNull(false)
    @Column
      passwordHash: string;

    @AllowNull(true)
    @Column
      firstName: string;

    @AllowNull(true)
    @Column
      lastName: string;

    @AllowNull(true)
    @Unique
    @Column
      studentId: string;

    @AllowNull(false)
    @Column
      confirmedEmail: boolean;

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

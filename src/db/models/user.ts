import { AllowNull, Column, CreatedAt, DeletedAt, IsUUID, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

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
        'name',
        'type',
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
    @Column
      email: string;

    @AllowNull(false)
    @Column
      passwordHash: string;

    @AllowNull(false)
    @Column
      firstName: string;

    @AllowNull(false)
    @Column
      lastName: string;

    @AllowNull(false)
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

import { Table, Column, Model, PrimaryKey, IsUUID, AllowNull, HasMany, Unique } from 'sequelize-typescript';
import { Voter } from './voter';

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
})
export class Organizer extends Model<Organizer> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @AllowNull(false)
  @Column
  name: string

  @AllowNull(false)
  @Unique(true)
  @Column
  email: string

  @HasMany(() => Voter)
  voters: Voter[]
}

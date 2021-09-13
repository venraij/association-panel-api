import { AllowNull, BelongsTo, Column, ForeignKey, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Organizer } from './organizer';

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
export class Voter extends Model<Voter> {
    @IsUUID(4)
    @PrimaryKey
    @Column
    id: string;

    @AllowNull(false)
    @Column
    email: string

    @AllowNull(false)
    @Column
    votingPin: string;

    @ForeignKey(() => Organizer)
    @Column
    organizerId: string

    @BelongsTo(() => Organizer)
    organizer: Organizer
}

import { Request, Response } from 'express';
import { UserAssociation } from '../../db/models/UserAssociation.js';
import { v4 } from 'uuid';
import { Association } from '../../db/models/Association.js';
import { sequelizeOptions } from '../../sequelize.js';
import { IJwtData } from '../../interfaces/jwtData.interface.js';
import { User } from '../../db/models/User.js';

/**
 * POST /v1/association
 * Expects association data
 * Returns the created association
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function create(req: Request, res: Response): Promise<void> {
  const name: string = req.body.name;
  const websiteUrl: string = req.body.websterUrl;
  const logoUrl: string = req.body.logoUrl;
  const userId: string = (req.headers.user as unknown as IJwtData).user.id;

  if (!name) {
    res.status(400).send({ error: 'Missing name' });
  } else {
    try {
      const existingAssociation = await Association.findOne({
        where: {
          name,
        },
      });

      if (existingAssociation) {
        res.status(409).send({ error: 'Association already exists' });
        return;
      }

      await sequelizeOptions.transaction(async (transaction) => {
        const association = await Association.create({
          id: v4(),
          name,
          websiteUrl,
          logoUrl,
        });

        await UserAssociation.create({
          userId,
          associationId: association.id,
        });

        res.status(201).send(association);
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err});
    }
  }
}

/**
 * GET /v1/association/user/all/:associationId
 * Get all the associations users
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function getAssociationUsers(req: Request, res: Response): Promise<void> {
  const id: string = req.params.associationId;
  const userId: string = (req.headers.user as unknown as IJwtData).user.id;

  if (!id) {
    res.status(400).send({ error: 'Missing association id' });
  } else {
    try {
      const users = await User.scope('userList').findAll({
        include: [
          { model: Association.scope('userList'), where: { id } },
          { model: UserAssociation.scope('userList'), where: { userId } },
        ],
      });

      res.status(200).send({ users });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err});
    }
  }
}

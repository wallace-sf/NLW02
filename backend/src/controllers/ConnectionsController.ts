/* eslint-disable camelcase */
import { Request, Response } from 'express';

import db from '../database/connection';

class ConnectionsController {
  async index(req: Request, res: Response) {
    const [{ total }] = await db('connections').count('* as total');

    return res.json({ total });
  }

  async store(req: Request, res: Response) {
    const { user_id } = req.body;

    try {
      await db('connections').insert({
        user_id,
      });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({
        message: 'Unexpected error while creating connection',
      });
    }
  }
}

export default new ConnectionsController();

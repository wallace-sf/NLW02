/* eslint-disable camelcase */
import { Request, Response } from 'express';

import db from '../database/connection';
import convertHoursToMInutes from '../utils/convertHoursToMInutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

interface Filters {
  week_day: string;
  subject: string;
  time: string;
}

class ClassesController {
  async index(req: Request, res: Response) {
    const filters: Filters = req.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search classes',
      });
    }

    const timeInMinutes = convertHoursToMInutes(filters.time);

    try {
      const classes = await db('classes')
        .whereExists(function () {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [
              Number(filters.week_day),
            ])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
        })
        .where('classes.subject', '=', filters.subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

      return res.json(classes);
    } catch (err) {
      return res.status(400).json({
        message: 'Search failed',
      });
    }
  }

  async store(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const trx = await db.transaction();

    try {
      const [user_id] = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const [class_id] = await trx('classes').insert({
        subject,
        cost,
        user_id,
      });

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHoursToMInutes(scheduleItem.from),
          to: convertHoursToMInutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({
        message: 'Unexpected error while creating new class',
      });
    }
  }
}

export default new ClassesController();

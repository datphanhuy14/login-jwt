import Entity from '../entity';
import db from '../models';
import * as bcrypt from 'bcryptjs';
import { helper } from '../helpers';


class userEntity extends Entity {
  constructor() {
    super(db.users);
  }
  async create(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const check = await db.users.findOne({ where: { email: params.email } });
        if (check) reject({
          message: '{{common.emailValid}}'
        });
        else {
          const createUser = await db.users.create({
            ...params,
            password: bcrypt.hashSync(params.password, bcrypt.genSaltSync(10)),
          });
          return resolve(createUser);
        }

        reject({
          message: '{{common.cantFetch}}'
        });
      } catch (error) {
        reject(helper.displayErrorMessage(error));
      }
    });
  }

  list(options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await this._model.scope("associated").findAndCountAll(options).then((record) => {
          if (record) {
            record = JSON.parse(JSON.stringify(record));
            record.rows.forEach((element) => {
              delete element.password;
            });
            return resolve(record);
          }
          reject({
            message: '{{common.cantFetch}}',
          });
        });
      } catch (error) {
        reject(helper.displayErrorMessage(error));
      }
    });
  }
}
export default new userEntity;

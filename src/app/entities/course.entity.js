const Entity = require('../entity').default;
const models = require('../models').default;
import { helper } from '../helpers';
import { subjectEntity } from '../entities';


class courseEntity extends Entity {
  constructor() {
    super(models.courses);
  }
  list(options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await this._model.scope("associated").findAndCountAll(options).then(async (record) => {
          if (record) {
            record = JSON.parse(JSON.stringify(record));
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
module.exports = new courseEntity;

// import validator from 'validator';
// import _ from 'lodash';
// //=== import internal ===
// import { helper } from '../helpers';
const _ = require('lodash');
const {helper} = require('../helpers');
const validator = require('validator');

class Entity {
  constructor(model) {
    this._model = model;
  }

  get model() {
    return this._model;
  }

  set model(model) {
    this._model = model;

    return this._model;
  }

  convertCreate(params) {
    return params;
  }

  list(options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await this._model.findAndCount(options).then((record) => {
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

  detail(id, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id || (id && !validator.isNumeric(id.toString()))) {
          return reject({
            message: '{{common.paramInvalid}}',
          });
        }

        // === process find ===
        await this._model.findById(id, options).then((detail) => {
          if (!detail) {
            return reject({
              message: '{{common.recordNotFound}}',
            });
          }
          detail = JSON.parse(JSON.stringify(detail));

          resolve(detail);
        });
      } catch (error) {
        reject(helper.displayErrorMessage(error));
      }
    });
  }

  create(params, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await this._model.create(this.convertCreate(params, options)).then(async (record) => {
          await this._model.findById(record.id).then((newRecord) => {
            if (newRecord) {
              newRecord = JSON.parse(JSON.stringify(newRecord));
              return resolve(newRecord);
            }

            reject({
              message: '{{error.unableToCreate}}',
            });
          });
        });
      } catch (error) {
        reject(helper.displayErrorMessage(error));
      }
    });
  }

  update(id, params) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id) {
          return reject({
            message: '{{error.cantIdentity}}',
          });
        }

        await this._model
            .update(params, {
              where: {
                id,
              },
            })
            .then(async (updatedRows) => {
              await this._model.findById(id).then((newRecord) => {
                if (newRecord) {
                  newRecord = JSON.parse(JSON.stringify(newRecord));
                  return resolve(newRecord);
                }

                reject({
                  message: '{{error.unableToUpdate}}',
                });
              });
            });
      } catch (error) {
        reject(helper.displayErrorMessage(error));
      }
    });
  }

  delete(id, record = {}, options) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id) {
          return reject({
            message: '{{error.cantIdentity}}',
          });
        }

        options.where = Object.assign({}, _.get(options, 'where') || {}, {
          id,
        });

        await this._model.destroy(options).then((affected) => {
          if (affected === 0) {
            return reject({
              message: '{{common.itemNotFound}}',
            });
          }

          if (affected === 1) {
            return resolve({
              data: record,
              message: '{{common.itemDeleted}}',
            });
          }

          resolve({
            data: record,
            message: '{{common.itemsDeleted}}',
          });
        });
      } catch (error) {
        reject(helper.displayErrorMessage(error));
      }
    });
  }
}

module.exports = Entity;

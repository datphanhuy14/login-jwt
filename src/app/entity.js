/* eslint-disable no-setter-return */
/* eslint-disable no-async-promise-executor */
/* eslint-disable prefer-promise-reject-errors */
import { get } from 'lodash';
import { helper } from './helpers';
import { isNumeric } from 'validator';

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
    async create2(fields) {
        const instance = await this._model.create(fields);
        return instance;
    }
    list(options = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                await this._model.findAndCountAll(options).then((record) => {
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
                if (!id || (id && !isNumeric(id.toString()))) {
                    return reject({
                        message: '{{common.paramInvalid}}',
                    });
                }

                // === process find ===
                await this._model.findByPk(id, options).then((detail) => {
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
                await this._model
                    .create(this.convertCreate(params, options))
                    .then(async (record) => {
                        await this._model.findByPk(record.id).then((newRecord) => {
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
                        await this._model.findByPk(id).then((newRecord) => {
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

                options.where = Object.assign({}, get(options, 'where') || {}, {
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

export default Entity;

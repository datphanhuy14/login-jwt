/* eslint-disable no-unused-vars */
/* eslint-disable no-setter-return */
/* eslint-disable no-async-promise-executor */
const validator =  require('validator');
const {helper} = require('./helpers')
module.exports =  class Enity {
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

    findOne(options = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                //=== process find ===
                await this._model
                    .findOne(options)
                    .then(detail => {
                        if (!detail) {
                            return reject({
                                message: '{{common.recordNotFound}}'
                            });
                        }
                        resolve(detail);
                    })
                    .catch(error => {
                        reject(helper.displayErrorMessage(error));
                    });
            } catch (error) {
                reject(helper.displayErrorMessage(error));
            }
        });
    }

    list(options = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                await this._model
                    .findAndCount(options)
                    .then(record => {
                        if (record) {
                            return resolve(record);
                        }

                        reject({
                            message: '{{common.cantFetch}}'
                        });
                    })
                    .catch(error => {
                        reject(helper.displayErrorMessage(error));
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
                        message: '{{common.paramInvalid}}'
                    });
                }

                //=== process find ===
                await this._model
                    .findById(id, options)
                    .then(detail => {
                        if (!detail) {
                            return reject({
                                message: '{{common.recordNotFound}}'
                            });
                        }

                        resolve(detail);
                    })
                    .catch(error => {
                        reject(helper.displayErrorMessage(error));
                    });
            } catch (error) {
                reject(helper.displayErrorMessage(error));
            }
        });
    }

    create(params) {
        return new Promise(async (resolve, reject) => {
            try {
                await this._model
                    .create(params)
                    .then(async record => {
                        await this._model
                            .findById(record.id)
                            .then(newRecord => {
                                if (newRecord) {
                                    return resolve(newRecord);
                                }

                                reject({
                                    message: '{{error.unableToCreate}}'
                                });
                            })
                            .catch(error => {
                                reject(helper.displayErrorMessage(error));
                            });
                    })
                    .catch(error => {
                        reject(helper.displayErrorMessage(error));
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
                        message: '{{error.cantIdentity}}'
                    });
                }

                await this._model
                    .update(params, {
                        where: {
                            id
                        }
                    })
                    .then(async updatedRows => {
                        await this._model
                            .findById(id)
                            .then(newRecord => {
                                if (newRecord) {
                                    return resolve(newRecord);
                                }

                                reject({
                                    message: '{{error.unableToUpdate}}'
                                });
                            })
                            .catch(error => {
                                reject(helper.displayErrorMessage(error));
                            });
                    })
                    .catch(error => {
                        reject(helper.displayErrorMessage(error));
                    });
            } catch (error) {
                reject(helper.displayErrorMessage(error));
            }
        });
    }

    delete(id, record = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return reject({
                        message: '{{error.cantIdentity}}'
                    });
                }

                await this._model
                    .destroy({
                        where: {
                            id
                        }
                    })
                    .then(affected => {
                        if (affected === 0) {
                            return reject({
                                message: '{{common.itemNotFound}}'
                            });
                        }

                        if (affected === 1) {
                            return resolve({
                                data: record,
                                message: '{{common.itemDeleted}}'
                            });
                        }

                        resolve({
                            data: record,
                            message: '{{common.itemsDeleted}}'
                        });
                    })
                    .catch(error => {
                        reject(helper.displayErrorMessage(error));
                    });
            } catch (error) {
                reject(helper.displayErrorMessage(error));
            }
        });
    }
}

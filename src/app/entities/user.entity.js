/* eslint-disable no-async-promise-executor */
import Entity from '../entity';
import db from '../models';
import * as bcrypt from 'bcryptjs';
import { helper } from '../helpers';
import { jwtHelper } from '../helpers';
const debug = console.log.bind(console);
import { compareSync } from 'bcryptjs';
import { omit } from 'lodash';
import * as conf from '../config/jwt.config';
const tokenList = {};



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
    
    async login(params) {
        return new Promise(async (resolve, reject) => {
            try {
                // email and password
                const email = params.email;
                const password = params.password;
                let user = await db.users.findOne({
                    where: {
                        email: email,
                    },
                    raw: true,
                });
                if (!user) {
                    reject({
                        message: '{{User not exist}}',
                    });
                }
                const comparePass = compareSync(password, user.password);
                if (!comparePass) {
                    reject({
                        message: '{{Password incorrect}}',
                    });
                }
                const accessToken = await jwtHelper.generateToken(
                    user,
                    conf.accessTokenSecret,
                    conf.accessTokenLife,
                );
                const refreshToken = await jwtHelper.generateToken(
                    user,
                    conf.refreshTokenSecret,
                    conf.refreshTokenLife,
                );

                tokenList[refreshToken] = { accessToken, refreshToken };
                user = omit(user, ['password']);
                return resolve({ user, accessToken, refreshToken });
            } catch (error) {
                return reject(helper.displayErrorMessage(error));
            }
        });
    }

    async refreshToken(params) {
        return new Promise(async (resolve, reject) => {
            const refreshTokenFromClient = params.refreshToken;
            try {
                if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {

                    const decoded = await jwtHelper.verifyToken(
                        refreshTokenFromClient,
                        conf.refreshTokenSecret,
                    );
                    const user = decoded.data;
                    const accessToken = await jwtHelper.generateToken(
                        user,
                        conf.accessTokenSecret,
                        conf.accessTokenLife,
                    );
                    resolve(accessToken);
                }
                else {
                    return reject(
                        helper.displayErrorMessage({
                            message: 'No token provided.',
                        }),
                    );
                }
            }
            catch (error) {
                debug(error);
                return reject(
                    helper.displayErrorMessage(error),
                );
            }
        });
    }
}
export default new userEntity;

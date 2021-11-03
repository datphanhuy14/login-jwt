const _ = require("lodash");
const Sequelize = require("sequelize");
import models from "../models";

const specific = ["like", "notLike", "iLike", "notILike"];
const operators = {
    "=": Sequelize.Op.eq,
    eq: Sequelize.Op.eq,
    ">": Sequelize.Op.gt,
    gt: Sequelize.Op.gt,
    ">=": Sequelize.Op.gte,
    gte: Sequelize.Op.gte,
    "<": Sequelize.Op.lt,
    lt: Sequelize.Op.lt,
    "<=": Sequelize.Op.lte,
    lte: Sequelize.Op.lte,
    "!=": Sequelize.Op.ne,
    ne: Sequelize.Op.ne,
    in: Sequelize.Op.in,
    notIn: Sequelize.Op.notIn,
    like: Sequelize.Op.like,
    notLike: Sequelize.Op.notLike,
    iLike: Sequelize.Op.iLike,
    notILike: Sequelize.Op.notILike,
    regexp: Sequelize.Op.regexp,
    notRegexp: Sequelize.Op.notRegexp
};

export class Query {
    static init(req, res, next) {
        const { options } = req;
        const paginate = Query.paginate(req);
        const where = Query.where(req);
        const order = Query.sort(req);
        console.log('paginate', paginate);
        console.log('where', where);
        console.log('order', order);
        Object.assign(req, {
            paginate,
            where,
            order,
            options: Object.assign(
                {},
                paginate,
                {
                    where: Object.assign(
                        {},
                        _.get(options, "where") || {},
                        _.get(where, "where")
                    )
                },
                order
                // {
                //     include : [
                //         models.courses
                //     ]
                // }
            )
        });

        next();
    }
    static where(req) {
        let { filter } = req.query;
        const where = {};

        if (Query.isJson(filter)) {
            filter = JSON.parse(filter);
            if (Array.isArray(filter) && !_.isEmpty(filter)) {
                filter.forEach((field) => {
                    const { operator, property } = field;
                    let { value } = field;

                    if (property && operator && operators[operator]) {
                        if (specific.indexOf(operator) >= 0) {
                            value = `%${value}%`;
                        }

                        Object.assign(where, {
                            [property]: {
                                [operators[operator]]: value
                            }
                        });
                    }
                });
            }
        }

        return { where };
    }

    static sort(req) {
        let { sort } = req.query;
        const order = [];

        if (!Query.isJson(sort)) {
            return order;
        }

        sort = JSON.parse(sort);

        if (Array.isArray(sort) && !_.isEmpty(sort)) {
            sort.forEach((field) => {
                order.push([field.property, field.direction]);
            });
        }
        

        return {
            order
        };
    }

    static paginate(req) {
        const { limit = 10, start = 0 } = req.query;
        const paginate = {};

        if (limit) {
            paginate.limit = limit;
            if (limit > 10) {
                paginate.limit = 10;
            }
        }

        if (start) {
            paginate.offset = start;
        }

        return paginate;
    }

    static isJson(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}

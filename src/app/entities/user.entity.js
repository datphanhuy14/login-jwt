const entity =require ('../entity');
const models = require ('../models');
// import randomstring from 'randomstring';


module.exports = new class EntityExtend extends entity {
    constructor() {
        super(models.Users);
    }

}();

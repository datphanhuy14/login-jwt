// const {restRoutes} = require('../../helpers');
// const {level} = require('../../controllers');
const {levelEntity: selfEntity} = require( '../../entities/' );
const express = require( 'express' );
const {helper} = require( '../../helpers' );

class Controller {
  // === init router ===
  constructor() {
    const router = express.Router();

    router
        .route( '/' )
        .get( this.list )
        .post( this.create );

    router
        .route( '/:id(\\d+)/' )
        .get( this.read )
        .put( this.update )
        .delete( this.remove );

    router.param( 'id', this.getById );

    return router;
  }

  async list( req, res ) {
    try {
      const {options} = req;
      selfEntity
          .list( options )
          .then( async ( datas ) => {
            res.status( 200 ).json(
                helper.formatOutputData( datas, '{{common.success}}' ),
            );
          } )
          .catch( ( report ) => {
            res.status( 400 ).json( report );
          } );
    } catch ( error ) {
      res.status( 500 ).json( helper.displayErrorMessage( error ) );
    }
  }

  async read( req, res ) {
    try {
      res.status( 200 ).json(
          helper.formatOutputData( req.detail, '{{success.common}}' ),
      );
    } catch ( error ) {
      res.status( 500 ).json( helper.displayErrorMessage( error ) );
    }
  }

  async create( req, res ) {
    try {
      selfEntity
          .create( req.body )
          .then( ( report ) => {
            res.status( 200 ).json(
                helper.formatOutputData( report, '{{success.common}}' ),
            );
          } )
          .catch( ( report ) => {
            res.status( 400 ).json( report );
          } );
    } catch ( error ) {
      res.status( 500 ).json( helper.displayErrorMessage( error ) );
    }
  }

  async update( req, res ) {
    try {
      selfEntity
          .update( req.detail.id, req.body )
          .then( ( report ) => {
            res.status( 200 ).json(
                helper.formatOutputData( report, '{{success.common}}' ),
            );
          } )
          .catch( ( report ) => {
            res.status( 400 ).json( report );
          } );
    } catch ( error ) {
      res.status( 500 ).json( helper.displayErrorMessage( error ) );
    }
  }

  async remove( req, res ) {
    try {
      selfEntity
          .delete( req.detail.id, req.detail, {} )
          .then( ( report ) => {
            const {data, message} = report;

            res.status( 200 ).json(
                helper.formatOutputData( data, message ),
            );
          } )
          .catch( ( report ) => {
            res.status( 400 ).json( report );
          } );
    } catch ( error ) {
      res.status( 500 ).json( helper.displayErrorMessage( error ) );
    }
  }

  async getById( req, res, next, id ) {
    try {
      selfEntity
          .detail( id )
          .then( ( data ) => {
            req.detail = data;
            next();
          } )
          .catch( ( report ) => {
            res.status( 400 ).json( report );
          } );
    } catch ( error ) {
      res.status( 500 ).json( helper.displayErrorMessage( error ) );
    }
  }
}

// const routes = restRoutes(level);
module.exports = new Controller;

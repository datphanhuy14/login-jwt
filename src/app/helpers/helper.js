
const http = require( 'http' );
const https = require( 'https' );
const url = require( 'url' );
const querystring = require( 'querystring' );
const _ = require( 'lodash' );

class Helper {
  constructor() { }

  formatOutputData( data, message, additionalProperties = {} ) {
    const result = {};

    result.data = typeof data === 'object' ? data : null;

    result.message = message ? message : '{{common.success}}';

    Object.assign( result, additionalProperties );

    return result;
  }

  async formatDataTracker( req, data, message ) {
    const result = {};

    result.data = typeof data === 'object' ? data : null;

    if ( result.data ) {
      const {rows, createdBy, updatedBy} = result.data;

      let userIds = [];

      if ( createdBy ) {
        userIds.push( createdBy );
      }

      if ( updatedBy ) {
        userIds.push( updatedBy );
      }

      if ( rows && !_.isEmpty( rows ) ) {
        for ( const row of rows ) {
          const {createdBy, updatedBy} = row;
          userIds.push( createdBy );
          userIds.push( updatedBy );

          if ( row.lessons && !_.isEmpty( rows ) ) {
            for ( const lesson of row.lessons ) {
              const {createdBy, updatedBy} = lesson;
              userIds.push( createdBy );
              userIds.push( updatedBy );
            }
          }
        }
      }

      userIds = _.uniq( userIds );

      if ( !_.isEmpty( userIds ) ) {
        const users = await req.app.service( {
          service: 'users',
          mod: 'users',
          act: 'list',
          options: {
            where: {
              id: userIds,
            },
          },
        } );

        if ( users && users.rows && !_.isEmpty( users.rows ) ) {
          if ( rows && !_.isEmpty( rows ) ) {
            for ( const row of rows ) {
              row.createdBy = _.find( users.rows, {id: row.createdBy} );
              row.updatedBy = _.find( users.rows, {id: row.updatedBy} );

              if ( row.lessons ) {
                for ( const lesson of row.lessons ) {
                  lesson.createdBy = _.find( users.rows, {id: lesson.createdBy} );
                  lesson.updatedBy = _.find( users.rows, {id: lesson.updatedBy} );
                }
              }

              if ( row.trainingLessons ) {
                for ( const trainingLesson of row.trainingLessons ) {
                  trainingLesson.createdBy = _.find( users.rows, {id: trainingLesson.createdBy} );
                  trainingLesson.updatedBy = _.find( users.rows, {id: trainingLesson.updatedBy} );
                }
              }
            }
          }

          if ( createdBy ) {
            result.data.createdBy = _.find( users.rows, {id: createdBy} );
          }

          if ( updatedBy ) {
            result.data.updatedBy = _.find( users.rows, {id: updatedBy} );
          }
        }
      }
    }

    result.message = message ? message : '{{common.success}}';

    return result;
  }

  displayErrorMessage( error ) {
    const result = {
      message: {},
    };

    try {
      // === SQL string error ===
      if ( typeof error == 'object' && !error.errors ) {
        result.message = '{{common.somethingWentWrong}}';

        if ( error.original && error.original.detail ) {
          result.message = error.original.detail;
        }
      }

      // === validation error ===
      if ( error && error.errors && Array.isArray( error.errors ) ) {
        error.errors.forEach( ( error ) => {
          if ( error.type === 'Validation error' || error.type === 'notNull Violation' ) {
            if (
              typeof result.message == 'string' ||
                            ( typeof result.message == 'object' && !result.message.validation )
            ) {
              result.message = {
                validation: true,
              };
            }

            result.message[error.path] = error.message;
          } else {
            result.message = this.ucFirst( error.message );
          }
        } );
      }

      // === excetion ===
      if ( typeof error == 'object' && error.message && !error.errors ) {
        result.message = error.message;
      }

      // === other ===
      if (
        !( ( typeof error == 'object' && !error.errors ) || ( error && error.errors && Array.isArray( error.errors ) ) )
      ) {
        result.message = this.ucFirst( error );
      }
    } catch ( exception ) {
      result.message = '{{common.somethingWentWrong}}';
    }

    return result;
  }

  /**
     * Turn the string to camel case
     * @param str
     * @return {string}
     */
  camelize( str ) {
    return str.trim().replace( /[-_\s]+(.)?/g, ( match, c ) => c.toUpperCase() );
  }

  /**
     * Uppercase first char
     * @param str
     * @return {string}
     */
  ucFirst( str ) {
    if ( str ) {
      return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
    }

    return str;
  }
  /**
     * Validate a json string
     * @param str
     * @return {boolean}
     */
  isValidJson( str ) {
    try {
      JSON.parse( str );
      return true;
    } catch ( e ) {
      return false;
    }
  }

  /**
     * Curl
     * @param object settings
     * @return {object}
     */
  curl( settings ) {
    return new Promise( ( resolve, reject ) => {
      const options = url.parse( `${settings.callUrl}` );

      options.method = settings.method ? settings.method : 'GET';
      options.data = settings.data ? settings.data : {};
      options.headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      };

      if ( settings.token ) {
        options.headers.Authorization = 'Bearer ' + settings.token;
      }

      const caller = options.protocol === 'https:' ? https : http;
      const data = [];
      const req = caller.request( options, ( res ) => {
        res
            .on( 'data', ( chunk ) => {
              data.push( chunk );
            } )
            .on( 'end', () => {
              try {
                const stringData = Buffer.concat( data ).toString();
                if ( res.statusCode === 404 ) {
                  return reject( stringData );
                }

                const parsedData = JSON.parse( stringData );
                if ( res.statusCode !== 200 ) {
                  return reject( parsedData );
                }

                resolve( parsedData );
              } catch ( e ) {
                reject( e );
              }
            } );
      } );

      req.on( 'error', ( e ) => {
        reject( e );
      } );

      req.write( querystring.stringify( options.data ) );
      req.end();
    } );
  }
}

module.exports = new Helper();

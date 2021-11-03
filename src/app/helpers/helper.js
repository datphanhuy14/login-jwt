
import http from 'http';
import https from 'https';
import { parse } from 'url';
import { stringify } from 'querystring';

class Helper {
    constructor() { }

    formatOutputData( data, message, additionalProperties = {} ) {
        const result = {};

        result.data = typeof data === 'object' ? data : null;

        result.message = message ? message : '{{common.success}}';

        Object.assign( result, additionalProperties );

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
            const options = parse( `${settings.callUrl}` );

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

            req.write( stringify( options.data ) );
            req.end();
        } );
    }
}

export default new Helper();

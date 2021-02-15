export = InternalOpenIDError;
/**
 * `InternalOpenIDError` error.
 *
 * InternalOpenIDError wraps errors generated by node-openid.  By wrapping these
 * objects, error messages can be formatted in a manner that aids in debugging
 * OpenID issues.
 *
 * @api public
 */
declare function InternalOpenIDError(message: any, err: any): void;
declare class InternalOpenIDError {
    /**
     * `InternalOpenIDError` error.
     *
     * InternalOpenIDError wraps errors generated by node-openid.  By wrapping these
     * objects, error messages can be formatted in a manner that aids in debugging
     * OpenID issues.
     *
     * @api public
     */
    constructor(message: any, err: any);
    name: string;
    message: any;
    openidError: any;
    toString(): string;
}

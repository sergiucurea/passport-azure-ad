export = InternalOAuthError;
/**
 * `InternalOAuthError` error.
 *
 * InternalOAuthError wraps errors generated by node-oauth.  By wrapping these
 * objects, error messages can be formatted in a manner that aids in debugging
 * OAuth issues.
 *
 * @api public
 */
declare function InternalOAuthError(message: any, err: any): void;
declare class InternalOAuthError {
    /**
     * `InternalOAuthError` error.
     *
     * InternalOAuthError wraps errors generated by node-oauth.  By wrapping these
     * objects, error messages can be formatted in a manner that aids in debugging
     * OAuth issues.
     *
     * @api public
     */
    constructor(message: any, err: any);
    name: string;
    message: any;
    oauthError: any;
    toString(): string;
}

export = Strategy;
/**
 * Applications must supply a `verify` callback, for which the function
 * signature is:
 *
 *     function(token, done) { ... }
 * or
 *     function(req, token, done) { ... }
 *
 * The latter enables you to use the request object. In order to use this
 * signature, the passReqToCallback value in options (see the Options instructions
 * below) must be set true, so the strategy knows you want to pass the request
 * to the `verify` callback function.
 *
 * `token` is the verified and decoded bearer token provided as a credential.
 * The verify callback is responsible for finding the user who posesses the
 * token, and invoking `done` with the following arguments:
 *
 *     done(err, user, info);
 *
 * If the token is not valid, `user` should be set to `false` to indicate an
 * authentication failure.  Additional token `info` can optionally be passed as
 * a third argument, which will be set by Passport at `req.authInfo`, where it
 * can be used by later middleware for access control.  This is typically used
 * to pass any scope associated with the token.
 *
 *
 * Options:
 *
 *   - `identityMetadata`   (1) Required
 *                          (2) must be a https url string
 *                          (3) Description:
 *                          the metadata endpoint provided by the Microsoft Identity Portal that provides
 *                          the keys and other important info at runtime. Examples:
 *                          <1> v1 tenant-specific endpoint
 *                          - https://login.microsoftonline.com/your_tenant_name.onmicrosoft.com/.well-known/openid-configuration
 *                          - https://login.microsoftonline.com/your_tenant_guid/.well-known/openid-configuration
 *                          <2> v1 common endpoint
 *                          - https://login.microsoftonline.com/common/.well-known/openid-configuration
 *                          <3> v2 tenant-specific endpoint
 *                          - https://login.microsoftonline.com/your_tenant_name.onmicrosoft.com/v2.0/.well-known/openid-configuration
 *                          - https://login.microsoftonline.com/your_tenant_guid/v2.0/.well-known/openid-configuration
 *                          <4> v2 common endpoint
 *                          - https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration
 *
 *                          Note: you cannot use common endpoint for B2C
 *
 *   - `clientID`           (1) Required
 *                          (2) must be a string
 *                          (3) Description:
 *                          The Client ID of your app in AAD
 *
 *   - `validateIssuer`     (1) Required to set to false if you don't want to validate issuer, default value is true
 *                          (2) Description:
 *                          For common endpoint, you should either set `validateIssuer` to false, or provide the `issuer`, or provide `tenantIdOrName`
 *                          in passport.authenticate, since otherwise we cannot grab the `issuer` value from metadata.
 *                          For non-common endpoint, we use the `issuer` from metadata, and `validateIssuer` should be always true
 *
 *   - `issuer`             (1) Required if set `validateIssuer` to true, but there is no way to get the issuer. For example, when you are using
 *                          common endpoint, but you don't provide `tenantIdOrName` in passport.authenticate.
 *                          (2) must be a string or an array of strings
 *                          (3) Description:
 *                          For common endpoint, we use the `issuer` provided.
 *                          For non-common endpoint, if the `issuer` is not provided, we use the issuer provided by metadata
 *
 *   - `passReqToCallback`  (1) Required to set true if you want to use the `function(req, token, done)` signature for the verify function, default is false
 *                          (2) Description:
 *                          Set `passReqToCallback` to true use the `function(req, token, done)` signature for the verify function
 *                          Set `passReqToCallback` to false use the `function(token, done)` signature for the verify function
 *
 *   - `isB2C`              (1) Required to set to true for using B2C, default value is false
 *
 *   - `policyName`         (1) Required for using B2C
 *                          (2) Description:
 *                          policy name. Should be a string starting with 'B2C_1_' (case insensitive)
 *
 *
 *   - `allowMultiAudiencesInToken`
 *                          (1) Required if you allow access_token whose `aud` claim contains multiple values
 *                          (2) Description:
 *                          The default value is false
 *
 *   - `scope`              (1) Optional
 *                          (2) Array of accepted scopes.
 *                          (3) Description:
 *                          If `scope` is provided, we will validate if access token contains any of the scopes listed in `scope`.
 *
 *   - `loggingLevel`       (1) Optional
 *                          (2) must be 'info', 'warn', 'error'
 *                          (3) Description:
 *                          logging level
 *
 *   - `loggingNoPII`       (1) Optional, default value is true
 *                          (2) Description:
 *                          If this is set to true, no personal information such as tokens and claims will be logged.
 *
 *   - `audience`           (1) Optional
 *                          (2) must be a string or an array of strings
 *                          (3) Description:
 *                          We invalidate the `aud` claim in access_token against `audience`. The default value is `clientID`
 *
 *   - `clockSkew`          (1) Optional
 *                          (2) must be a positive integer
 *                          (3) Description:
 *                          the clock skew (in seconds) allowed in token validation, default value is CLOCK_SKEW
 * Examples:
 *
 *     passport.use(new BearerStrategy(
 *       options,
 *       function(token, done) {
 *         User.findById(token.sub, function (err, user) {
 *           if (err) { return done(err); }
 *           if (!user) { return done(null, false); }
 *           return done(null, user, token);
 *         });
 *       }
 *     ));
 *
 * The name of this strategy is 'oauth-bearer', so use this name as the first
 * parameter of the authenticate function. Moreover, we don't need session
 * support for request containing bearer tokens, so the session option can be
 * set to false.
 *
 *     app.get('/protected_resource',
 *       passport.authenticate('oauth-bearer', {session: false}),
 *       function(req, res) {
 *         ...
 *       });
 *
 *
 * For further details on HTTP Bearer authentication, refer to [The OAuth 2.0 Authorization Protocol: Bearer Tokens]
 * (http://tools.ietf.org/html/draft-ietf-oauth-v2-bearer)
 * For further details on JSON Web Token, refert to [JSON Web Token](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token)
 *
 * @param {object} options - The Options.
 * @param {Function} verify - The verify callback.
 * @constructor
 */
declare function Strategy(options: object, verifyFn: any): void;
declare class Strategy {
    /**
     * Applications must supply a `verify` callback, for which the function
     * signature is:
     *
     *     function(token, done) { ... }
     * or
     *     function(req, token, done) { ... }
     *
     * The latter enables you to use the request object. In order to use this
     * signature, the passReqToCallback value in options (see the Options instructions
     * below) must be set true, so the strategy knows you want to pass the request
     * to the `verify` callback function.
     *
     * `token` is the verified and decoded bearer token provided as a credential.
     * The verify callback is responsible for finding the user who posesses the
     * token, and invoking `done` with the following arguments:
     *
     *     done(err, user, info);
     *
     * If the token is not valid, `user` should be set to `false` to indicate an
     * authentication failure.  Additional token `info` can optionally be passed as
     * a third argument, which will be set by Passport at `req.authInfo`, where it
     * can be used by later middleware for access control.  This is typically used
     * to pass any scope associated with the token.
     *
     *
     * Options:
     *
     *   - `identityMetadata`   (1) Required
     *                          (2) must be a https url string
     *                          (3) Description:
     *                          the metadata endpoint provided by the Microsoft Identity Portal that provides
     *                          the keys and other important info at runtime. Examples:
     *                          <1> v1 tenant-specific endpoint
     *                          - https://login.microsoftonline.com/your_tenant_name.onmicrosoft.com/.well-known/openid-configuration
     *                          - https://login.microsoftonline.com/your_tenant_guid/.well-known/openid-configuration
     *                          <2> v1 common endpoint
     *                          - https://login.microsoftonline.com/common/.well-known/openid-configuration
     *                          <3> v2 tenant-specific endpoint
     *                          - https://login.microsoftonline.com/your_tenant_name.onmicrosoft.com/v2.0/.well-known/openid-configuration
     *                          - https://login.microsoftonline.com/your_tenant_guid/v2.0/.well-known/openid-configuration
     *                          <4> v2 common endpoint
     *                          - https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration
     *
     *                          Note: you cannot use common endpoint for B2C
     *
     *   - `clientID`           (1) Required
     *                          (2) must be a string
     *                          (3) Description:
     *                          The Client ID of your app in AAD
     *
     *   - `validateIssuer`     (1) Required to set to false if you don't want to validate issuer, default value is true
     *                          (2) Description:
     *                          For common endpoint, you should either set `validateIssuer` to false, or provide the `issuer`, or provide `tenantIdOrName`
     *                          in passport.authenticate, since otherwise we cannot grab the `issuer` value from metadata.
     *                          For non-common endpoint, we use the `issuer` from metadata, and `validateIssuer` should be always true
     *
     *   - `issuer`             (1) Required if set `validateIssuer` to true, but there is no way to get the issuer. For example, when you are using
     *                          common endpoint, but you don't provide `tenantIdOrName` in passport.authenticate.
     *                          (2) must be a string or an array of strings
     *                          (3) Description:
     *                          For common endpoint, we use the `issuer` provided.
     *                          For non-common endpoint, if the `issuer` is not provided, we use the issuer provided by metadata
     *
     *   - `passReqToCallback`  (1) Required to set true if you want to use the `function(req, token, done)` signature for the verify function, default is false
     *                          (2) Description:
     *                          Set `passReqToCallback` to true use the `function(req, token, done)` signature for the verify function
     *                          Set `passReqToCallback` to false use the `function(token, done)` signature for the verify function
     *
     *   - `isB2C`              (1) Required to set to true for using B2C, default value is false
     *
     *   - `policyName`         (1) Required for using B2C
     *                          (2) Description:
     *                          policy name. Should be a string starting with 'B2C_1_' (case insensitive)
     *
     *
     *   - `allowMultiAudiencesInToken`
     *                          (1) Required if you allow access_token whose `aud` claim contains multiple values
     *                          (2) Description:
     *                          The default value is false
     *
     *   - `scope`              (1) Optional
     *                          (2) Array of accepted scopes.
     *                          (3) Description:
     *                          If `scope` is provided, we will validate if access token contains any of the scopes listed in `scope`.
     *
     *   - `loggingLevel`       (1) Optional
     *                          (2) must be 'info', 'warn', 'error'
     *                          (3) Description:
     *                          logging level
     *
     *   - `loggingNoPII`       (1) Optional, default value is true
     *                          (2) Description:
     *                          If this is set to true, no personal information such as tokens and claims will be logged.
     *
     *   - `audience`           (1) Optional
     *                          (2) must be a string or an array of strings
     *                          (3) Description:
     *                          We invalidate the `aud` claim in access_token against `audience`. The default value is `clientID`
     *
     *   - `clockSkew`          (1) Optional
     *                          (2) must be a positive integer
     *                          (3) Description:
     *                          the clock skew (in seconds) allowed in token validation, default value is CLOCK_SKEW
     * Examples:
     *
     *     passport.use(new BearerStrategy(
     *       options,
     *       function(token, done) {
     *         User.findById(token.sub, function (err, user) {
     *           if (err) { return done(err); }
     *           if (!user) { return done(null, false); }
     *           return done(null, user, token);
     *         });
     *       }
     *     ));
     *
     * The name of this strategy is 'oauth-bearer', so use this name as the first
     * parameter of the authenticate function. Moreover, we don't need session
     * support for request containing bearer tokens, so the session option can be
     * set to false.
     *
     *     app.get('/protected_resource',
     *       passport.authenticate('oauth-bearer', {session: false}),
     *       function(req, res) {
     *         ...
     *       });
     *
     *
     * For further details on HTTP Bearer authentication, refer to [The OAuth 2.0 Authorization Protocol: Bearer Tokens]
     * (http://tools.ietf.org/html/draft-ietf-oauth-v2-bearer)
     * For further details on JSON Web Token, refert to [JSON Web Token](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token)
     *
     * @param {object} options - The Options.
     * @param {Function} verify - The verify callback.
     * @constructor
     */
    constructor(options: object, verifyFn: any);
    name: string;
    _verify: any;
    _options: any;
    jwtVerify(req: any, token: any, metadata: any, optionsToValidate: any, done: any): any;
    authenticate(req: any, options: any): void;
    loadMetadata(params: any, next: any): any;
    failWithLog(message: any): any;
}

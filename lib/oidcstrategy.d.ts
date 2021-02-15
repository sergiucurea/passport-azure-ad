export = Strategy;
/**
 * Applications must supply a `verify` callback, for which the function
 * signature is:
 *
 *     function(token, done) { ... }
 * or
 *     function(req, token, done) { .... }
 *
 * (passReqToCallback must be set true in options in order to use the second signature.)
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
 *   - `clientID`           (1) Required
 *                          (2) must be a string
 *                          (3) Description:
 *                          The Client ID of your app in AAD
 *
 *   - `responseType`       (1) Required
 *                          (2) must be 'code', 'code id_token', 'id_token code' or 'id_token'
 *                          (3) Description:
 *                          For login only flows use 'id_token'. For accessing resources use `code id_token`, 'id_token code' or `code`
 *
 *   - `responseMode`       (1) Required
 *                          (2) must be 'query' or 'form_post'
 *                          (3) Description:
 *                          How you get the authorization code and tokens back
 *
 *   - `redirectUrl`        (1) Required
 *                          (2) must be a https url string, unless you set `allowHttpForRedirectUrl` to true
 *                          (3) Description:
 *                          The reply URL registered in AAD for your app
 *
 *   - `allowHttpForRedirectUrl`
 *                          (1) Required to set to true if you want to use http url for redirectUrl
 *                          (2) Description:
 *                          The default value is false. It's OK to use http like 'http://localhost:3000' in the
 *                          dev environment, but in production environment https should always be used.
 *
 *   - `clientSecret`       (1) This option only applies when `responseType` is 'code', 'id_token code' or 'code id_token'.
 *                              To redeem an authorization code, we can use either client secret flow or client assertion flow.
 *                              (1.1) For B2C, clientSecret is required since client assertion is not supported
 *                              (1.2) For non-B2C, both flows are supported. Developer must provide either clientSecret, or
 *                                    thumbprint and privatePEMKey. We use clientSecret if it is provided, otherwise we use
 *                                    thumbprint and privatePEMKey for the client assertion flow.
 *                          (2) must be a string
 *                          (3) Description:
 *                          The app key of your app from AAD.
 *                          NOTE: For B2C, the app key sometimes contains '\', please replace '\' with '\\' in the app key, otherwise
 *                          '\' will be treated as the beginning of a escaping character
 *
 *   - `thumbprint`         (1) Required if you want to use client assertion to redeem an authorization code (non-B2C only)
 *                          (2) must be a base64url encoded string
 *                          (3) Description:
 *                          The thumbprint (hash value) of the public key
 *
 *   - `privatePEMKey`      (1) Required if you want to use client assertion to redeem an authorization code (non-B2C only)
 *                          (2) must be a pem key
 *                          (3) Description:
 *                          The private key used to sign the client assertion JWT
 *
 *   - `isB2C`              (1) Required for B2C
 *                          (2) must be true for B2C, default is false
 *                          (3) Description:
 *                          set to true if you are using B2C, default is false
 *
 *   - `validateIssuer`     (1) Required to set to false if you don't want to validate issuer, default is true
 *                          (2) Description:
 *                          For common endpoint, you should either set `validateIssuer` to false, or provide the `issuer`, since
 *                          we cannot grab the `issuer` value from metadata.
 *                          For non-common endpoint, we use the `issuer` from metadata, and `validateIssuer` should be always true
 *
 *   - `issuer`             (1) Required if you are using common endpoint and set `validateIssuer` to true, or if you want to specify the allowed issuers
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
 *   - `useCookieInsteadOfSession`
 *                          (1) Required to set true if you don't want to use session. Default value is false.
 *                          (2) Description:
 *                          Passport-azure-ad needs to save state and nonce somewhere for validation purpose. If this option is set true, it will encrypt
 *                          state and nonce and put them into cookie. If this option is false, we save state and nonce in session.
 *
 *   - `cookieEncryptionKeys`
 *                          (1) Required if `useCookieInsteadOfSession` is true.
 *                          (2) Description:
 *                          This must be an array of key items. Each key item has the form { key: '...', iv: '...' }, where key is any string of length 32,
 *                          and iv is any string of length 12.
 *                          We always use the first key item with AES-256-GCM algorithm to encrypt cookie, but we will try every key item when we decrypt
 *                          cookie. This helps when you want to do key roll over.
 *
 *   - `cookieDomain`       (1) Optional
 *                          (2) must be a string
 *                          (3) Description:
 *                          The domain name of the cookie used to save state (see `useCookieInsteadOfSession`)
 *
 *   - `scope`              (1) Optional
 *                          (2) must be a string or an array of strings
 *                          (3) Description:
 *                          list of scope values indicating the required scope of the access token for accessing the requested
 *                          resource. Ex: ['email', 'profile'].
 *                          We send 'openid' by default. For B2C, we also send 'offline_access' (to get refresh_token) and
 *                          clientID (to get access_token) by default.
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
 *   - `nonceLifetime`      (1) Optional
 *                          (2) must be a positive integer
 *                          (3) Description:
 *                          the lifetime of nonce in session or cookie, default value is NONCE_LIFE_TIME
 *
 *   - `nonceMaxAmount`     (1) Optional
 *                          (2) must be a positive integer
 *                          (3) Description:
 *                          the max amount of nonce in session or cookie, default value is NONCE_MAX_AMOUNT
 *
 *   - `clockSkew`          (1) Optional
 *                          (2) must be a positive integer
 *                          (3) Description:
 *                          the clock skew (in seconds) allowed in token validation, default value is CLOCK_SKEW
 *
 *   - `proxy`              (1) Optional
 *                          (2) Description:
 *                          the configuration parameters for HttpsProxyAgent
 *
 * Examples:
 *
 * passport.use(new OIDCStrategy({
 *     identityMetadata: config.creds.identityMetadata,
 *     clientID: config.creds.clientID,
 *     responseType: config.creds.responseType,
 *     responseMode: config.creds.responseMode
 *     redirectUrl: config.creds.redirectUrl,
 *     allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
 *     clientSecret: config.creds.clientSecret,
 *     thumbprint: config.creds.thumbprint,
 *     privatePEMKey: config.crecs.privatePEMKey,
 *     isB2C: config.creds.isB2C,
 *     validateIssuer: config.creds.validateIssuer,
 *     issuer: config.creds.issuer,
 *     scope: config.creds.scopes,
 *     passReqToCallback: config.creds.passReqToCallback,
 *     loggingLevel: config.creds.loggingLevel,
 *     loggingNoPII: config.creds.loggingNoPII,
 *     nonceLifetime: config.creds.nonceLifetime,
 *     useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
 *     cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
 *     cookieSameSite: boolean
 *   },
 *   function(token, done) {
 *     User.findById(token.sub, function (err, user) {
 *       if (err) { return done(err); }
 *       if (!user) { return done(null, false); }
 *       return done(null, user, token);
 *     });
 *   }
 * ));
 *
 * For further details on HTTP Bearer authentication, refer to [The OAuth 2.0 Authorization Protocol: Bearer Tokens](http://tools.ietf.org/html/draft-ietf-oauth-v2-bearer)
 * For further details on JSON Web Token, refert to [JSON Web Token](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token)
 *
 * @param {object} options - The Options.
 * @param {Function} verify - The verify callback.
 * @constructor
 */
declare function Strategy(options: object, verify: Function): void;
declare class Strategy {
    /**
     * Applications must supply a `verify` callback, for which the function
     * signature is:
     *
     *     function(token, done) { ... }
     * or
     *     function(req, token, done) { .... }
     *
     * (passReqToCallback must be set true in options in order to use the second signature.)
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
     *   - `clientID`           (1) Required
     *                          (2) must be a string
     *                          (3) Description:
     *                          The Client ID of your app in AAD
     *
     *   - `responseType`       (1) Required
     *                          (2) must be 'code', 'code id_token', 'id_token code' or 'id_token'
     *                          (3) Description:
     *                          For login only flows use 'id_token'. For accessing resources use `code id_token`, 'id_token code' or `code`
     *
     *   - `responseMode`       (1) Required
     *                          (2) must be 'query' or 'form_post'
     *                          (3) Description:
     *                          How you get the authorization code and tokens back
     *
     *   - `redirectUrl`        (1) Required
     *                          (2) must be a https url string, unless you set `allowHttpForRedirectUrl` to true
     *                          (3) Description:
     *                          The reply URL registered in AAD for your app
     *
     *   - `allowHttpForRedirectUrl`
     *                          (1) Required to set to true if you want to use http url for redirectUrl
     *                          (2) Description:
     *                          The default value is false. It's OK to use http like 'http://localhost:3000' in the
     *                          dev environment, but in production environment https should always be used.
     *
     *   - `clientSecret`       (1) This option only applies when `responseType` is 'code', 'id_token code' or 'code id_token'.
     *                              To redeem an authorization code, we can use either client secret flow or client assertion flow.
     *                              (1.1) For B2C, clientSecret is required since client assertion is not supported
     *                              (1.2) For non-B2C, both flows are supported. Developer must provide either clientSecret, or
     *                                    thumbprint and privatePEMKey. We use clientSecret if it is provided, otherwise we use
     *                                    thumbprint and privatePEMKey for the client assertion flow.
     *                          (2) must be a string
     *                          (3) Description:
     *                          The app key of your app from AAD.
     *                          NOTE: For B2C, the app key sometimes contains '\', please replace '\' with '\\' in the app key, otherwise
     *                          '\' will be treated as the beginning of a escaping character
     *
     *   - `thumbprint`         (1) Required if you want to use client assertion to redeem an authorization code (non-B2C only)
     *                          (2) must be a base64url encoded string
     *                          (3) Description:
     *                          The thumbprint (hash value) of the public key
     *
     *   - `privatePEMKey`      (1) Required if you want to use client assertion to redeem an authorization code (non-B2C only)
     *                          (2) must be a pem key
     *                          (3) Description:
     *                          The private key used to sign the client assertion JWT
     *
     *   - `isB2C`              (1) Required for B2C
     *                          (2) must be true for B2C, default is false
     *                          (3) Description:
     *                          set to true if you are using B2C, default is false
     *
     *   - `validateIssuer`     (1) Required to set to false if you don't want to validate issuer, default is true
     *                          (2) Description:
     *                          For common endpoint, you should either set `validateIssuer` to false, or provide the `issuer`, since
     *                          we cannot grab the `issuer` value from metadata.
     *                          For non-common endpoint, we use the `issuer` from metadata, and `validateIssuer` should be always true
     *
     *   - `issuer`             (1) Required if you are using common endpoint and set `validateIssuer` to true, or if you want to specify the allowed issuers
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
     *   - `useCookieInsteadOfSession`
     *                          (1) Required to set true if you don't want to use session. Default value is false.
     *                          (2) Description:
     *                          Passport-azure-ad needs to save state and nonce somewhere for validation purpose. If this option is set true, it will encrypt
     *                          state and nonce and put them into cookie. If this option is false, we save state and nonce in session.
     *
     *   - `cookieEncryptionKeys`
     *                          (1) Required if `useCookieInsteadOfSession` is true.
     *                          (2) Description:
     *                          This must be an array of key items. Each key item has the form { key: '...', iv: '...' }, where key is any string of length 32,
     *                          and iv is any string of length 12.
     *                          We always use the first key item with AES-256-GCM algorithm to encrypt cookie, but we will try every key item when we decrypt
     *                          cookie. This helps when you want to do key roll over.
     *
     *   - `cookieDomain`       (1) Optional
     *                          (2) must be a string
     *                          (3) Description:
     *                          The domain name of the cookie used to save state (see `useCookieInsteadOfSession`)
     *
     *   - `scope`              (1) Optional
     *                          (2) must be a string or an array of strings
     *                          (3) Description:
     *                          list of scope values indicating the required scope of the access token for accessing the requested
     *                          resource. Ex: ['email', 'profile'].
     *                          We send 'openid' by default. For B2C, we also send 'offline_access' (to get refresh_token) and
     *                          clientID (to get access_token) by default.
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
     *   - `nonceLifetime`      (1) Optional
     *                          (2) must be a positive integer
     *                          (3) Description:
     *                          the lifetime of nonce in session or cookie, default value is NONCE_LIFE_TIME
     *
     *   - `nonceMaxAmount`     (1) Optional
     *                          (2) must be a positive integer
     *                          (3) Description:
     *                          the max amount of nonce in session or cookie, default value is NONCE_MAX_AMOUNT
     *
     *   - `clockSkew`          (1) Optional
     *                          (2) must be a positive integer
     *                          (3) Description:
     *                          the clock skew (in seconds) allowed in token validation, default value is CLOCK_SKEW
     *
     *   - `proxy`              (1) Optional
     *                          (2) Description:
     *                          the configuration parameters for HttpsProxyAgent
     *
     * Examples:
     *
     * passport.use(new OIDCStrategy({
     *     identityMetadata: config.creds.identityMetadata,
     *     clientID: config.creds.clientID,
     *     responseType: config.creds.responseType,
     *     responseMode: config.creds.responseMode
     *     redirectUrl: config.creds.redirectUrl,
     *     allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
     *     clientSecret: config.creds.clientSecret,
     *     thumbprint: config.creds.thumbprint,
     *     privatePEMKey: config.crecs.privatePEMKey,
     *     isB2C: config.creds.isB2C,
     *     validateIssuer: config.creds.validateIssuer,
     *     issuer: config.creds.issuer,
     *     scope: config.creds.scopes,
     *     passReqToCallback: config.creds.passReqToCallback,
     *     loggingLevel: config.creds.loggingLevel,
     *     loggingNoPII: config.creds.loggingNoPII,
     *     nonceLifetime: config.creds.nonceLifetime,
     *     useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
     *     cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
     *     cookieSameSite: boolean
     *   },
     *   function(token, done) {
     *     User.findById(token.sub, function (err, user) {
     *       if (err) { return done(err); }
     *       if (!user) { return done(null, false); }
     *       return done(null, user, token);
     *     });
     *   }
     * ));
     *
     * For further details on HTTP Bearer authentication, refer to [The OAuth 2.0 Authorization Protocol: Bearer Tokens](http://tools.ietf.org/html/draft-ietf-oauth-v2-bearer)
     * For further details on JSON Web Token, refert to [JSON Web Token](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token)
     *
     * @param {object} options - The Options.
     * @param {Function} verify - The verify callback.
     * @constructor
     */
    constructor(options: object, verify: Function);
    _options: any;
    name: string;
    _verify: Function;
    _passReqToCallback: boolean;
    _useCookieInsteadOfSession: boolean;
    _sessionContentHandler: SessionContentHandler;
    _cookieContentHandler: CookieContentHandler;
    _key: any;
    log: any;
    authenticate(req: any, options: any): void;
    collectInfoFromReq(params: any, req: any, next: any, response: any): any;
    setOptions(params: any, oauthConfig: any, optionsToValidate: any, done: Function): void;
    _idTokenHandler(params: string, optionsToValidate: string, req: any, next: Function, callback: Function): any;
    _validateResponse(params: string, optionsToValidate: string, req: any, next: Function, callback: Function): any;
    _errorResponseHandler(err: any, err_description: any, next: any): any;
    _implicitFlowHandler(params: any, optionsToValidate: any, req: any, next: any): any;
    _hybridFlowHandler(params: any, oauthConfig: any, optionsToValidate: any, req: any, next: any): any;
    _authCodeFlowHandler(params: any, oauthConfig: any, optionsToValidate: any, req: any, next: any, iss: any, sub: any): void;
    _flowInitializationHandler(oauthConfig: any, req: any, next: any): any;
    _getAccessTokenBySecretOrAssertion(code: any, oauthConfig: any, next: any, callback: any): void;
    failWithLog(message: any): any;
}
import SessionContentHandler_1 = require("./sessionContentHandler");
import SessionContentHandler = SessionContentHandler_1.SessionContentHandler;
import CookieContentHandler_1 = require("./cookieContentHandler");
import CookieContentHandler = CookieContentHandler_1.CookieContentHandler;

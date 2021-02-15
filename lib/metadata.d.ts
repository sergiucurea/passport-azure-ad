export function Metadata(url: any, authtype: any, options: any): void;
export class Metadata {
    constructor(url: any, authtype: any, options: any);
    url: any;
    metadata: any;
    authtype: any;
    loggingNoPII: any;
    httpsProxyAgent: any;
    updateOidcMetadata(doc: any, next: any): void;
    oidc: {
        algorithms: any;
        authorization_endpoint: any;
        end_session_endpoint: any;
        issuer: any;
        token_endpoint: any;
        userinfo_endpoint: any;
    };
    generateOidcPEM(kid: any): never;
    fetch(callback: any): void;
}
export namespace Metadata {
    const url: any;
    const oidc: any;
    const metadata: any;
    const httpsProxyAgent: any;
}

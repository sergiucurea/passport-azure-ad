export function CookieContentHandler(maxAmount: any, maxAge: any, cookieEncryptionKeys: any, domain: any, cookieSameSite: any): void;
export class CookieContentHandler {
    constructor(maxAmount: any, maxAge: any, cookieEncryptionKeys: any, domain: any, cookieSameSite: any);
    maxAge: number;
    maxAmount: number;
    cookieSameSite: boolean;
    cookieEncryptionKeys: any[];
    domain: any;
    findAndDeleteTupleByState(req: any, res: any, stateToFind: any): any;
    add(req: any, res: any, tupleToAdd: any): void;
}

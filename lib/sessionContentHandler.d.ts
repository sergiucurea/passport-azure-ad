export function SessionContentHandler(maxAmount: any, maxAge: any): void;
export class SessionContentHandler {
    constructor(maxAmount: any, maxAge: any);
    maxAge: number;
    maxAmount: number;
    findAndDeleteTupleByState(req: any, sessionKey: any, stateToFind: any): any;
    add(req: any, sessionKey: any, tupleToAdd: any): void;
}

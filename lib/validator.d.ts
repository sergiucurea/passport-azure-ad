export function Validator(config: any): void;
export class Validator {
    constructor(config: any);
    config: any;
    validate(options: any): void;
}
export namespace Validator {
    const isNonEmpty: string;
    const isTypeLegal: string;
    const isModeLegal: string;
    const isURL: string;
    const isHttpURL: string;
    const isHttpsURL: string;
    const isHttpsURLIfExists: string;
}

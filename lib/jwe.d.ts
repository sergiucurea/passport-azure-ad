export function decrypt(jweString: string, jweKeyStore: any, log: any, callback: any): Function;
/******************************************************************************
 * utility functions
 *****************************************************************************/
/**
 * Create a buffer depends on the version of node
 *
 * @param{Buffer/String/Number}  data: buffer, string, or size
 * @param{String}  encoding: ignored if data is a buffer
 * @return{Buffer}
 */
export function createBuffer(data: any, encoding: string): any;

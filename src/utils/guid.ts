/**
 * Generate a new GUID
 * @export
 * @const {Generic}
 */
export function generateGuid() {
    return (
        sequenceGenerator() +
        sequenceGenerator() +
        "-" +
        sequenceGenerator() +
        "-4" +
        sequenceGenerator().substr(0, 3) +
        "-" +
        sequenceGenerator() +
        "-" +
        sequenceGenerator() +
        sequenceGenerator() +
        sequenceGenerator()
    ).toLowerCase();
}

const sequenceGenerator = (): string => {
    // tslint:disable-next-line:no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
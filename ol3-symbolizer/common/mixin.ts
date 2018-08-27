/**
 * Shallow copies source into target, already available in numerous libraries including ol3-fun so does not belong here
 * This implementation always overwrites the target with the source values (_.default does not replace values)
 * @param a target
 * @param b source
 */
export function mixin<A extends any, B extends any>(a: A, b: B) {
    Object.keys(b).forEach(k => a[k] = b[k]);
    return <A & B>a;
}
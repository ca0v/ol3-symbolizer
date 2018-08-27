/**
 * assigns undefined values
 */
export function defaults<A extends {
    [name: string]: any;
}, B extends {
    [name: string]: any;
}>(a: A, ...b: B[]): A & B {
    b.filter(b => !!b).forEach(b => {
        Object.keys(b).filter(k => a[k] === undefined).forEach(k => a[k] = b[k]);
    });
    return <A & B>a;
}
export function doif<T>(v: T, cb: (v: T) => void) {
    if (v !== undefined && v !== null)
        cb(v);
}
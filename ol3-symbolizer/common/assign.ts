/**
 * 
 * @param obj The target object
 * @param prop The property name
 * @param value The property value
 */
export function assign(obj: any, prop: string, value: any) {
    if (value === null) return;
    if (value === undefined) return;

    if (typeof value === "object") {
        if (Object.keys(value).length === 0) return;
    }

    if (prop === "image") {
        if (value.hasOwnProperty("radius")) {
            prop = "circle";
        }

        if (value.hasOwnProperty("points")) {
            let points = value["points"];
            if (points < Infinity) {
                prop = "star";
            }
        }
    }
    obj[prop] = value;
}

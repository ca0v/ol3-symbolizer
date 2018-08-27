export function should(result: boolean, message: string) {
    if (!result) throw message;
}
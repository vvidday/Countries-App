export function formatNumber(number: number): string {
    let result: string = "";
    let counter: number = 0;
    while (number > 0) {
        const digit = String(number % 10);
        number = Math.floor(number / 10);
        if (counter % 3 === 0 && counter !== 0) {
            result = digit + "," + result;
        } else {
            result = digit + result;
        }
        counter++;
    }
    return result;
}

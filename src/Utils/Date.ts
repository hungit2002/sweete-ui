export function dateToMMDDYYYY (date: string): string {
    const dateVal = new Date(date);
    const formattedDate = (dateVal.getMonth() + 1).toString().padStart(2, '0') + '-' +
        dateVal.getDate().toString().padStart(2, '0') + '-' +
        dateVal.getFullYear();
    return formattedDate;
}
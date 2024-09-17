export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString()
}

export function formatDateDDMMYY(dateString: string | Date) {
    if (!dateString) {
        return (new Date()).toLocaleDateString(); // Если дата отсутствует или null, возвращаем пустую строку
    }
    if((typeof dateString) === "string") {
        return dateString;
    }
    // @ts-ignore
    return dateString.toLocaleDateString()
}
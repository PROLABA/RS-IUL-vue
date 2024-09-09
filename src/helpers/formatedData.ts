export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString()
}

export function formatDateDDMMYY(dateString: string) {
    if (!dateString) {
        return (new Date()).toLocaleDateString(); // Если дата отсутствует или null, возвращаем пустую строку
    }
    return dateString;
}
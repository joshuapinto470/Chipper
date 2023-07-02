export function formatDate(date) {
    const options = {
        month: 'short',
        day : 'numeric',
        year : 'numeric'
    }

    let formattedDate = new Date(date).toLocaleDateString('en-IN', options);
    return formattedDate;
}
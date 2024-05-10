

function dateToRequest(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

// 2024-04-26T11:13:01.8196733
// YYYY-MM-DDTHH:MM:SS.MMMZ
function dateToResponse(date){
    const dateObj = new Date(Date.parse(date));
    return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
}

function getCurrentTimeRequest(){
    const now = new Date();
    return dateToRequest(now);
}

export { dateToRequest, dateToResponse, getCurrentTimeRequest }
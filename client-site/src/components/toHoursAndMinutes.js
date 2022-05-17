export default function toHoursAndMinutes(totalMinutes, todo) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if(todo){
        return `${padTo2Digits(hours)} H ${padTo2Digits(minutes)} MIN`;
    } else{
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
    }
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
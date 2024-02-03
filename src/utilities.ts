export const normalize = (val: number, max: number, loggingAlert: Boolean = false) => {
    if (val >= max) {
        if (loggingAlert) {console.log(`Normalize above max`);} 
        return val - max
    } else if (val < 0) {
        if (loggingAlert) {console.log(`Normalize below zero`);} 
        return val + max
    } else {
        return val
    }
}
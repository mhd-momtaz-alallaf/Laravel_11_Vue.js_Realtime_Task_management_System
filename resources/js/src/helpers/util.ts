import { showError } from "./toast-notification";

export function showErrorResponse(error: any) {
    console.log("Error received:", error); // Debugging line

    if (error.errors && typeof error.errors === 'object') {
        for (const field in error.errors) {
            if (Array.isArray(error.errors[field])) {
                for (const msg of error.errors[field]) {
                    showError(msg);
                }
            }
        }
    } else if (error.message) {
        showError(error.message);
    } else {
        showError("An unexpected error occurred.");
    }
}

// this function is for make a time delay for getting the results of the search query, this will reduce the requests on the server and improve the request.
export function myDebounce<T>(func: (args?: any)=>Promise<T>, delay: number) {
    let timer: any;

    return function(){
        clearTimeout(timer);
        timer = setTimeout(() => func(), delay);
    }
}

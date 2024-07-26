import { showError } from "./toast-notification";

export function showErrorResponse(error: any) {
    // if the error is an object
    if (error.errors) {
        for (const key in error.errors) {
            if(typeof error.errors[key] === "string")
                showError(error.errors[key]);
        }
    }
    // if the error is an array
    else if(Array.isArray(error)) {
        for (const message in error as string[]) {
            showError(message);
        }
    }
     else {
        showError((error as Error).message);
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

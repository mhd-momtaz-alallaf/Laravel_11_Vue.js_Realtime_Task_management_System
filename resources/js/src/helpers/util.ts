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

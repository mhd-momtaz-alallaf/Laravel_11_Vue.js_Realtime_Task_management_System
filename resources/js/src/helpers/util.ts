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

    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => func(), delay);
    }
}

// this function is for opening a pop up window of passed modal
export function openModal(element: string) {
    return new Promise((resolve) => {
        // Open the Bootstrap modal using its API
        var modal = document.getElementById(element) as HTMLElement;

        if (modal) {
            setTimeout(function () {
                modal.classList.add('fade', 'show');
                modal.style.display = 'block';
                modal.classList.add('in');
            }, 500);

            // Add class to the body for the modal backdrop
            document.body.classList.add('modal-open');

            var modalBackdrop = document.createElement('div');
            modalBackdrop.className = 'modal-backdrop fade show';
            document.body.appendChild(modalBackdrop);
        }
        resolve(modal);
    });
}

// this function is for closing the pop up window of passed modal.
export function closeModal(element: string) {
    // Close the Bootstrap modal
    var modal = document.getElementById(element) as HTMLElement;
    var modalBackdrop = document.querySelector('.modal-backdrop');

    if (modal) {
        // Remove added classes
        modal.classList.remove('in', 'show', 'fade');
        modal.style.display = '';

        document.body.classList.remove('modal-open');

        // Remove the modal backdrop element
        if (modalBackdrop) {
            document.body.removeChild(modalBackdrop);
        }
    }
}

// This function returns the first letter of the given member name.
export function getFirstChar(str: string | undefined): string {
    if (!str) {
        return 'I'; // Return an empty string if the input is undefined or empty.
    }

    return str.charAt(0).toUpperCase(); // Get the first character and convert it to uppercase.
}

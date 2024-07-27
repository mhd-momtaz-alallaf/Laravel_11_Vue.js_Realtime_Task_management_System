import { APP } from "../app/APP";
import { getUserCredentials } from "./getUserCredentials";

type HttpVerbType = "GET" | "POST" | "PUT" | "DELETE";

export function makeHttpRequest<TInput, TResponse>(
    endpoint: string,
    verb: HttpVerbType,
    input?: TInput
) {
    return new Promise<TResponse>(async (resolve, reject) => {
        try {
            const userData = getUserCredentials();
            const res = await fetch(`${APP.apiBaseURL}/${endpoint}`, {
                method: verb,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: "Bearer " + userData?.token,
                },
                body: input ? JSON.stringify(input) : undefined,
            });

            // Check if the response is JSON
            const contentType = res.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await res.json();

                if (!res.ok) {
                    reject(data);
                } else {
                    resolve(data);
                }
            } else {
                // Handle unexpected response type
                const errorText = await res.text();
                reject({
                    status: res.status,
                    message: `Unexpected response type: ${contentType}. Response body: ${errorText}`
                });
            }

        } catch (error: any) {
            reject({
                message: error.message || "Network error",
            });
        }
    });
}

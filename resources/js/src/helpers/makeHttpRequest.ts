import { APP } from "./../app/APP";
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
            const response = await fetch(`${APP.apiBaseURL}/${endpoint}`, {
                method: verb,
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + userData?.token,
                },
                body: JSON.stringify(input),
            });

            const data = await response.json();

            if (!response.ok) {
                reject({
                    errors: data,
                });
            } else {
                resolve(data);
            }

        } catch (error) {
            reject(error);
        }
    });
}

import { LoginResponseType } from "../pages/auth/actions/login";

export function getUserCredentials(): LoginResponseType | undefined {
    try {
        const userData = localStorage.getItem("userData");
        // if userData !== Null, the Null is typeof object.
        if(typeof userData !== 'object') {
            const connectedUser: LoginResponseType = JSON.parse(userData);
            return connectedUser;
        }
    } catch (error) {
        console.log((error as Error).message);
    }
}

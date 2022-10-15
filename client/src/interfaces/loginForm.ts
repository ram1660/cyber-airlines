/**
 * Used as a Sign in request for either a customer or an airline.
 */
export interface SignInForm {
    type: string;
    username: string;
    password: string;
}

/**
 * The respond we get from the server.
 */
export interface SignInResponse {
    username: string;
    token: string;
}
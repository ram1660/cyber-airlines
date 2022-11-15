/**
 * Used as a Sign in request for either a customer or an airline.
 */

export interface SignInForm {
    username: string;
    password: string;
    rememberMe: boolean;
    loginType: "CUSTOMER" | "AIRLINE" ; // Could be "airline" or "customer".
  }

/**
 * The respond we get from the server.
 */
export interface SignInResponse {
    username: string;
    token: string;
}

export interface ValidateCredentials {
  username: string;
  token: string;
  type: "CUSTOMER" | "AIRLINE";
}
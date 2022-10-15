/**
 * A generic response interface from the server.
 * Usually used when there is an error and a message.
 */
export default interface Response {
    message: string;
    code: number;
}

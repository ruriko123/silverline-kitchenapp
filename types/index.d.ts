export {};

declare module 'express-session' {
    interface SessionData {
        admin: boolean,
        adminName:string
    }
}
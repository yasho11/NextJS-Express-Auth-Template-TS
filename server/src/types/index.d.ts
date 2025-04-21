export interface JwtPayload{
    id: string;
    email: string;
    username: string;
}

declare global{
    namespace Express{
        interface Request{
            user?: JwtPayload;
        }
    }
}


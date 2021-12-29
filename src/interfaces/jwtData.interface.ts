export interface IJwtData {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        studentId: string;
    },
    iat: number;
    exp: number;
};

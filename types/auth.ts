export interface AuthResponse {
    token: string
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string
    data: {
        id: number
        email: string
    }
}

// export interface ApiResponse {
//
// }
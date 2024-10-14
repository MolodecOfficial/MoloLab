export interface UserSchema {
 firstName: string
 lastName: string
 email: string
 password: string
}

export interface SignInRequestBody {
 email: string
 password: string
}
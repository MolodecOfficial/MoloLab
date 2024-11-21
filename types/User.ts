export interface UserSchema {
 firstName: string
 lastName: string
 email: string
 password: string,
 achievements: string[]
}

export interface SignInRequestBody {
 email: string
 password: string
}
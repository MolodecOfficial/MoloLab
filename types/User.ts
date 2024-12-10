export interface UserSchema {
 firstName: string;
 lastName: string;
 email: string;
 password: string;
 achievements: string[];
 status: string;
 specialty: string;
 group: string;
 code: string;
 direction: string;
 faculty: string;
 form_of_learning: string;
 course: string,
 learning: string
}


export interface SignInRequestBody {
 email: string
 password: string
}
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
    course: number;
    learning: string;
    averageScore: number;
    generalScore: number;
    ranking: string;
    score: {
        firstCourse: { [subjectName: string]: number[] };
        secondCourse: { [subjectName: string]: number[] };
        thirdCourse: { [subjectName: string]: number[] };
        fourthCourse: { [subjectName: string]: number[] };
        fifthCourse: { [subjectName: string]: number[] };
    };
}

export interface SignInRequestBody {
    email: string;
    password: string;
}
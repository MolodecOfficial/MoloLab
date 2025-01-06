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
    learning: string,
    averageScore: string,
    generalScore: string,
    ranking: string,
    score: {
        'История': string[];
        'Математика': string[];
        'Дискретная Математика': string[];
        'Основы Российской Государственности': string[];
        'Физика': string[];
        'Иностранный Язык': string[];
        'Инженерная Компьютерная Графика': string[];
    };
}


export interface SignInRequestBody {
    email: string
    password: string
}
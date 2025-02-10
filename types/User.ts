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
    course: any,
    learning: string,
    averageScore: number,
    generalScore: number,
    ranking: string,
    score: {
        'История': number[];
        'Математика': number[];
        'Дискретная Математика': number[];
        'Основы Российской Государственности': number[];
        'Физика': number[];
        'Иностранный Язык': number[];
        'Инженерная Компьютерная Графика': number[];
    };
}

export interface SignInRequestBody {
    email: string
    password: string
}
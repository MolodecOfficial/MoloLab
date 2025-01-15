export interface Lesson {
    time: string;
    subject: string;
    teacher: string;
    typeOfLesson: string;
}

export interface GroupSchedule {
    [groupName: string]: Lesson[]; // Название группы и массив занятий
}

export interface ScheduleSchema {
    [date: string]: GroupSchedule; // Дата расписания и расписание по группам
}
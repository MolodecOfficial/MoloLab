export interface ScheduleSchema {
    date: string;
    groups: Array<{
        groupName: string;  // например, ИВТ-21 или ФИЗ-22
        lessons: Array<{
            time: string;
            subject: string;
            teacher: string;
            cabinet: string;
            typeOfLesson: string;
            conditionOfLesson: {
                common: string;
                subgroup1: { cabinet: string; teacher: string };
                subgroup2: { cabinet: string; teacher: string };
            };
        }>;
    }>;
}
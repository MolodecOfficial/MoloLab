export interface ScheduleSchema {
    date: {
        group: [{
            time: string,
            subject: string,
            teacher: string,
            typeOfLesson: string
            conditionOfLesson: {
                common: string,
                subgroup1: {
                    cabinet: string,
                    teacher: string
                },
                subgroup2: {
                    cabinet: string
                    teacher: string
                }
            }
        }]
    }
}

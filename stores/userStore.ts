import {defineStore} from "pinia";
import {ref} from "vue";
import {achievementsList} from '~/stores/achievementsStore';
import Cookies from "js-cookie";

export const useUserStore = defineStore('user', () => {
    const userId = ref('');
    const userEmail = ref('');
    const userFirstName = ref('');
    const userLastName = ref('');
    const userStatus = ref('')
    const userSpecialty = ref('')
    const userGroup = ref('')
    const userCode = ref('')
    const userDirection = ref('')
    const userLearning = ref('')
    const userFormOfLearning = ref('')
    const userFaculty = ref('')
    const userCourse = ref('')
    const userAverageScore = ref('')
    const userGeneralScore = ref('')
    const userScores = ref<any>({});
    const currentUser = ref<any>(null);
    const users = ref<any[]>([]);
    const loading = ref(false);
    const error = ref('');
    const loadingUser = ref(false); // Флаг, который будет показывать, загружен ли текущий пользователь
    const averageScore = computed(() => userAverageScore.value);
    const generalScore = computed(() => userGeneralScore.value);

    const achievements = ref<any[]>(achievementsList); // Список доступных достижений

    function setId(id: string) {
        userId.value = id
    }

    function setEmail(email: string): void {
        userEmail.value = email;
    }

    function setFirstName(firstName: string): void {
        userFirstName.value = firstName;
    }

    function setLastName(lastName: string): void {
        userLastName.value = lastName;
    }

    function setUser(user:
                     {
                         email: string;
                         firstName: string;
                         lastName: string;
                         _id?: string;
                         status: string;
                         specialty: string,
                         group: string,
                         code: string,
                         direction: string,
                         learning: string,
                         form_of_learning: string,
                         faculty: string,
                         course: string,
                         scores: any;
                         ranking: number;
                         averageScore: string;
                         generalScore: string;
                     }) {
        userEmail.value = user.email;
        userFirstName.value = user.firstName;
        userLastName.value = user.lastName;
        currentUser.value = user;
        userId.value = user._id || '';  // Сохраняем ID пользователя
        userStatus.value = user.status;
        userSpecialty.value = user.specialty;
        userGroup.value = user.group
        userCode.value = user.code
        userDirection.value = user.direction
        userLearning.value = user.learning
        userFormOfLearning.value = user.form_of_learning
        userFaculty.value = user.faculty
        userCourse.value = user.course
        userScores.value = user.scores
        userAverageScore.value = user.averageScore
        userGeneralScore.value = user.generalScore


        localStorage.setItem('user', JSON.stringify(user));
        Cookies.set('user', JSON.stringify(user), {expires: 7});
    }

    function setUserScores(scores: any) {
        userScores.value = scores;
    }

    function clearUser() {
        userFirstName.value = '';
        userLastName.value = '';
        userEmail.value = '';
        currentUser.value = null;
    }

    // Получение всех пользователей
    const getUsers = async () => {
        loadingUser.value = true;
        try {
            const response = await $fetch('/api/users'); // Замените на правильный URL
            users.value = response.users; // Предполагаем, что список пользователей хранится в поле "users"

            // Ищем пользователя по userId
            const currentUserData = users.value.find((user: any) => user._id === userId.value);
            if (currentUserData) {
                setUser(currentUserData);
            } else {
                console.log('Пользователь с таким ID не найден');
            }
        } catch (err) {
            error.value = 'Ошибка при получении пользователей';
            console.error(error.value, err);
        } finally {
            loadingUser.value = false;
        }
    };

    // Удаление пользователя
    async function deleteUser(userId: string) {
        const response = await fetch('/api/delete', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userId}),
        });
        if (!response.ok) {
            throw new Error('Ошибка при удалении пользователя');
        }
        return await response.json();
    }

    // Метод для выдачи достижения
    async function giveAchievement(userId: string, achievementId: string) {
        if (!userId || !achievementId) {
            console.error("Не переданы userId или achievementId");
            throw new Error("Не переданы необходимые данные");
        }

        try {
            const response = await $fetch('/api/give-achievement', {
                method: 'POST',
                body: {userId, achievementId},
            });

            console.log('Ответ от сервера:', response);
            if (response && response.message === 'Достижение успешно выдано') {
                console.log(`Достижение ${achievementId} успешно выдано пользователю ${userId}`);
                return response;
            } else {
                console.error("Ошибка при выдаче достижения:", response);
                throw new Error("Ошибка при выдаче достижения");
            }
        } catch (error) {
            console.error('Ошибка при выдаче достижения:', error);
            throw error;
        }
    }

    const getUserAchievements = (userId: string) => {
        const user = users.value.find(user => user._id === userId);
        if (user) {
            const obtainedAchievements: any = achievementsList.filter(achievement =>
                user.achievements.includes(achievement.id)
            );
            return obtainedAchievements;
        }
        return [];
    }


    async function changeStatus(userId: string, newStatus: string) {
        try {
            const response = await $fetch(`/api/edit-status`, {
                method: 'POST',
                body: {userId, newStatus}
            });
            return response;
        } catch (error) {
            console.error('Error updating user status:', error);
            throw error;
        }
    }

    async function addSpecialty(userId: string, specialtyName: string) {
        if (!userId || !specialtyName) {
            console.error("Не переданы userId или specialtyName");
            throw new Error("Не переданы необходимые данные");
        }

        try {
            // Ищем специальность по названию
            const selectedSpecialty = specialtyList.find(specialty => specialty.specialty_name === specialtyName);

            if (!selectedSpecialty) {
                console.error("Специальность не найдена");
                throw new Error("Специальность не найдена");
            }

            const response = await $fetch('/api/give-specialty', {
                method: 'POST',
                body: {
                    userId,
                    specialtyId: selectedSpecialty.id // Передаем ID найденной специальности
                },
            });

            if (response && response.message === 'Специальность успешно добавлена') {
                // Обновляем данные пользователя в store
                const user = users.value.find(user => user._id === userId);
                if (user) {
                    user.specialty = selectedSpecialty.specialty_name;
                    user.group = selectedSpecialty.group;
                    user.code = selectedSpecialty.code;
                    user.direction = selectedSpecialty.direction;
                    user.faculty = selectedSpecialty.faculty
                }
                return response;
            } else {
                console.error("Ошибка при добавлении специальности:", response);
                throw new Error("Ошибка при добавлении специальности");
            }
        } catch (error) {
            console.error('Ошибка при добавлении специальности:', error);
            throw error;
        }
    }

    async function addLearningDetails(userId: string, learning: string, formOfLearning: string, course: string) {
        if (!userId || !learning || !formOfLearning || !course) {
            console.error("Не переданы userId, learning, formOfLearning или course");
            throw new Error("Не переданы необходимые данные");
        }

        try {
            const response = await $fetch('/api/give-learning', {
                method: 'POST',
                body: {userId, learning, formOfLearning, course}
            });

            if (response && response.message === 'Данные обучения успешно обновлены') {
                const user = users.value.find(user => user._id === userId);
                if (user) {
                    user.learning = learning;
                    user.form_of_learning = formOfLearning;
                    user.course = course;
                }
                return response;
            } else {
                console.error("Ошибка при обновлении данных обучения:", response);
                throw new Error("Ошибка при обновлении данных обучения");
            }
        } catch (error) {
            console.error("Ошибка при обновлении данных обучения:", error);
            throw error;
        }
    }

    const addScore = async (userId: string, subject: string, score: number) => {
        if (!userId || !subject || score === undefined || score === null) {
            console.error("Не передан айди, предмет или оценка");
            throw new Error("Не переданы необходимые данные");
        }

        try {
            const response = await $fetch('/api/edit-scores', {
                method: 'POST',
                body: { userId, subject, score }
            });

            if (response && response.message === 'Оценка успешно добавлена.') {
                // Обновляем данные пользователя
                const user = users.value.find(user => user._id === userId);
                if (user) {
                    // Добавляем или обновляем оценку для конкретного предмета
                    if (!user.score) {
                        user.score = {}; // Если еще нет объекта с оценками
                    }
                    if (!user.score[subject]) {
                        user.score[subject] = []; // Если для этого предмета нет оценок
                    }
                    user.score[subject].push(score); // Добавляем оценку в массив
                }
                return response;
            } else {
                console.error("Ошибка при добавлении оценки:", response);
                throw new Error("Ошибка при добавлении оценки");
            }
        } catch (error) {
            console.error("Ошибка при обновлении данных обучения:", error);
            throw error;
        }
    };

    // async function addSchedule(scheduleData: {
    //     userId: string;
    //     date: string;
    //     groups: { [group: string]: any[] }; // Массив объектов с информацией о группе
    // }) {
    //     if (!scheduleData.userId || !scheduleData.date || !scheduleData.groups) {
    //         console.error("Не переданы необходимые данные для расписания");
    //         throw new Error("Не переданы необходимые данные для расписания");
    //     }
    //
    //     try {
    //         const response = await $fetch('/api/give-schedule', {
    //             method: 'POST',
    //             body: scheduleData,
    //         });
    //
    //         if (response && response.message === 'Расписание успешно добавлено или обновлено') {
    //             console.log('Расписание успешно добавлено или обновлено');
    //             const user = users.value.find(user => user._id === scheduleData.userId);
    //             if (user) {
    //                 user.schedule = response.schedule;
    //             }
    //             return response;
    //         } else {
    //             console.error("Ошибка при добавлении расписания:", response);
    //             throw new Error("Ошибка при добавлении расписания");
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при добавлении расписания:', error);
    //         throw error;
    //     }
    // }

    onMounted(() => {
        console.log('Инициализация userStore...')
        if (currentUser.value) {
            return;
        }
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUser(user);
            currentUser.value = user;
            userId.value = user._id;
            userEmail.value = user.email;
            userFirstName.value = user.firstName;
            userLastName.value = user.lastName;
            userStatus.value = user.status;
            userSpecialty.value = user.specialty
            userGroup.value = user.group;
            userCode.value = user.code;
            userDirection.value = user.direction;
            userLearning.value = user.learning;
            userFormOfLearning.value = user.form_of_learning;
            userFaculty.value = user.faculty;
            userCourse.value = user.course;
            userScores.value = user.scores
            userAverageScore.value = user.averageScore
            userGeneralScore.value = user.generalScore
        }
    });

    return {
        userEmail,
        userFirstName,
        userLastName,
        userStatus,
        userSpecialty,
        userGroup,
        userCode,
        userDirection,
        userLearning,
        userFormOfLearning,
        userFaculty,
        userCourse,
        userScores,
        userAverageScore,
        userGeneralScore,
        currentUser,
        users,
        loading,
        loadingUser,
        error,
        userId,
        achievements,
        averageScore,
        generalScore,
        setEmail,
        setFirstName,
        setLastName,
        setUser,
        clearUser,
        getUsers,
        deleteUser,
        changeStatus,
        giveAchievement,
        getUserAchievements,
        addSpecialty,
        addLearningDetails,
        addScore,
        // addSchedule
    };
});
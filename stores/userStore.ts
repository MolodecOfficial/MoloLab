import {defineStore} from "pinia";
import {ref} from "vue";
import {achievementsList} from '~/stores/achievementsStore';
import Cookies from "js-cookie";

export const useUserStore = defineStore('user', () => {
    const users = ref<any[]>([]);
    const userId = ref('');
    const currentUser = ref<any>();
    const loadingUser = ref(false);
    const error = ref('');
    const initialized = ref(false);

    // Данные пользователя
    const userEmail = ref('');
    const userFirstName = ref('');
    const userLastName = ref('');
    const userStatus = ref('');
    const userSpecialty = ref('');
    const userGroup = ref('');
    const userCode = ref('');
    const userDirection = ref('');
    const userLearning = ref('');
    const userFormOfLearning = ref('');
    const userFaculty = ref('');
    const userCourse = ref('');
    const userScores = ref<any>({});
    const userAverageScore = ref('');
    const userGeneralScore = ref('');
    const achievements = ref<any[]>(achievementsList);
    const schedules = ref<any[]>([]);
    const messages = ref<any[]>([]);

    const averageScore = computed(() => userAverageScore.value);
    const generalScore = computed(() => userGeneralScore.value);

    // ====================
    // INIT
    // ====================
    async function initUserStore() {
        if (initialized.value) return; // Защита от повторной инициализации
        loadingUser.value = true;

        try {
            // 1. Восстановление текущего пользователя из localStorage
            let storedUser: any = null;
            if (process.client) {
                const localUser = localStorage.getItem('user');
                if (localUser) {
                    storedUser = JSON.parse(localUser);
                    setUser(storedUser);
                    userId.value = storedUser._id || '';
                }
                const localUsers = localStorage.getItem('users');
                if (localUsers) {
                    users.value = JSON.parse(localUsers);
                }
                const savedSchedules = localStorage.getItem('schedules');
                if (savedSchedules) {
                    schedules.value = JSON.parse(savedSchedules);
                }
            }

            // 2. Получение пользователей
            const response = await $fetch('/api/users');
            users.value = response.users;

            if (process.client) {
                localStorage.setItem('users', JSON.stringify(users.value));
            }

            // 3. Установка текущего пользователя, если найден по ID
            if (!storedUser && userId.value) {
                const fetchedUser = users.value.find(u => u._id === userId.value);
                if (fetchedUser) {
                    setUser(fetchedUser);
                }
            }

            initialized.value = true;


        } catch (err) {
            error.value = 'Ошибка при инициализации пользователя';
            console.error(error.value, err);
        } finally {
            loadingUser.value = false;
        }
    }

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

    function setUser(user: {
        email: string;
        firstName: string;
        lastName: string;
        _id?: string;
        status: string;
        specialty: string;
        group: string;
        code: string;
        direction: string;
        learning: string;
        form_of_learning: string;
        faculty: string;
        course: string;
        score: any;
        ranking: number;
        averageScore: string;
        generalScore: string;
    }) {
        // Устанавливаем значения в реактивные переменные
        userEmail.value = user.email;
        userFirstName.value = user.firstName;
        userLastName.value = user.lastName;
        currentUser.value = user;
        userId.value = user._id || '';  // Сохраняем ID пользователя
        userStatus.value = user.status;
        userSpecialty.value = user.specialty;
        userGroup.value = user.group;
        userCode.value = user.code;
        userDirection.value = user.direction;
        userLearning.value = user.learning;
        userFormOfLearning.value = user.form_of_learning;
        userFaculty.value = user.faculty;
        userCourse.value = user.course;
        userScores.value = user.score;
        userAverageScore.value = user.averageScore;
        userGeneralScore.value = user.generalScore;

        if (process.client) {
            try {
                // Сохраняем данные в localStorage
                localStorage.setItem('user', JSON.stringify(user));
                // Сохраняем данные в Cookies
                Cookies.set('user', JSON.stringify(user), { expires: 7 });
            } catch (error) {
                console.error('Ошибка при сохранении данных пользователя:', error);
            }
        } else {
            console.warn('localStorage недоступен на стороне сервера');
        }
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
            const response = await $fetch('/api/users');
            users.value = response.users;

            if (process.client) {
                localStorage.setItem('users', JSON.stringify(users.value));

                // ВОССТАНАВЛИВАЕМ userId из localStorage, если он пустой
                if (!userId.value) {
                    const savedUser = localStorage.getItem('user');
                    if (savedUser) {
                        const parsedUser = JSON.parse(savedUser);
                        if (parsedUser && parsedUser._id) {
                            userId.value = parsedUser._id;
                            setUser(parsedUser); // <--- ЭТО ОБЯЗАТЕЛЬНО
                            console.log("Восстановлен userId из localStorage:", userId.value);
                        }
                    }
                }
            }

            // Теперь ищем текущего пользователя по userId
            const currentUserData = users.value.find((user: any) => user._id === userId.value);
            if (currentUserData) {
                setUser(currentUserData);
            } else {
                console.warn('Пользователь с таким ID не найден после getUsers()');
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
        if (userId.includes(achievementId)) {
            console.warn("Данное достижение уже выдано пользователю")
        }
        try {
            const response = await $fetch('/api/achievement', {
                method: 'POST',
                body: {userId, achievementId},
            });

            console.log('Ответ от сервера:', response);
            if (response && response.message === 'Достижение успешно выдано') {
                return response;
            } else {
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
            const response = await $fetch(`/api/status`, {
                method: 'POST',
                body: {userId, newStatus}
            });
            return response;
        } catch (error) {
            console.error('Error updating user status:', error);
            throw error;
        }
    }

    async function addSpecialty(userId: string, specialty: any) {
        if (!userId || !specialty) {
            console.error("Не переданы userId или specialty");
            throw new Error("Не переданы необходимые данные");
        }

        try {
            const response = await $fetch('/api/specialty', {
                method: 'POST',
                body: {
                    userId,
                    specialtyId: specialty._id, // можно даже specialtyId -> specialtyId (или _id)
                },
            });

            if (response && response.message === 'Специальность успешно добавлена') {
                // Обновляем данные пользователя в store
                const user = users.value.find(user => user._id === userId);
                if (user) {
                    user.specialty = specialty.name;
                    user.code = specialty.code;
                    user.direction = specialty.direction;
                    user.faculty = specialty.faculty;
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
            const response = await $fetch('/api/learning', {
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

    const addGroup = async (userId: string, groupId: string) => {
        if (!userId || !groupId) {
            console.error("Не переданы данные");
            throw new Error("Не переданы необходимые данные");
        }
        try {
            const response: any = await $fetch('/api/group', {
                method: 'POST',
                body: { userId, groupId },
            });

            if (response && response.message === 'Данные обучения успешно обновлены') {
                const user = users.value.find(user => user._id === userId);
                if (user) {
                    // В ответе теперь user.group - это уже название группы
                    user.group = response.user.group;
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
    };

    const addScore = async (
        userId: string,
        subject: string,
        score: number,
        course: 'firstCourse' | 'secondCourse' | 'thirdCourse' | 'fourthCourse' | 'fifthCourse'
    ) => {
        try {
            const response: any = await $fetch('/api/scores', {
                method: 'POST',
                body: { userId, subject, score, course }
            });

            if (response.user) {
                const index = users.value.findIndex(u => u._id === userId);
                if (index !== -1) users.value.splice(index, 1, response.user);
            }
            await getUsers(); // Для синхронизации
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    };

    async function addSchedule(payload: any) {
        if (!payload.date || !payload.groups) {
            console.error("Не переданы необходимые данные для расписания");
            throw new Error("Не переданы необходимые данные для расписания");
        }

        // Шлём на сервер
        console.log('Отправляем payload на сервер:', payload);
        const response: any = await $fetch('/api/schedule', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('Ответ от сервера:', response);

        if (!response || !response.success) {
            console.error('Сервер вернул ошибку при добавлении расписания', response);
            throw new Error('Не удалось сохранить расписание на сервере');
        }

        // Получаем актуальный документ из БД
        const saved: any = response.schedule;

        // Сливаем в локальный стор
        const idx = schedules.value.findIndex(s => s.date === saved.date);
        if (idx !== -1) {
            schedules.value[idx] = saved;
        } else {
            schedules.value.push(saved);
        }

        // Принудительный реакт
        schedules.value = [...schedules.value];

        // Сохраняем в localStorage
        if (process.client) {
            localStorage.setItem('schedules', JSON.stringify(schedules.value));
        }

        // Обновляем расписание в компоненте
        return saved;
    }


    onMounted(() => {
        if (process.client) {
            const savedSchedules = localStorage.getItem('schedules');
            if (savedSchedules) {
                schedules.value = JSON.parse(savedSchedules);
            }
        }
        console.log('Инициализация userStore...')
        if (currentUser.value) {
            return;
        }
        if (process.client && !currentUser.value) {
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
                userSpecialty.value = user.specialty;
                userGroup.value = user.group;
                userCode.value = user.code;
                userDirection.value = user.direction;
                userLearning.value = user.learning;
                userFormOfLearning.value = user.form_of_learning;
                userFaculty.value = user.faculty;
                userCourse.value = user.course;
                userScores.value = user.score;
                userAverageScore.value = user.averageScore;
                userGeneralScore.value = user.generalScore;
            }
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
        loadingUser,
        error,
        userId,
        achievements,
        averageScore,
        generalScore,
        messages,
        schedules,
        initUserStore,
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
        addSchedule,
        addGroup
    };
});
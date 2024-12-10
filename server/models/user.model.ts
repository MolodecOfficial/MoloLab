import mongoose from "mongoose";
import {UserSchema} from "~/types/User";

const userSchema = new mongoose.Schema<UserSchema>({
    firstName: {
        type: String,
        required: [true, 'Имя - обязательное поле.'],
        trim: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value); // Исправлено на \s для пробела
            },
            message: 'Неправильно набрано имя',
        },
    },
    lastName: {
        type: String,
        required: [true, 'Фамилия - обязательное поле.'],
        trim: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value); // Исправлено на \s для пробела
            },
            message: 'Неправильно набрана фамилия',
        },
    },
    email: {
        type: String,
        required: [true, 'Почта - обязательное поле.'],
        unique: true, // Добавлено уникальное значение
        validate: {
            validator: function (value: string) {
                return /^\S+@\S+\.\S+$/.test(value); // Исправлено регулярное выражение
            },
            message: 'Неправильный формат электронной почты.',
        },
    },
    password: {
        type: String,
        required: [true, 'Пароль - обязательное поле.'],
        select: false,
        minlength: [8, 'Пароль слишком короткий.'],
    },
    achievements: {
        type: [String],
        default: ["1"]
    },
    status: {
        type: String,
        enum: ['Студент', 'Преподаватель', 'Администратор'], // Пример статуса
        default: 'Студент' // Значение по умолчанию
    },
    specialty: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    group: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    code: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    direction: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    learning: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    form_of_learning: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    faculty: {
        type: String,
        required: true,
        default: 'Не определена'
    },
    course: {
        type: String,
        required: true,
        default: 'Не определена'
    },
});

export const User = mongoose.models.User || mongoose.model<UserSchema>('User', userSchema);

export default mongoose.model<UserSchema>('User', userSchema);
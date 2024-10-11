import {User} from "~/server/api/users.get";

export default defineEventHandler(async (event) => {
 const body = await readBody(event);
 const { firstName, lastName, email, password } = body;

 const existingUser = await User.findOne({ email });

 if (existingUser) {
  throw createError({ statusCode: 400, message: "Данный пользователь уже зарегистрирован" });
 }

 const newUser = new User({ firstName, lastName, email, password });

 await newUser.save();

 return { message: "Пользователь успешно зарегистрирован" };
});
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
 const userEmail = ref('');
 const userFirstName = ref('');
 const userLastName = ref('');

 function setEmail(email: string): void {
  userEmail.value = email;
 }

 function setFirstName(firstName: string): void {
  userFirstName.value = firstName;
 }

 function setLastName(lastName: string): void {
  userLastName.value = lastName;
 }

 function setUser(user: { email: string; firstName: string; lastName: string }): void {
  userEmail.value = user.email;
  userFirstName.value = user.firstName;
  userLastName.value = user.lastName;
 }

 return { userEmail, userFirstName, userLastName, setEmail, setFirstName, setLastName, setUser };
});
<script lang="ts" setup>
const firstName = ref('')
const lastName = ref('')
const group = ref('')
const faculty = ref('')
const specialty = ref('')
const status = ref('')
const userStore = useUserStore()
const themeStore = useThemeStore();
const router = useRouter();

async function logoutUser() {
  try {
    localStorage.removeItem('user')
    userStore.clearUser()
    await router.push('/login/student')
  } catch (error) {
    console.error('Ошибка при выходе из аккаунта:', error)
  }

}

onMounted(() => {
  const storageUser = localStorage.getItem('user')
  if (storageUser) {
    const user = JSON.parse(storageUser);
    firstName.value = user.firstName
    lastName.value = user.lastName
    group.value = user.group
    faculty.value = user.faculty
    specialty.value = user.specialty
    status.value = user.status || userStore.userStatus

  }
})
</script>

<template>
  <AccountMoloMobile title="Профиль">
    <section class="student-header">
      <div class="header-user">
        {{ firstName }} {{ lastName }}
      </div>
      <div class="header-user-info">
          <span>
            {{ group }} • {{ faculty }}
          </span>
        <span>
            {{ specialty }}
          </span>
      </div>

    </section>
    <section class="actions">
      <AccountUIMoloButton to="/student/personal-data" span="Персональные данные">
        <template #svg>
          <svg fill="none" height="20" viewBox="0 0 16 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.9997 11.5C4.5419 11.5 1.63061 13.84 0.763071 17.0229C0.472601 18.0886 1.39517 19 2.49974 19H13.4997C14.6043 19 15.5269 18.0886 15.2364 17.0229C14.3689 13.84 11.4576 11.5 7.9997 11.5Z"
                stroke="black" stroke-linecap="round" stroke-width="1.25"/>
            <path
                d="M11.4997 5C11.4997 6.933 9.93272 8.5 7.99972 8.5C6.06672 8.5 4.49976 6.933 4.49976 5C4.49976 3.067 6.06672 1.5 7.99972 1.5C9.93272 1.5 11.4997 3.067 11.4997 5Z"
                stroke="black" stroke-linecap="round" stroke-width="1.25"/>
          </svg>
        </template>
      </AccountUIMoloButton>
      <section class="action-section">
        <AccountUIMoloButton to="/student/messages" span="Сообщения" class="first-action">
          <template #svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.93456 14.6015C7.88673 15.7772 9.1182 16.4159 10.499 16.7676C11.2486 16.9588 13.188 16.632 13.687 17.0706C14.7382 18.0232 15.9443 18.6258 17.2839 18.9298C17.4058 18.9572 17.5307 18.9747 17.6541 18.9938C17.8105 19.0184 17.9385 18.9719 18.0188 18.8144C18.0985 18.6569 18.0695 18.5137 17.97 18.3835C17.8542 18.2326 17.7364 18.0828 17.61 17.9439C17.2427 17.5421 16.9519 17.0695 16.7509 16.5531C16.6068 16.1828 16.7678 15.7814 17.0829 15.5393C17.1495 15.4881 17.2153 15.4359 17.2799 15.3819C17.8827 14.8827 18.3834 14.2855 18.6902 13.5265C19.1883 12.296 19.0761 11.1083 18.423 9.979C17.911 9.0935 17.2114 8.4587 16.3918 8M2.7201 9.3819C2.78468 9.4359 2.85049 9.4881 2.9171 9.5393C3.23224 9.7814 3.39317 10.1828 3.24906 10.5531C3.04814 11.0695 2.75727 11.5421 2.39004 11.9439C2.2636 12.0828 2.14578 12.2326 2.03 12.3835C1.93046 12.5137 1.90152 12.657 1.98125 12.8144C2.06148 12.9719 2.18946 13.0184 2.34586 12.9938C2.46927 12.9747 2.59419 12.9572 2.71607 12.9298C4.05575 12.6258 5.26179 12.0232 6.31298 11.0706C6.81196 10.632 8.7514 10.9588 9.501 10.7676C10.8818 10.4159 12.1133 9.7772 13.0654 8.6015C14.2405 7.15016 14.3152 5.19248 13.2457 3.66122C12.4998 2.59431 11.4933 1.92552 10.3385 1.50881C8.3645 0.79626 6.38964 0.83455 4.43752 1.60834C3.25983 2.0748 2.25438 2.80764 1.57695 3.979C0.923879 5.10833 0.811668 6.29603 1.30984 7.52645C1.6166 8.2855 2.11732 8.8827 2.7201 9.3819Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
            </svg>
          </template>
        </AccountUIMoloButton>
        <AccountUIMoloButton to="/student/rating" span="Рейтинг" class="nth-action">
          <template #svg>
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 11.5V18M7 11.5V10C7 9.4477 7.44772 9 8 9H12C12.5523 9 13 9.4477 13 10V13.5M7 11.5H2C1.44772 11.5 1 11.9477 1 12.5V17C1 17.5523 1.44772 18 2 18H7M7 18H13M13 13.5V18M13 13.5H18.0003C18.5526 13.5 19 13.9477 19 14.5V17C19 17.5523 18.5523 18 18 18H13M9 3L10 2V5M4.5 8H3.91815C3.41107 8 2.99411 7.50393 3.41602 7.22265L4.06491 6.79006C4.33673 6.60885 4.5 6.30377 4.5 5.97708V5.75C4.5 5.33579 4.16421 5 3.75 5C3.33579 5 3 5.33579 3 5.75V6M15.5 7H16.2618C16.6695 7 17 7.33049 17 7.73817C17 8.1227 16.7048 8.4428 16.3215 8.4739L16 8.5L16.3127 8.5223C16.6999 8.5498 17 8.872 17 9.2602C17 9.6688 16.6688 10 16.2602 10H15.5" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
            </svg>
          </template>
        </AccountUIMoloButton>
        <AccountUIMoloButton to="/student/achievements" span="Достижения" class="nth-action">
          <template #svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.9998 13C6.68613 13 3.99984 10.3137 3.99984 7C3.99984 3.68629 6.68613 1 9.9998 1C13.3135 1 15.9998 3.68629 15.9998 7C15.9998 10.3137 13.3135 13 9.9998 13ZM9.9998 13L13.6417 18.8281C14.0511 19.4834 15.0646 19.151 15.0064 18.3805L14.859 16.4296C14.8141 15.835 15.4552 15.4344 15.9699 15.7354L17.6588 16.7231C18.3257 17.1132 19.0688 16.348 18.6593 15.6928L15.1574 10.0677M9.9998 13L6.35802 18.8281C5.94857 19.4834 4.93513 19.151 4.99332 18.3805L5.14066 16.4296C5.18556 15.835 4.54452 15.4344 4.02981 15.7354L2.34091 16.7231C1.67393 17.1132 0.9309 16.348 1.34035 15.6928L4.84229 10.0677M11.9998 7C11.9998 8.1046 11.1044 9 9.9998 9C8.8953 9 7.99984 8.1046 7.99984 7C7.99984 5.89543 8.8953 5 9.9998 5C11.1044 5 11.9998 5.89543 11.9998 7Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
            </svg>
          </template>
        </AccountUIMoloButton>
      </section>
      <section class="action-section">
        <AccountUIMoloButton to="https://do.rusoil.net/login/index.php" span="Система дистанционного обучения" class="first-action">
          <template #svg>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3619 8.5C14.0779 6.9715 12.1523 6 9.9998 6C7.84733 6 5.92177 6.9715 4.6377 8.5M18.9445 5C16.7472 2.545 13.5541 1 10.0001 1C6.44609 1 3.25295 2.545 1.05566 5M12 13C12 14.1046 11.1046 15 10 15C8.8954 15 8 14.1046 8 13C8 11.8954 8.8954 11 10 11C11.1046 11 12 11.8954 12 13Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
            </svg>
          </template>
        </AccountUIMoloButton>
        <AccountUIMoloButton to="/student/about" span="О приложении" class="last-action">
          <template #svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
              <path d="M9 10V14C9 14.5523 9.4477 15 10 15C10.5523 15 11 14.5523 11 14V10C11 9.4477 10.5523 9 10 9C9.4477 9 9 9.4477 9 10Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
              <path d="M11 6C11 5.44772 10.5523 5 10 5C9.4477 5 9 5.44772 9 6C9 6.55229 9.4477 7 10 7C10.5523 7 11 6.55229 11 6Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
            </svg>
          </template>
        </AccountUIMoloButton>
      </section>

      <AccountUIMoloButton to="/student/design" span="Оформление">
        <template #svg>
          <svg fill="none" height="22" viewBox="0 0 22 22" width="22" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.9282 13.5C11.7649 15.8049 14.0812 21.1089 9.5 20.3822C4.96602 19.6631 1.5 15.7363 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C15.7363 1.5 19.6631 4.96602 20.3822 9.5C21.0886 13.9534 16.0034 11.289 13.9282 13.5Z"
                stroke="black" stroke-linecap="round" stroke-width="1.25"/>
            <path
                d="M9 13.5C9 14.3284 8.32843 15 7.5 15C6.67157 15 6 14.3284 6 13.5C6 12.6716 6.67157 12 7.5 12C8.32843 12 9 12.6716 9 13.5Z"
                stroke="black" stroke-linecap="round" stroke-width="1.25"/>
            <path
                d="M10 7.5C10 8.32843 9.3284 9 8.5 9C7.67157 9 7 8.32843 7 7.5C7 6.67157 7.67157 6 8.5 6C9.3284 6 10 6.67157 10 7.5Z"
                stroke="black" stroke-linecap="round" stroke-width="1.25"/>
            <path
                d="M16 7C16 7.82843 15.3284 8.5 14.5 8.5C13.6716 8.5 13 7.82843 13 7C13 6.17157 13.6716 5.5 14.5 5.5C15.3284 5.5 16 6.17157 16 7Z"
                stroke="black" stroke-linecap="round" stroke-width="1.25"/>
          </svg>
        </template>
      </AccountUIMoloButton>
      <AccountUIMoloButton v-if="status === 'Администратор' || status === 'Владелец' || status === 'Преподаватель'"
                           to="/adminPanel"
                           span="Панель администратора"
      >
        <template #svg>
          <svg fill="none" height="20" viewBox="0 0 16 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.9997 11.5C4.5419 11.5 1.63061 13.84 0.763071 17.0229C0.472601 18.0886 1.39517 19 2.49974 19H13.4997C14.6043 19 15.5269 18.0886 15.2364 17.0229C14.3689 13.84 11.4576 11.5 7.9997 11.5Z"
                stroke="black" stroke-linecap="round" stroke-width="1.25"/>
            <path
                d="M11.4997 5C11.4997 6.933 9.93272 8.5 7.99972 8.5C6.06672 8.5 4.49976 6.933 4.49976 5C4.49976 3.067 6.06672 1.5 7.99972 1.5C9.93272 1.5 11.4997 3.067 11.4997 5Z"
                stroke="black" stroke-linecap="round" stroke-width="1.25"/>
          </svg>
        </template>
      </AccountUIMoloButton>
    </section>

    <NuxtLink @click="logoutUser" class="exit" to="/login/student">
      <svg fill="none" height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15 6.17648V13.5294M19.4125 9.11765C21.1981 10.4592 22.3529 12.5947 22.3529 15C22.3529 19.0609 19.0609 22.3529 15 22.3529C10.9391 22.3529 7.64707 19.0609 7.64707 15C7.64707 12.5947 8.80198 10.4592 10.5875 9.11765M28.9706 15C28.9706 22.7157 22.7157 28.9706 15 28.9706C7.28426 28.9706 1.02942 22.7157 1.02942 15C1.02942 7.28426 7.28426 1.02942 15 1.02942C22.7157 1.02942 28.9706 7.28426 28.9706 15Z"
            stroke="#FF0000" stroke-linecap="round" stroke-width="1.25"/>
      </svg>
    </NuxtLink>
  </AccountMoloMobile>
</template>

<style scoped>

.student-header {
  background-color: white;
  width: 80%;
  height: max-content;
  padding: 10px 20px;
  border-radius: 15px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.header-user-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #777777;
}

.actions {
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-section {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
}

/* Стиль для первой кнопки в секции */
.first-action {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.nth-action {
  border-radius: 0;
}

/* Стиль для первой кнопки в секции */
.last-action {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}


.exit {
  display: flex;
  gap: 20px;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  margin-bottom: 100px;
  -webkit-tap-highlight-color: transparent;
}

.exit svg path {
  stroke: #FF0000;
}

.exit:hover {
  background-color: #FF0000;
  cursor: pointer;
}

.exit:hover svg path {
  stroke: #FFFFFF;
}

</style>
<script lang="ts" setup>

const firstName = ref('')
const lastName = ref('')
const group = ref('')
const faculty = ref('')
const specialty = ref('')
const route = useRoute()

useHead({
  title: 'УГНТУ | Личный кабинет студента'
})

const actions = [
  {
    label: "Сообщения",
    route: "/in-progress",
    icon: `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.93456 14.6015C7.88673 15.7772 9.1182 16.4159 10.499 16.7676C11.2486 16.9588 13.188 16.632 13.687 17.0706C14.7382 18.0232 15.9443 18.6258 17.2839 18.9298C17.4058 18.9572 17.5307 18.9747 17.6541 18.9938C17.8105 19.0184 17.9385 18.9719 18.0188 18.8144C18.0985 18.6569 18.0695 18.5137 17.97 18.3835C17.8542 18.2326 17.7364 18.0828 17.61 17.9439C17.2427 17.5421 16.9519 17.0695 16.7509 16.5531C16.6068 16.1828 16.7678 15.7814 17.0829 15.5393C17.1495 15.4881 17.2153 15.4359 17.2799 15.3819C17.8827 14.8827 18.3834 14.2855 18.6902 13.5265C19.1883 12.296 19.0761 11.1083 18.423 9.979C17.911 9.0935 17.2114 8.4587 16.3918 8M2.7201 9.3819C2.78468 9.4359 2.85049 9.4881 2.9171 9.5393C3.23224 9.7814 3.39317 10.1828 3.24906 10.5531C3.04814 11.0695 2.75727 11.5421 2.39004 11.9439C2.2636 12.0828 2.14578 12.2326 2.03 12.3835C1.93046 12.5137 1.90152 12.657 1.98125 12.8144C2.06148 12.9719 2.18946 13.0184 2.34586 12.9938C2.46927 12.9747 2.59419 12.9572 2.71607 12.9298C4.05575 12.6258 5.26179 12.0232 6.31298 11.0706C6.81196 10.632 8.7514 10.9588 9.501 10.7676C10.8818 10.4159 12.1133 9.7772 13.0654 8.6015C14.2405 7.15016 14.3152 5.19248 13.2457 3.66122C12.4998 2.59431 11.4933 1.92552 10.3385 1.50881C8.3645 0.79626 6.38964 0.83455 4.43752 1.60834C3.25983 2.0748 2.25438 2.80764 1.57695 3.979C0.923879 5.10833 0.811668 6.29603 1.30984 7.52645C1.6166 8.2855 2.11732 8.8827 2.7201 9.3819Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>
`
  },
  {
    label: "Мои работы",
    route: "/in-progress",
    icon: `<svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 7H12C10.8954 7 10 6.10457 10 5V1M16 6.82843V15C16 16.1046 15.1046 17 14 17H6C4.89543 17 4 16.1046 4 15V3C4 1.89543 4.89543 1 6 1H10.1716C10.702 1 11.2107 1.21071 11.5858 1.58579L15.4142 5.41421C15.7893 5.78929 16 6.29799 16 6.82843Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
<path d="M4 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H11C12.1046 20 13 19.1046 13 18V17" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>
`
  },
  {
    label: "Дисциплины",
    route: "/in-progress",
    icon: `<svg width="20" height="20" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2H6M15 7H6M15 12H6M3 2C3 2.55228 2.55228 3 2 3C1.44772 3 1 2.55228 1 2C1 1.44772 1.44772 1 2 1C2.55228 1 3 1.44772 3 2ZM3 7C3 7.5523 2.55228 8 2 8C1.44772 8 1 7.5523 1 7C1 6.4477 1.44772 6 2 6C2.55228 6 3 6.4477 3 7ZM3 12C3 12.5523 2.55228 13 2 13C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11C2.55228 11 3 11.4477 3 12Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>
`
  },
  {
    label: "Учебный план",
    route: "/in-progress",
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.99995 4.71039H10.9999M4.99995 11.0601H8M4.99995 7.88525H10.9999M12.9999 0.628418L3.00025 0.628436C1.8957 0.628436 1.00028 1.44067 1.00026 2.44261L1 13.3279C0.99998 14.3298 1.89541 15.1421 3 15.1421H13C14.1045 15.1421 15 14.3299 15 13.3279C15 9.69946 15 6.07104 15 2.44263C15 1.44067 14.1045 0.628418 12.9999 0.628418Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>
`
  },
  {
    label: "Список группы",
    route: "/in-progress",
    icon: `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9995 13.5H17.4995C18.6041 13.5 19.5483 12.5512 19.0277 11.577C18.1717 9.9753 16.2424 9 13.9995 9C12.902 9 11.8826 9.2225 11.0277 9.6364M0.971349 14.077C1.82733 12.4753 3.75664 11.5 5.99952 11.5C8.2424 11.5 10.1717 12.4753 11.0277 14.077C11.5483 15.0512 10.6041 16 9.4995 16H2.49952C1.39495 16 0.450739 15.0512 0.971349 14.077ZM8.4995 6C8.4995 7.3807 7.38023 8.5 5.99952 8.5C4.61881 8.5 3.49952 7.3807 3.49952 6C3.49952 4.61929 4.61881 3.5 5.99952 3.5C7.38023 3.5 8.4995 4.61929 8.4995 6ZM16.4995 3.5C16.4995 4.88071 15.3802 6 13.9995 6C12.6188 6 11.4995 4.88071 11.4995 3.5C11.4995 2.11929 12.6188 1 13.9995 1C15.3802 1 16.4995 2.11929 16.4995 3.5Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>


`
  },
  {
    label: "Рейтинг",
    route: "/in-progress",
    icon: `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 11.5V18M7 11.5V10C7 9.4477 7.44772 9 8 9H12C12.5523 9 13 9.4477 13 10V13.5M7 11.5H2C1.44772 11.5 1 11.9477 1 12.5V17C1 17.5523 1.44772 18 2 18H7M7 18H13M13 13.5V18M13 13.5H18.0003C18.5526 13.5 19 13.9477 19 14.5V17C19 17.5523 18.5523 18 18 18H13M9 3L10 2V5M4.5 8H3.91815C3.41107 8 2.99411 7.50393 3.41602 7.22265L4.06491 6.79006C4.33673 6.60885 4.5 6.30377 4.5 5.97708V5.75C4.5 5.33579 4.16421 5 3.75 5C3.33579 5 3 5.33579 3 5.75V6M15.5 7H16.2618C16.6695 7 17 7.33049 17 7.73817C17 8.1227 16.7048 8.4428 16.3215 8.4739L16 8.5L16.3127 8.5223C16.6999 8.5498 17 8.872 17 9.2602C17 9.6688 16.6688 10 16.2602 10H15.5" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>
`
  },
  {
    label: "Достижения",
    route: "/in-progress",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.9998 13C6.68613 13 3.99984 10.3137 3.99984 7C3.99984 3.68629 6.68613 1 9.9998 1C13.3135 1 15.9998 3.68629 15.9998 7C15.9998 10.3137 13.3135 13 9.9998 13ZM9.9998 13L13.6417 18.8281C14.0511 19.4834 15.0646 19.151 15.0064 18.3805L14.859 16.4296C14.8141 15.835 15.4552 15.4344 15.9699 15.7354L17.6588 16.7231C18.3257 17.1132 19.0688 16.348 18.6593 15.6928L15.1574 10.0677M9.9998 13L6.35802 18.8281C5.94857 19.4834 4.93513 19.151 4.99332 18.3805L5.14066 16.4296C5.18556 15.835 4.54452 15.4344 4.02981 15.7354L2.34091 16.7231C1.67393 17.1132 0.9309 16.348 1.34035 15.6928L4.84229 10.0677M11.9998 7C11.9998 8.1046 11.1044 9 9.9998 9C8.8953 9 7.99984 8.1046 7.99984 7C7.99984 5.89543 8.8953 5 9.9998 5C11.1044 5 11.9998 5.89543 11.9998 7Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>
`
  }
];
const business = [
  {
    label: "Оплата обучения",
    route: "/in-progress",
    icon: `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9495 2.22179C13.778 3.39336 11.8785 3.39336 10.7069 2.22179M2.2216 14.9497C3.39318 13.7782 3.39318 11.8787 2.2216 10.7071M17.778 5.05021C16.6064 6.22179 16.6064 8.12127 17.778 9.29287M5.05003 17.7782C6.2216 16.6066 8.1211 16.6066 9.2927 17.7782M1.5145 11.4142L11.414 1.51468C12.195 0.733632 13.4614 0.733632 14.2424 1.51468L18.4851 5.75732C19.2661 6.53837 19.2661 7.8047 18.4851 8.58577L8.5856 18.4853C7.80452 19.2663 6.53819 19.2663 5.75714 18.4853L1.5145 14.2426C0.733448 13.4616 0.733448 12.1953 1.5145 11.4142ZM11.414 8.58577C12.195 9.36677 12.195 10.6332 11.414 11.4142C10.6329 12.1953 9.3666 12.1953 8.5856 11.4142C7.80452 10.6332 7.80452 9.36677 8.5856 8.58577C9.3666 7.8047 10.6329 7.8047 11.414 8.58577Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>

`
  },
  {
    label: "Общежитие",
    route: "/in-progress",
    icon: `<svg width="18" height="20" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 11V8M1 8V1M1 8H10.5M10.5 8V2H17C18.1046 2 19 2.89543 19 4V8M10.5 8H19M19 8V11M7 3.5C7 4.3284 6.32843 5 5.5 5C4.67157 5 4 4.3284 4 3.5C4 2.67157 4.67157 2 5.5 2C6.32843 2 7 2.67157 7 3.5Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>

`
  },
  {
    label: "Выплаты",
    route: "/in-progress",
    icon: `<svg width="16" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16V19M5 16H6C7.6569 16 9 14.6569 9 13C9 11.3431 7.6569 10 6 10H4C2.34315 10 1 8.6569 1 7C1 5.34315 2.34315 4 4 4H5M5 16H4C2.34315 16 1 14.6569 1 13M5 4V1M5 4H6C7.6569 4 9 5.34315 9 7" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>

`
  },
];
const internet = [
  {
    label: "Новости",
    route: "/in-progress",
    icon: `
<svg width="18" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 20.5C16.2467 20.5 20.5 16.2467 20.5 11C20.5 5.75329 16.2467 1.5 11 1.5M11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5M11 20.5C13.2091 20.5 15 16.2467 15 11C15 5.75329 13.2091 1.5 11 1.5M11 20.5C8.79086 20.5 7 16.2467 7 11C7 5.75329 8.79086 1.5 11 1.5M2 8H20M2 14H20" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>

`
  },
  {
    label: "Система дистанционного обучения",
    route: "https://do.rusoil.net/login/index.php",
    icon: `<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3619 8.5C14.0779 6.9715 12.1523 6 9.9998 6C7.84733 6 5.92177 6.9715 4.6377 8.5M18.9445 5C16.7472 2.545 13.5541 1 10.0001 1C6.44609 1 3.25295 2.545 1.05566 5M12 13C12 14.1046 11.1046 15 10 15C8.8954 15 8 14.1046 8 13C8 11.8954 8.8954 11 10 11C11.1046 11 12 11.8954 12 13Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>

`
  },
  {
    label: "О приложении",
    route: "/student/about",
    icon: `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
<path d="M9 10V14C9 14.5523 9.4477 15 10 15C10.5523 15 11 14.5523 11 14V10C11 9.4477 10.5523 9 10 9C9.4477 9 9 9.4477 9 10Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
<path d="M11 6C11 5.44772 10.5523 5 10 5C9.4477 5 9 5.44772 9 6C9 6.55229 9.4477 7 10 7C10.5523 7 11 6.55229 11 6Z" stroke="black" stroke-width="1.25" stroke-linecap="round"/>
</svg>

`
  },
];

const isActive = (routePath: any) => {
  return route.path === routePath;
};

onMounted(() => {
  const storageUser = localStorage.getItem('user')
  if (storageUser) {
    const user = JSON.parse(storageUser);
    firstName.value = user.firstName
    lastName.value = user.lastName
    group.value = user.group
    faculty.value = user.faculty
    specialty.value = user.specialty

  }
})
</script>

<template>
  <AccountMoloMobile>
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
    <NuxtLink class="student-userdata" to="/student/personal-data">
      <section class="span">
        <svg fill="none" height="20" viewBox="0 0 16 20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M7.9997 11.5C4.5419 11.5 1.63061 13.84 0.763071 17.0229C0.472601 18.0886 1.39517 19 2.49974 19H13.4997C14.6043 19 15.5269 18.0886 15.2364 17.0229C14.3689 13.84 11.4576 11.5 7.9997 11.5Z"
              stroke="black" stroke-linecap="round" stroke-width="1.25"/>
          <path
              d="M11.4997 5C11.4997 6.933 9.93272 8.5 7.99972 8.5C6.06672 8.5 4.49976 6.933 4.49976 5C4.49976 3.067 6.06672 1.5 7.99972 1.5C9.93272 1.5 11.4997 3.067 11.4997 5Z"
              stroke="black" stroke-linecap="round" stroke-width="1.25"/>
        </svg>
        <span>
            Персональные данные
          </span>
      </section>
      <section class="vector">
        <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="#7B7B7B" stroke-linecap="round" stroke-width="1.25"/>
        </svg>
      </section>
    </NuxtLink>
    <section class="student-actions">
      <NuxtLink
          v-for="(action, index) in actions"
          :key="index"
          :class="{ 'first-item': index === 0, 'last-item': index === actions.length - 1 }"
          :to="action.route"
          class="student-action"
      >
        <section class="span">
          <svg
              v-if="action.icon"
              :style="{ stroke: isActive(action.route) ? 'blue' : 'black' }"
              class="action-icon"
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              v-html="action.icon"
          ></svg>
          <span>
              {{ action.label }}
            </span>
        </section>
        <section class="vector">
          <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="#7B7B7B" stroke-linecap="round" stroke-width="1.25"/>
          </svg>
        </section>

      </NuxtLink>
    </section>
    <section class="student-actions">
      <NuxtLink
          v-for="(buss, index) in business"
          :key="index"
          :to="buss.route"
          class="student-action"
      >
        <section class="span">
          <svg
              v-if="buss.icon"
              :style="{ stroke: isActive(buss.route) ? 'blue' : 'black' }"
              class="action-icon"
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              v-html="buss.icon"
          ></svg>
          <span>
              {{ buss.label }}
            </span>
        </section>
        <section class="vector">
          <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="#7B7B7B" stroke-linecap="round" stroke-width="1.25"/>
          </svg>
        </section>

      </NuxtLink>
    </section>
    <section class="student-actions">
      <NuxtLink
          v-for="(inter, index) in internet"
          :key="index"
          :to="inter.route"
          class="student-action"
      >
        <section class="span">
          <svg
              v-if="inter.icon"
              :style="{ stroke: isActive(inter.route) ? 'blue' : 'black' }"
              class="action-icon"
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              v-html="inter.icon"
          ></svg>
          <span>
              {{ inter.label }}
            </span>
        </section>
        <section class="vector">
          <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="#7B7B7B" stroke-linecap="round" stroke-width="1.25"/>
          </svg>
        </section>

      </NuxtLink>
    </section>
    <NuxtLink class="student-userdata" to="/student">
      <section class="span">
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
        <span>
            Оформление
          </span>
      </section>
      <section class="vector">
        <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="#7B7B7B" stroke-linecap="round" stroke-width="1.25"/>
        </svg>
      </section>
    </NuxtLink>

    <NuxtLink class="exit" to="/login/student">
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
  margin-top: 5%;
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

.student-userdata {
  background-color: white;
  padding: 10px 20px;
  text-align: start;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  width: 80%;
  border-radius: 10px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #e7e7e7;
    cursor: pointer;
  }

  &:active {
    background-color: #cbcbcb;
    cursor: pointer;
  }
}

.span {
  display: flex;
  gap: 10px;
}

.student-actions {
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 0 20px;
  justify-content: center;
  align-items: center;

}


.student-action {
  background-color: white;
  text-align: start;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
  padding: 10px 20px;
  border: 1px ridge rgba(229, 231, 235, 0.42);
  color: black;
  text-decoration: none;

  &:hover {
    background-color: #e7e7e7;
    cursor: pointer;
  }

  &:active {
    background-color: #cbcbcb;
    cursor: pointer;
  }

  &:first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}

.exit {
  display: flex;
  gap: 20px;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
  margin-bottom: 100px;
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
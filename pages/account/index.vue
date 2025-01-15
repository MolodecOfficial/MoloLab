<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useUserStore} from '~/stores/userStore';
import OtherLinks from "~/layouts/account/section/OtherLinks.vue";
import {useThemeStore} from "~/stores/themeStore";


useHead({
  title: 'УГНТУ | Личный кабинет'
})

const userStore = useUserStore();
const themeStore = useThemeStore()
const userFirstName = ref('');
const userLastName = ref('');
const userEmail = ref('')
const userStatus = ref('')
const router = useRouter()

// Загрузка данных из localStorage
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    userFirstName.value = user.firstName;
    userLastName.value = user.lastName;
    userEmail.value = user.email;
    userStatus.value = user.status
  } else {
    userFirstName.value = userStore.userFirstName;
    userLastName.value = userStore.userLastName;
    userEmail.value = userStore.userEmail;
    userStatus.value = userStore.userStatus
  }

});

</script>

<template>
  <AccountMoloHeader/>
  <div class="container">
    <AccountMoloRouteList/>
    <section class="user-info">
      <section class="user-info__main">
        <section class="user-card">
          <span>
            Личные данные студента
          </span>
          <section class="user-card__details">
            <p>ФИО: <code>{{ userFirstName }}</code> <code>{{ userLastName }}</code></p>
            <p>Email: <code>{{ userEmail }}</code></p>
            <p>Статус: <code>{{ userStatus }}</code></p>
          </section>
        </section>
        <section class="specialty-info">
          <section class="specialty-info__list">
            <span>Сведения о специальности</span>
            <AccountMoloProfInfo/>
          </section>
        </section>
        <section class="additional-links-mobile">
          <OtherLinks/>
        </section>
      </section>
      <section class="additional-links">
        <OtherLinks/>
      </section>
    </section>
  </div>
</template>

<style scoped>

.container {
  overflow: hidden;
  display: flex;
  background-color: white;
  min-height: fit-content;
}

.user-info {
  display: flex;
  height: 93vh;
  background-color: rgba(237, 244, 255, 0.82);
  width: 95%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding: 0 40px 0 40px;
  border-top-left-radius: 20px;
  border: 1px solid #e0e0e0;

}

.user-info__main {
  display: flex;
  height: 35%;
  gap: 40px;

}

.user-card {
  background-color: #ffffff;
  height: 100%;
  width: 30%;
  border-radius: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

  & span {
    padding-top: 20px;
    color: #053969;
    font-size: 20px;
  }
}

.user-card__details {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 20px;

  & p {
    text-align: center;
    font-size: clamp(14px, 1.3vw, 20px);
    color: #052542;
  }

  & code {
    color: #5a87e7;
  }
}

.specialty-info {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

}

.specialty-info__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & span {
    padding: 20px 0 20px 0;
    color: #053969;
    font-size: 20px;
  }
}


.dark-theme header,
.dark-theme .user-card,
.dark-theme .specialty-info {
  background-color: #1e1e1e;
}

.dark-theme .user-card,
.dark-theme .specialty-info {
  border: 1px solid #2c2c2c;
}

.dark-theme .user-info {
  background-color: #151515;

}

.additional-links-mobile {
  display: none;
}

.additional-links {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
}

.dark-theme .container {
  background-color: #1e1e1e;
}

.dark-theme .user-info,
.dark-theme .additional-links {
  border: 1px solid #2c2c2c;
}

.dark-theme .user-card__details p {
  color: #4e45e3;
  font-weight: bold;

}

.dark-theme .user-card__details code {
  color: white;
}

.dark-theme .specialty-info__list span,
.dark-theme .user-card span {
  color: #c2c2c2;
}

@media (max-width: 560px) {

  .user-info {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: start;
    align-items: center;
    padding: 0 5px 0 5px;

  }

  .user-info__main {
    width: 90%;
    display: flex;
    align-items: start;
    flex-direction: column;
    padding: 40px 0 20px 0;
    height: 38%;
    gap: 20px;
  }
  .user-card {
    width: 100%;
    display: flex;
    justify-content: start;

    & span {
      font-size: clamp(16px, 5vw, 24px);
    }
  }
  .user-card__details {
    & p {
      font-size: clamp(16px, 4vw, 20px);
    }
  }
  .additional-links {
    display: none
  }
  .specialty-info {
    padding-bottom: 10px;
  }

  .specialty-info__list {
    text-align: center;
    & span {
      font-size: clamp(16px, 5vw, 24px);
    }
  }

  .additional-links-mobile {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

@media (min-width: 561px) and (max-width: 765px) {
  .user-info {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: start;
    align-items: center;
    padding: 0 5px 0 5px;

  }

  .user-info__main {
    width: 90%;
    display: flex;
    align-items: start;
    flex-direction: column;
    padding: 40px 0 20px 0;
    height: 38%;
    gap: 40px;
  }
  .user-card {
    width: 100%;
    display: flex;
    justify-content: start;

    & span {
      font-size: clamp(16px, 5vw, 24px);
    }
  }
  .user-card__details {
    & p {
      font-size: clamp(16px, 4vw, 20px);
    }
  }

  .specialty-info {
    padding-bottom: 20px;
  }

  .specialty-info__list {
    text-align: center;
    & span {
      font-size: clamp(16px, 5vw, 24px);
    }
  }
  .additional-links-mobile {
    display: flex;
    flex-direction: column;
  }

  .additional-links {
    display: none;
  }
}

@media (min-width: 766px) and (max-width: 1280px) {

  .user-info__main {
    gap: 20px;
  }


  .user-card {
    width: 25%;
    display: flex;
    justify-content: start;
    & span {
      font-size: clamp(14px, 5vw, 16px);

    }
  }

  .user-card__details {
    height: 60%;
    padding: 10px;
    & p {
      font-size: clamp(13px, 5vw, 17px);
    }
    & code {
      font-size: clamp(13px, 5vw, 17px);

    }
  }

  .user-card__details p:first-child {
    padding-top: 25px;
  }

  .additional-links {
    width: 100%;
    font-size: 14px;
  }
}

</style>
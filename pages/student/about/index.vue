<script lang="ts" setup>

</script>

<template>
  <AccountMoloMobile>
    <section class="about">
      <section class="about-section">
      <span>
        Данное приложение было создано простым студентом, вдохновлённый разработкой сайта для своего вуза.
      </span>
        <span>
        Не имея коммерческого опыта, пытаясь сделать нечто инновационное, он достиг создания сайта, который сейчас исправно функционирует, раз вы читаете этот текст.
      </span>
        <span>
        Разработка приложения шла с августа. Используя новые технологии, постепенно перестраиваясь на новую структуру, сайт приобретал минимально надлежащий вид.
      </span>
        <span>
        Автор сего деяния - <span class="Molodec">Moloдец Official</span>
      </span>
      </section>
      <section class="about-technologies">
        <span class="Molodec">
          Используемые технологии:
        </span>
        <span>
          <span class="Molodec">Nuxt 3</span> - Основа данного приложения. Удобный импорт компонентов и маршрутизирование страниц.
        </span>
        <span>
          <span class="Molodec">TypeScript</span> - Основной ЯП данного приложения. Можно попробовать и на JavaScript, но зачем?)
        </span>
        <span>
          <span class="Molodec">MongoDB</span> - База данных данного приложения. Выбор упал на него, потому что это единственная БД, которую я смог настроить :)
        </span>
        <span>
          <span class="Molodec">Pinia</span> - Управление состоянием данного приложения. Можно сказать - некая локальная БД, с удобным сохранением данных о пользователе.
        </span>
        <span>
          <span class="Molodec">SCSS</span> - Препроцессор данного приложения. Почему не TailwindCSS? Не захотел, вот и всё) Люблю структурированность, где всё в отдельном блоке)
        </span>
        <span>
          <span class="Molodec">Vercel</span> - Хост данного приложения. Хотел на github.io, но не сложилось, в другой раз)
        </span>
      </section>
      <section class="about-me">
        <span class="Molodec">
          Moloдец в социальных сетях
        </span>
        <span class="gap">
           <NuxtLink class="link" to="https://t.me/molodec_official_tg">Телеграм</NuxtLink>
           <NuxtLink class="link" to="https://vk.com/molodec_official">ВКонтакте</NuxtLink>
           <NuxtLink class="link" to="https://github.com/MolodecOfficial">ГитХаб</NuxtLink>

        </span>
      </section>
    </section>
  </AccountMoloMobile>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.about-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: white;
  text-align: center;
  color: #7b7b7b;
  gap: 8px;

  & .Molodec {
    color: #2c2c2c;
  }
}

.about-technologies {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 20px;
  border-radius: 15px;
  background-color: white;
  text-align: center;
  color: #7b7b7b;
  gap: 8px;
  & .Molodec {
    color: #2c2c2c;
  }

}

.gap {
  display: flex;
  gap: 10px;
  & .link {
    text-decoration: underline 1px;
    color: black;
    text-underline-offset: 3px;
  }
}

.about-me {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 20px;
  border-radius: 15px;
  background-color: white;
  text-align: center;
  color: #7b7b7b;
  gap: 8px;
  margin-bottom: 100px;
}
</style>
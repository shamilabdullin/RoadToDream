<script setup lang="ts">
// Компонент без логики — только раскладка. Содержимое приходит через слоты.
</script>

<template>
  <section class="card">
    <!-- Именованный слот: родитель заполняет его через <template #header> -->
    <header class="card-header">
      <slot name="header" />
    </header>

    <!-- Слот по умолчанию: всё, что родитель положил между тегами. React: {children} -->
    <slot />

    <!-- $slots — какие слоты передал родитель. Футер рендерим, только если он есть -->
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.card {
  background: var(--surface);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 24px rgb(0 0 0 / 0.08);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
}
.card-footer {
  margin-top: 16px;
  text-align: right;
}
</style>

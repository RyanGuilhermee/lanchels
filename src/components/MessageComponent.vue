<script setup lang="ts">
const props = defineProps<{
  showMessage: string;
  message: string;
  color: string;
}>();
</script>

<template>
  <div class="message d-flex justify-content-center mt-4">
    <div
      :class="`toast align-items-center text-bg-${props.color} border-0 ${props.showMessage}`"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ props.message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import IconRightChevron from "@/assets/icons/right-chevron.svg";

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <BaseButton class="z-10 !p-4" variant="primary" @click="handleScrollToTop">
    <IconRightChevron class="h-4 w-4 -rotate-90" />
  </BaseButton>
</template>

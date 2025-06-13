<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import IconList from "@/assets/icons/list.svg";
import IconStar from "@/assets/icons/star.svg";

const activeButton = ref<"all" | "favorites">("all");

const handleClick = (button: "all" | "favorites") => {
  activeButton.value = button;
};
</script>

<template>
  <div
    class="footer-filters-container fixed bottom-0 left-0 flex w-full justify-center gap-4 bg-white py-4.5"
  >
    <BaseButton
      class="flex min-w-[275px] items-center justify-center gap-x-2.5 !py-2.5"
      :variant="activeButton === 'all' ? 'primary' : 'secondary'"
      @click="handleClick('all')"
    >
      <IconList class="h-5.5 w-5.5" />
      All
    </BaseButton>
    <BaseButton
      class="flex min-w-[275px] items-center justify-center gap-x-2.5 !py-2.5"
      :variant="activeButton === 'favorites' ? 'primary' : 'secondary'"
      @click="handleClick('favorites')"
    >
      <IconStar class="h-5.5 w-5.5" />
      Favorites
    </BaseButton>
  </div>
</template>

<style scoped>
.footer-filters-container {
  box-shadow: 0px -5px 4px 0px #0000000d;
}
</style>

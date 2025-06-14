<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import IconList from "@/assets/icons/list.svg";
import IconStar from "@/assets/icons/star.svg";
import type { FooterFilterOptions } from "@/types/filters.type";

const emit = defineEmits(["onFilterChange"]);

const activeButton = ref<FooterFilterOptions>("all");

const handleClick = (buttonName: FooterFilterOptions) => {
  activeButton.value = buttonName;
  emit("onFilterChange", buttonName);
};
</script>

<template>
  <div
    class="footer-filters-container fixed bottom-0 left-0 flex w-full justify-center gap-x-[15px] bg-white px-7.5 py-4.5 lg:gap-x-4 lg:px-0"
  >
    <BaseButton
      class="flex h-11 w-full max-w-[275px] items-center justify-center gap-x-2.5 !py-2.5"
      :variant="activeButton === 'all' ? 'primary' : 'secondary'"
      @click="handleClick('all')"
    >
      <IconList class="h-5.5 w-5.5" />
      <span>All</span>
    </BaseButton>
    <BaseButton
      class="flex h-11 w-full max-w-[275px] items-center justify-center gap-x-2.5 !py-2.5"
      :variant="activeButton === 'favorites' ? 'primary' : 'secondary'"
      @click="handleClick('favorites')"
    >
      <IconStar class="h-5.5 w-5.5" />
      <span>Favorites</span>
    </BaseButton>
  </div>
</template>

<style scoped>
.footer-filters-container {
  box-shadow: 0px -5px 4px 0px #0000000d;
}
</style>

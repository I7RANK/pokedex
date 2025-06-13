<script setup lang="ts">
import IconStarEnabled from "@/assets/icons/star-enabled.svg";
import IconStarDisabled from "@/assets/icons/star-disabled.svg";

defineProps<{
  name: string;
  isFavorite: boolean;
}>();
</script>

<template>
  <div
    class="flex w-full items-center justify-between rounded-[5px] bg-white py-2 pr-2.5 pl-5"
  >
    <p class="text-[22px] capitalize">{{ name }}</p>
    <div class="relative h-11 w-11">
      <IconStarEnabled
        class="absolute h-full w-full"
        :class="isFavorite ? '' : 'opacity-0'"
      />
      <IconStarDisabled
        class="absolute h-full w-full"
        :class="isFavorite ? 'opacity-0' : ''"
      />
    </div>
  </div>
</template>

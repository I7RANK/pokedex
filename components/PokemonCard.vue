<script setup lang="ts">
import IconStarEnabled from "@/assets/icons/star-enabled.svg";
import IconStarDisabled from "@/assets/icons/star-disabled.svg";

defineProps<{
  name: string;
  isFavorite: boolean;
}>();

const emit = defineEmits(["onClickFavorites"]);
</script>

<template>
  <div
    class="flex w-full items-center justify-between rounded-[5px] bg-white py-2 pr-2.5 pl-5"
  >
    <p class="text-[22px] capitalize">{{ name }}</p>
    <button
      class="relative h-11 w-11 cursor-pointer"
      @click="emit('onClickFavorites')"
    >
      <IconStarEnabled
        class="absolute top-0 h-full w-full hover:opacity-90"
        :class="isFavorite ? '' : 'pointer-events-none opacity-0'"
      />
      <IconStarDisabled
        class="absolute top-0 h-full w-full hover:opacity-90"
        :class="isFavorite ? 'pointer-events-none opacity-0' : ''"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import IconStarEnabled from "@/assets/icons/star-enabled.svg";
import IconStarDisabled from "@/assets/icons/star-disabled.svg";

defineProps<{
  isFavorite: boolean;
}>();

const emit = defineEmits(["onClickFavorites"]);
</script>

<template>
  <button
    class="relative h-11 w-11 cursor-pointer"
    @click.stop="emit('onClickFavorites')"
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
</template>

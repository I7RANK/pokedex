<script setup lang="ts">
import type { PokemonDetailed } from "@/types/pokemon.type";
import BaseButton from "@/components/BaseButton.vue";
import FavoriteButton from "@/components/FavoriteButton.vue";
import { copyToClipboard } from "@/utils/copyToClipboard";
import IconCircleX from "@/assets/icons/circle-x.svg";

const props = defineProps<{
  show: boolean;
  close: (e?: MouseEvent) => void;
  detailedApiEndpoint: string;
  isFavorite: boolean;
}>();

const emit = defineEmits(["onClickFavorites"]);

const loading = ref(true);
const pokemonData = ref<PokemonDetailed>();
const pokemonSprite = ref("");
const pokemonTypesFormatted = ref("");
const sharePokemonString = ref("");
const copyButtonText = ref<"Share to my friends" | "Copied!">(
  "Share to my friends",
);

const getPokemonInfo = async () => {
  loading.value = true;
  try {
    pokemonData.value = await $fetch<PokemonDetailed>(
      props.detailedApiEndpoint,
    );
    pokemonSprite.value =
      pokemonData.value.sprites.other["official-artwork"].front_default;
    pokemonTypesFormatted.value = pokemonData.value?.types
      .map((type) => type.type.name)
      .join(", ");
    sharePokemonString.value = [
      pokemonData.value.name,
      pokemonData.value.weight,
      pokemonData.value.height,
      pokemonTypesFormatted.value,
    ].join(", ");
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleShareClick = async () => {
  const copySuccess = await copyToClipboard(sharePokemonString.value);
  if (!copySuccess) return;
  copyButtonText.value = "Copied!";
  setTimeout(() => {
    copyButtonText.value = "Share to my friends";
  }, 20000);
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
      getPokemonInfo();
    } else {
      document.body.style.overflow = "";
    }
  },
);

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-7.5"
      @click.self="close"
    >
      <div
        v-if="pokemonData"
        class="max-w-layout relative w-full rounded-[5px] bg-white"
      >
        <button
          @click="close"
          class="absolute top-2 right-2 z-10 cursor-pointer text-xl"
        >
          <IconCircleX
            class="h-[26px] w-[26px] text-white hover:text-gray-200"
          />
        </button>
        <div class="relative h-55 w-full">
          <img
            class="absolute h-full w-full object-cover"
            src="https://res.cloudinary.com/dnmjkesyn/image/upload/q_auto:best/v1749959763/pokedex-bg_ycitni.png"
            alt="pokemon background"
          />
          <img
            class="floating absolute left-1/2 h-full w-auto -translate-x-1/2 object-contain object-bottom py-5"
            :src="pokemonSprite"
            alt="pokemon"
          />
          <div
            class="shadow-animation absolute -bottom-4 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-black/30"
          ></div>
        </div>
        <div class="px-7.5 py-5">
          <div class="text-h2 text-neutral flex flex-col gap-y-2.5 capitalize">
            <p class="border-b border-[#E8E8E8] pb-2.5">
              <strong>Name:</strong> {{ pokemonData?.name }}
            </p>
            <p class="border-b border-[#E8E8E8] pb-2.5">
              <strong>Weight:</strong> {{ pokemonData?.weight }}
            </p>
            <p class="border-b border-[#E8E8E8] pb-2.5">
              <strong>Height:</strong> {{ pokemonData?.height }}
            </p>
            <p
              class="line-clamp-2 max-h-14 border-b border-[#E8E8E8] pb-2.5"
              :title="pokemonTypesFormatted"
            >
              <strong>Types:</strong> {{ pokemonTypesFormatted }}
            </p>
          </div>
          <div class="mt-5 flex justify-between">
            <BaseButton
              :variant="copyButtonText === 'Copied!' ? 'secondary' : 'primary'"
              :disabled="copyButtonText === 'Copied!'"
              @click="handleShareClick"
            >
              {{ copyButtonText }}
            </BaseButton>
            <FavoriteButton
              :is-favorite="isFavorite"
              @on-click-favorites="emit('onClickFavorites')"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

@keyframes shadow-float {
  0%,
  100% {
    transform: scale(1) rotateX(80deg);
  }
  50% {
    transform: scale(0.8) rotateX(80deg);
  }
}

.floating {
  animation: float 3s ease-in-out infinite;
}

.shadow-animation {
  animation: shadow-float 3s ease-in-out infinite;
}
</style>

<script setup lang="ts">
import type { PokemonResponse, Pokemon } from "@/types/pokemon.type";
import PokemonCard from "~/components/PokemonCard.vue";
import FooterFilters from "~/components/FooterFilters.vue";

const allPokemons = ref<Pokemon[]>([]);
const maxIndex = ref(0);
const loading = ref(true);

const getAllPokemons = async () => {
  try {
    const { results } = await $fetch<PokemonResponse>(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000",
    );
    console.log(results);
    allPokemons.value = results || [];
    maxIndex.value = allPokemons.value.length || 0;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const favorites = ref<Record<string, boolean>>({});

const visiblePokemons = ref<Pokemon[]>([]);
const batchSize = 24;
const currentIndex = ref(0);
const sentinel = ref(null);

const loadMore = () => {
  const nextBatch = allPokemons.value.slice(
    currentIndex.value,
    currentIndex.value + batchSize,
  );
  visiblePokemons.value.push(...nextBatch);
  currentIndex.value += batchSize;
};

const createObserver = () => {
  if (!sentinel.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMore();
    },
    { threshold: 1 },
  );
  observer.observe(sentinel.value);
};

onMounted(async () => {
  await getAllPokemons();
  console.log(allPokemons.value);
  loadMore();
  createObserver();
});
</script>

<template>
  <div class="mb-20">
    {{ loading }}
    <div v-if="loading"></div>
    <div v-else>
      <div class="max-w-layout mx-auto flex flex-col items-center gap-y-2.5">
        <PokemonCard
          v-for="(pokemon, i) in visiblePokemons"
          :key="pokemon.name"
          :name="pokemon.name"
          :is-favorite="favorites[pokemon.name] || false"
        />
      </div>
      <div ref="sentinel" class="h-10" />
      <div v-if="currentIndex >= maxIndex" class="mt-6 mb-28 text-center">
        👀 "You’ve reached the end... unless Mew is hiding somewhere."
      </div>
    </div>
    <FooterFilters />
  </div>
</template>

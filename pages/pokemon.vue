<script setup lang="ts">
import type {
  PokemonResponse,
  Pokemon,
  FavoritesMap,
} from "@/types/pokemon.type";
import type { FooterFilterOptions } from "@/types/filters.type";
import PokeBallLoader from "~/components/PokeBallLoader.vue";
import PokemonCard from "~/components/PokemonCard.vue";
import FooterFilters from "~/components/FooterFilters.vue";
import NotFoundMessage from "~/components/NotFoundMessage.vue";
import SearchInput from "~/components/SearchInput.vue";
import ScrollToTopButton from "~/components/ScrollToTopButton.vue";
import PokemonDetailsModal from "~/components/PokemonDetailsModal.vue";
import { filterPokemonByName } from "~/utils/filterPokemonByName";

const FAVORITES_KEY = "favorites";
const searchQuery = ref("");
const allPokemons = ref<Pokemon[]>([]);
const maxIndex = ref(0);
const loading = ref(true);
const activeFilter = ref<FooterFilterOptions>("all");
const favorites = ref<FavoritesMap>({});
const loadedPokemons = ref<Pokemon[]>([]);
const batchSize = 24;
const currentIndex = ref(0);
const sentinel = ref(null);
const showModal = ref(false);
const selectedPokemonForDetails = ref<Pokemon>({
  name: "",
  url: "",
});

const visiblePokemons = computed(() => {
  let baseList: Pokemon[] = [];
  if (activeFilter.value === "all") {
    // is searchQuery has value will filter from all pokemons
    // instead of only loaded pokemons
    if (searchQuery.value.trim() !== "") baseList = allPokemons.value;
    else baseList = loadedPokemons.value;
  } else {
    baseList = Object.values(favorites.value)
      .filter((favorite) => favorite.isFavorite)
      .map((favorite) => favorite.pokemon);
  }

  return filterPokemonByName(searchQuery.value, baseList);
});

const hasFavorites = computed(() => {
  return Object.values(favorites.value).some((favorite) => favorite.isFavorite);
});

const getAllPokemons = async () => {
  loading.value = true;
  try {
    const { results } = await $fetch<PokemonResponse>(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000",
    );
    allPokemons.value = results || [];
    maxIndex.value = allPokemons.value.length || 0;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const loadMore = () => {
  const nextBatch = allPokemons.value.slice(
    currentIndex.value,
    currentIndex.value + batchSize,
  );
  loadedPokemons.value.push(...nextBatch);
  currentIndex.value += batchSize;
};

const createObserver = () => {
  if (!sentinel.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (activeFilter.value === "favorites") return;
      if (searchQuery.value.trim() !== "") return;
      if (entries[0].isIntersecting) loadMore();
    },
    { threshold: 1 },
  );
  observer.observe(sentinel.value);
};

const restoreFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      const parsed = JSON.parse(savedFavorites) as FavoritesMap;
      favorites.value = Object.fromEntries(
        Object.entries(parsed).filter(([_, fav]) => fav.isFavorite),
      );
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  restoreFavorites();
  await getAllPokemons();
  loadMore();
  createObserver();
});

const openModal = (pokemon: Pokemon) => {
  selectedPokemonForDetails.value = pokemon;
  showModal.value = true;
};

const handleOnClickFavorites = (pokemon: Pokemon) => {
  const { name } = pokemon;
  if (favorites.value[name] === undefined)
    favorites.value[name] = { pokemon, isFavorite: true };
  else favorites.value[name].isFavorite = !favorites.value[name].isFavorite;
};

const handleFilterChange = (selectedFilter: FooterFilterOptions) => {
  activeFilter.value = selectedFilter;
};

watch(searchQuery, (value) => {
  if (value.trim() === "") return;
});

watch(
  () => ({
    keys: Object.keys(favorites.value),
    favorites: Object.values(favorites.value).map((f) => f.isFavorite),
  }),
  () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value));
  },
);
</script>

<template>
  <div class="mb-20">
    <PokemonDetailsModal
      :show="showModal"
      :close="() => (showModal = false)"
      :is-favorite="
        favorites[selectedPokemonForDetails.name]?.isFavorite || false
      "
      :detailed-api-endpoint="selectedPokemonForDetails.url"
      @on-click-favorites="handleOnClickFavorites(selectedPokemonForDetails)"
    />
    <div
      v-if="loading"
      class="fixed top-0 left-0 flex h-screen w-full items-center justify-center"
    >
      <PokeBallLoader />
    </div>
    <div v-else class="max-w-layout mx-auto">
      <SearchInput v-model="searchQuery" />
      <NotFoundMessage
        v-if="searchQuery.trim() !== '' && !visiblePokemons.length"
      />
      <div
        v-if="visiblePokemons.length"
        class="mt-10 flex flex-col items-center gap-y-2.5"
      >
        <PokemonCard
          v-for="pokemon in visiblePokemons"
          :key="pokemon.name"
          :name="pokemon.name"
          :is-favorite="favorites[pokemon.name]?.isFavorite || false"
          @on-click-favorites="handleOnClickFavorites(pokemon)"
          @on-click-card="openModal(pokemon)"
        />
      </div>
      <div
        v-if="currentIndex >= maxIndex"
        class="text-neutral mt-6 mb-28 text-center"
      >
        👀 You’ve reached the end... unless Mew is hiding somewhere.
      </div>
      <div
        v-if="!hasFavorites && activeFilter === 'favorites'"
        class="text-neutral mt-6 mb-28 text-center"
      >
        No favorites yet. Even Pikachu didn’t stick around! ⚡ Catch some and
        show them love.
      </div>
      <div ref="sentinel" class="h-10" />
      <FooterFilters @on-filter-change="handleFilterChange" />
      <ScrollToTopButton class="fixed right-5 bottom-24 w-11" />
    </div>
  </div>
</template>

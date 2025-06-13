<script setup lang="ts">
import PikaGreetingsSection from "~/components/PikaGreetingsSection.vue";

useSeoMeta({
  title: "Pokedex",
  ogTitle: "Pokedex",
  description:
    "The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.",
  ogDescription:
    "The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.",
  ogImage:
    "https://res.cloudinary.com/dnmjkesyn/image/upload/q_auto:best/v1749764680/9114966f-19d1-4062-9c7a-f774007b2594.png",
});
</script>

<template>
  <div class="flex justify-center">
    <PikaGreetingsSection />
  </div>
</template>

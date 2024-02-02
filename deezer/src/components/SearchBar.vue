<template>
  <div class="align-center text-center fill-height my-10">
    <div class="align-center text-center fill-height my-3">
      <div class="search-container">
        <input
          class="search-bar"
          :class="{ 'is-input-focused': isInputFocused }"
          style="width: 50%; border-bottom: 1px solid #ccc; padding-bottom: 5px;"
          v-model="query"
          type="text"
          placeholder=""
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <div class="placeholder-text" v-if="!query || isInputFocused">Search Music Artist</div>
      </div>
    </div>
    <button class="search-button" @click="handleSearch">Search</button>
  </div>
  <div v-if="searchResults && searchResults.length" class="search-result">
    <SearchResult v-for="result in searchResults" :key="result.id" :result="result" @play="handlePlay" />
  </div>
</template>


<script>
import { searchArtists } from "@/utils/api";
import SearchResult from "@/components/SearchResult.vue";

export default {
  components: {
  SearchResult,
  },
  data() {
    return {
      query: "",
      searchResults: [],
      isInputFocused: false,
    };
  },
  methods: {
    handleInput() {
    },
    async handleSearch() {
      try {
        const results = await searchArtists(this.query);
        this.searchResults = results || [];
        this.$emit('search', this.query, results);
      } catch (error) {
        console.error("Error searching artists:", error.message);
      }
    },
    handlePlay(songDetails) {
      console.log("Playing:", songDetails.artist, "-", songDetails.title);
      console.log("Preview:", songDetails.preview);
    },
    handleFocus() {
      this.isInputFocused = true;
    },
    handleBlur() {
      this.isInputFocused = false;
    },
  },
};
</script>

<style lang="scss" src="@/styles/settings.scss" scoped>

</style>

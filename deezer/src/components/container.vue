<template>
    <div class="container">
      <div class="row text-center">
        <div class="col col-12">
          <div class="v-image v-responsive my-3 theme--light">
            <TitleCard />
          </div>
          <SearchBar />
        </div>
      </div>
      <div class="row text-center d-flex justify-center">
      </div>
    </div>
  </template>
  
  <script>
  import TitleCard from './TitleCard.vue';
  import SearchBar from './SearchBar.vue';

  
  export default {
    components: {
    TitleCard,
    SearchBar
},
  };
  </script>
  
  <style lang="scss" src="@/styles/settings.scss" scoped>
  </style>
  
<template>
  <div v-if="result" class="search-result">
    <div class="album-info-results">
        <div class="top-info">
          <div class="song-artist">
            <div class="name-explicit">
              <p 
                class="ml-3 mt-4" 
                style="font-size: 1.25em; font-weight: 500;
                text-align: left;">
                {{ result.title }}
              </p>
              <div class="explicit-time">
                <div v-if="result.explicit_lyrics" class="song-explicit">
                </div>
                <div class="song-time">
              {{ Math.floor(result.duration / 60) }} minutes    
                </div>
              </div>
            </div>
              <p 
                class="mb-4 ml-3" 
                style="font-size: .8em; 
                text-align: left;">
                {{ result.artist }}
              </p>
          </div>
            <div class="results-display mb-5">
              <div class="album-cover ml-3">
          <img :src="result.albumcover" alt="Album Cover" />
              </div>
              <div class="song-preview-display">
                <p 
                  class="ml-3" 
                  style="font-size: .875rem; font-weight: 400 line-height: 1.375rem; letter-spacing:.0071428571em; color: grey;
                  text-align: left;">
                  Preview
                </p> 
                <div class="song-play-info"> 
                  <button @click="playSong" class="play-button">
                  <font-awesome-icon icon="play" />
                  </button>
                    <div class="progress-bar-container">
        <!-- Audio element for song preview  -->
  <audio ref="audioPlayer" :src="result.songpreview" @timeupdate="updateProgressBar"></audio>

   <!-- Progress bar for song preview -->
  <div class="progress-bar">
    <div :style="{ width: progressBarWidth }"></div>
  </div>
                    </div>
                  <div class="volume-container">
                    <div class="volume-button" @mouseenter="toggleVolume" @mouseleave="toggleVolume">
                    <div v-if="showVolumeSlider" class="volume-slider">
                      <input type="range" v-model="volume" min="0" max="1" step="0.01" @input="adjustVolume" />
                    </div>
                    <button>
                      <font-awesome-icon icon="volume-up" />
                    </button>
                    </div>
                    <div>
                      <div class="dropdown">
                        <div>
                          <button @click="toggleDropdown" class="mx-3 mt-2" :style="{ backgroundColor: dropdownOpen ? 'grey' : 'hidden', borderRadius: '100px', width: '25px', transition: 'background-color 0.3s' }">
                            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                          </button>
                        </div>
                        <div v-if="isDropdownOpen" class="dropdown-list">
                          <div @click="popup" class="dropdown-contents"><font-awesome-icon :icon="['fas', 'download']" />
                            <p style="border: 1px;">Download
                            </p>
                          </div>
                          <div  @click="playSpeed" class="dropdown-contents">
                            <font-awesome-icon :icon="['fas', 'download']" />Playback Speed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" class="deezer-button">
                  <a :href="result.link" target="_blank" class="v-btn__content" />Listen on Deezer
                </button>
          </div>
        </div>
      </div>     
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      result: {
        type: Object,
        required: true,
      },
  },
  data() {
    return {
      showProgressBar: false,
      progressBarWidth: '0%',
      showVolumeSlider: false,
      volume: 1,
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    playSong() {
      this.$refs.audioPlayer.play();
      this.showProgressBar = true;
      this.$emit('play', {
        artist: this.result.artist.name,
        title: this.result.title,
        preview: this.result.preview,
      });
    },
    updateProgressBar() {
      const audio = this.$refs.audioPlayer;
      const progress = (audio.currentTime / audio.duration) * 100;
      this.progressBarWidth = `${progress}%`;
    },
    popup() {
      alert('This would trigger the download')
    },
playSpeed() {
  alert('This would change playspeed')
},
  toggleVolume(event) {
    this.showVolumeSlider = event.type === 'mouseenter';
    if (this.showVolumeSlider) {
    const closeVolumeSlider = () => {
      this.showVolumeSlider = false;
      document.removeEventListener('mouseleave', closeVolumeSlider);
    };
      document.addEventListener('mouseleave', closeVolumeSlider);
      }
    },
  }
};

</script>
  <style lang="scss" src="@/styles/settings.scss" scoped>
</style>

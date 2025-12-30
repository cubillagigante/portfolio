<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { projects } from "../data/projects";

const currentIndex = ref(0);
const isLoading = ref(true); 
const project = computed(() => projects[currentIndex.value]);

onMounted(() => {
  window.addEventListener("select-project", (e) => {
    currentIndex.value = e.detail;
  });
});

watch(currentIndex, (newIndex) => {
  isLoading.value = true;
  window.dispatchEvent(
    new CustomEvent("project-changed", { detail: newIndex })
  );
});

function next() {
  currentIndex.value =
    currentIndex.value === projects.length - 1 ? 0 : currentIndex.value + 1;
}

function prev() {
  currentIndex.value =
    currentIndex.value === 0 ? projects.length - 1 : currentIndex.value - 1;
}

function goTo(index) {
  currentIndex.value = index;
}
</script>

<template>
  <div class="w-full h-full flex flex-col lg:flex-row">
    <!-- VIDEO -->
    <div class="bg-[#C80036] w-full p-2">
      <div v-if="isLoading" id="load" class="w-full h-full flex justify-center items-center">
        <div role="status">
          <svg aria-hidden="true" class="inline w-14 h-14 text-white animate-spin fill-[#C80036]" viewBox="0 0 100 101"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"></path>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <iframe :key="project.video" class="rounded-lg" :src="project.video" width="100%" height="100%" frameborder="0" allowfullscreen @load="isLoading = false" />
      
    </div>

    <!-- INFO -->
    <div class="bg-[#eedcb8] w-full lg:w-[50%] h-full flex flex-col justify-center p-6 text-[#0C1844] rounded-b-lg">
      <h3 class="font-bold text-center lg:text-start text-2xl mb-4">{{ project.title }}</h3>
      <span class="w-full text-center p-2 rounded-lg text-[#f4d6cc] bg-[#C80036] font-semibold mb-2">{{ project.category
      }}</span>
      <p class="leading-7 text-sm font-normal text-gray-700 ">{{ project.text }}</p>

      <!-- CONTROLES -->
      <div class="flex justify-between mt-5">
        <button class="hover:text-[#C80036]" @click="prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path
                d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path fill="currentColor"
                d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z" />
            </g>
          </svg>
        </button>
        <button class="hover:text-[#C80036]" @click="next">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path
                d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path fill="currentColor"
                d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

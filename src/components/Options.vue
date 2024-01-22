<!-- Options.vue -->
<template>
  <div class="options-component pb-4 px-4">
    <h5 class="mb-2">Customize Your View</h5>
    
    <!-- Target Audience -->
    <div>
      <p class="form-label">Audience:</p>
      <div class="btn-group-vertical" role="group" style="width:10em">
        <input type="radio" class="btn-check" id="general" value="general" v-model="selectedAudience" autocomplete="off">
        <label class="btn btn-outline-secondary mb-0" for="general">General</label>

        <input type="radio" class="btn-check" id="sales" value="sales" v-model="selectedAudience" autocomplete="off">
        <label class="btn btn-outline-secondary mb-0" for="sales">Sales</label>

        <input type="radio" class="btn-check" id="engineers" value="engineers" v-model="selectedAudience" autocomplete="off">
        <label class="btn btn-outline-secondary mb-0" for="engineers">Engineers</label>
      </div>
    </div>

    <!-- Tone -->
    <div class="mt-2">
      <p class="form-label">Tone:</p>
      <div class="btn-group-vertical" role="group" style="width:10em">
        <input type="radio" class="btn-check" id="professional" value="professional" v-model="selectedTone" autocomplete="off">
        <label class="btn btn-outline-secondary mb-0" for="professional">Professional</label>

        <input type="radio" class="btn-check" id="casual" value="casual" v-model="selectedTone" autocomplete="off">
        <label class="btn btn-outline-secondary mb-0" for="casual">Casual</label>

        <input type="radio" class="btn-check" id="persuasive" value="persuasive" v-model="selectedTone" autocomplete="off">
        <label class="btn btn-outline-secondary mb-0" for="persuasive">Persuasive</label>
      </div>
    </div>

    <!-- additional remarks -->
    <div class="mt-2">
      <p class="form-label">Additional Remarks:</p>
      <textarea class="form-control" rows="3" v-model="additionalRemarks"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import useStore from '../store';

const store = useStore();
const selectedAudience = ref(store.selectedAudience);
const selectedTone = ref(store.selectedTone);
const additionalRemarks = ref(store.additionalRemarks);

// Watch for changes and update the store
watch(selectedAudience, (newVal) => {
  store.setAudience(newVal);
});

watch(selectedTone, (newVal) => {
  store.setTone(newVal);
});

watch(additionalRemarks, (newVal) => {
  store.setAdditionalRemarks(newVal);
});
</script>

<style scoped>
.options-component {
  margin: 20px 0;
}

.options-component .option {
  margin-bottom: 15px;
}

.options-component label {
  display: block;
  margin-bottom: 5px;
}

.options-component select,
.options-component input[type="radio"] {
  margin-right: 10px;
}
</style>
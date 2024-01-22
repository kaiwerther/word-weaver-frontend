<!-- ProductSelection.vue -->
<template>
  <div class="product-selection px-4">
    <label for="product-select" class="form-label"><h5>Select Product:</h5></label>
    <select id="product-select" v-model="selectedProduct" class="form-select">
      <option disabled value="">Please select one</option>
      <option v-for="product in products" :key="product" :value="product">
        {{ product.name }}
      </option>
    </select>

    <button v-if="selectedProduct" @click="toggleParameters" class="btn btn-sm btn-outline-secondary mt-2">
      {{ parametersVisible ? 'Hide' : 'Show' }} Product Parameters
    </button>

    <!-- checkboxes for the selection of product parameters -->
    <!-- Transition for smooth collapsible effect -->
    <transition name="slide">
      <div v-if="selectedProduct && parametersVisible" class="mt-2">
        <p class="form-label">Important Product Parameters:<small>(default all)</small></p>
        
        <div class="btn-group-vertical" role="group" style="width:10em">
          <template v-for="(entry) in Object.entries(selectedProduct)" :key="entry[0]">
            <input 
              type="checkbox" 
              :id="'param-' + entry[0]" 
              class="btn-check" 
              v-model="selectedParams[entry[0]]"
            >
            <label class="btn btn-sm btn-outline-secondary" :for="'param-' + entry[0]">{{ entry[0] }}</label>
          </template>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import useStore from '../store';

const store = useStore();
const products = store.products;
const selectedProduct = ref(undefined);
const selectedParams = ref({});
const parametersVisible = ref(false);

const toggleParameters = () => {
  parametersVisible.value = !parametersVisible.value;
};

watch(selectedProduct, (newVal) => {
  selectedParams.value = Object.keys(selectedProduct.value).reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});
  store.setProduct(selectedProduct.value);
});

watch(selectedParams, (newVal) => {
  console.log(selectedParams.value);
}, { deep: true });

</script>

<style scoped>
.product-selection {
  margin: 20px 0;
}

.product-selection label {
  margin-right: 10px;
}

.product-selection select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Styles for the transition */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

</style>
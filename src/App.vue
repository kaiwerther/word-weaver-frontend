<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <div class="d-flex flex-row mt-4" style="max-width: 50em;">
      <!-- Options on the left -->
      <div class="col-md-4  bg-light rounded shadow-sm">
        <ProductSelection />
        <Options />
      </div>

      <!-- Working area in the middle -->
      <div class="flex-grow-1">
        
        <TemplateViewer />
        <!-- Place other main application content here if needed -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import ProductSelection from './components/ProductSelection.vue';
import Options from './components/Options.vue';
import TemplateViewer from './components/TemplateViewer.vue';
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

#app {
  text-align: left;
}
</style>
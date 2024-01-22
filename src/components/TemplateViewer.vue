<!-- TemplateViewer.vue -->
<template>
  <div class="template-viewer container mx-3 p-3 bg-light rounded shadow-sm">
    <h2>Template Preview</h2>
    <label for="password">Password</label>
    <input v-model="password" type="password" class="form-control mb-3" placeholder="Password">
    <button @click="processTemplate" class="btn btn-primary mb-3">Generate Preview</button>
    <div class="preview-area text-success">{{ templateText }}</div>
    <div class="preview-area" v-html="response"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import useStore from '../store';
import { EventSourcePolyfill } from 'event-source-polyfill';

const templateText = `
<static text="Product Page for {{product.name}}">
<static prompt="Write the first paragraph of an engaging description for our customers for the product {{product.name}}. Add the benefits of the packaging.">
<static text="Benefits:">
<static prompt="Write a bullet list of short bulletpoints of all the benefits such a part would have. about 5 words each. about 5 items.">
<static text="Applications:">
<ai prompt="Write a bullet list of short bulletpoints of potential applications. about 5 words each. about 5 items. Focus on HV applications.">
`;

const replacePlaceholders = (text, product) => {
  return text.replace(/{{product\.(\w+)}}/g, (match, propName) => {
    return product[propName] || match;
  });
};

const parseTemplate = (template) => {
  const regex = /<(static text|ai prompt)="([^"]+)">/g;
  let match;
  const parts = [];

  while ((match = regex.exec(template)) !== null) {
    parts.push({
      type: match[1] === 'static text' ? 'static' : 'ai',
      content: match[2]
    });
  }

  return parts;
};

// Example usage

const store = useStore();
const product = computed(() => store.selectedProduct);
const additionalRemarks = computed(() => store.additionalRemarks);
const selectedAudience = computed(() => store.selectedAudience);
const selectedTone = computed(() => store.selectedTone);


const response = ref();
const messages = ref([]);
const password = ref("password");

const processTemplate = async () => {
  // Function to parse the template
  const preprompt = "You are a content writer for Infineon. Write engaging and informative content for our customers.\n"+
  (selectedAudience.value ? `Your audience is ${selectedAudience.value}.\n` : "") +
    (selectedTone.value ? `Your writing style is ${selectedTone.value}.\n` : "") +
    (additionalRemarks.value ? `Always follow these remarks: ${additionalRemarks.value}\n` : "") +
    " The product you are writing about is the following product:\n"
   + Object.entries(product.value).map(([key, value]) => `${key}: ${value}`).join(', ');
  
  messages.value = [];
  messages.value.push({ role: "system", content: preprompt});

  const parsedTemplate = parseTemplate(templateText);

  response.value = '';

  for (const template of parsedTemplate) {
    const replacedPlaceholderContent = replacePlaceholders(template.content, product.value);
    if (template.type === 'static') {
      // Append static text directly
      messages.value.push({ role: "user", content: replacedPlaceholderContent});
      response.value += replacedPlaceholderContent + '\n';
    } else if (template.type === 'ai') {
      // Extract prompt and send it to the AI
      await sendPrompt(replacedPlaceholderContent);
    }
  }
};

const sendPrompt = async (prompt) => {
  messages.value.push({ role: "user", content: prompt});
  const headers = {
    Authorization: 'Basic ' + btoa(`werther:${password.value}`)
  };

  return new Promise((resolve, reject) => {

    const eventSource = new EventSourcePolyfill(
      `https://nodejs-production-ce58.up.railway.app/stream-gpt?messages=${encodeURIComponent(JSON.stringify(messages.value))}`, 
      { headers: headers }
    );
    let result = '';
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      response.value += data;
      result += data;
      console.log('EventSource stream:', event.data, data);
    };
    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      messages.value.push({ role: "assistant", content: result });
      eventSource.close();
      resolve(result);
    };
    eventSource.onopen = () => {
      console.log('Connection to stream opened.');
    };
    eventSource.addEventListener("end", () => {
      console.log('Connection to stream closed.')
      eventSource.close();
      messages.value.push({ role: "assistant", content: result });
      resolve(result);
    });
    messages.value.push({ role: "assistant", content: result});
  });
};
</script>

<style scoped>

.preview-area {
  margin-top: 20px;
  white-space: pre-line;
  text-align: left;
}
</style>
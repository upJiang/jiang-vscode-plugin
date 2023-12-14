<template>
  <div class="code-container">
    <div v-html="markdown.render(answer)"></div>
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from "markdown-it";
import markdownItCodeCopy from "markdown-it-code-copy";
import markdownItHighlightjs from "markdown-it-highlightjs";

const markdown = new MarkdownIt()
  .use(markdownItHighlightjs)
  .use(markdownItCodeCopy);

defineProps({
  answer: {
    type: String,
    required: true,
  },
});
</script>

<style>
@import url("highlightjs/styles/default.css");
</style>

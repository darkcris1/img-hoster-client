<script>
   import { Router } from "@roxi/routify";
   import { routes } from "../.routify/routes";
</script>

<Router {routes} />

<style global lang="postcss">
   @import "../assets/global.css";
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   :root {
      --primary: #aeff6d;
   }
   .primary-bg {
      background: var(--primary);
      background: linear-gradient(135deg, #09e0f1, var(--primary));
   }

   h1 {
      @apply text-4xl;
   }
   h2 {
      @apply text-3xl;
   }
   h3 {
      @apply text-2xl;
   }
   input:focus,
   a:focus,
   [contenteditable] {
      outline: none;
   }

   section {
      max-width: 1300px;
      width: 100%;
      @apply px-4 py-20;
   }
</style>

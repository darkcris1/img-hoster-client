<script>
   import { loadImage, onVisible } from "../utils";
   import Placeholder from "./Placeholder.svelte";
   export let src = "";
   export let width = 200;
   export let height = 200;
   export let alt = "";
   export let maxWidth = 400;
   export let maxHeight = 400;
   let visible = false;
   let imageLoaded = false;

   let base64 = false;
   $: width = width > maxWidth ? maxWidth : width;
   $: height = height > maxHeight ? maxHeight : height;

   async function handleVisible() {
      base64 = await loadImage(src);
      imageLoaded = true;
      visible = true;
   }
</script>

{#if !visible || !imageLoaded}
   <div use:onVisible={handleVisible}>
      <Placeholder width={width + "px"} height={height + "px"} />
   </div>
{:else if base64}
   <img src={base64} {alt} />
{/if}

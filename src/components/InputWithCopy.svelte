<script>
  import copy from 'clipboard-copy'
  import Placeholder from './Placeholder.svelte'
  import { fly } from 'svelte/transition'

  export let text = ''
  export let label = ''
  export let skeleton = false

  let className = ''
  export { className as class }

  let isCopied = false

  async function handleCopy() {
    try {
      await copy(text)
      isCopied = true
      setTimeout(() => (isCopied = false), 800)
    } catch (error) {
      alert('There was an error on copying the text')
    }
  }
</script>

<style>
  img {
    width: 40px;
    height: 40px;
  }
</style>

<div class={className}>
  {#if skeleton}
    <Placeholder class="my-2 rounded-md" height="1rem" width="10ch" />
  {:else}
    <div class="my-2 text-lg">{label}</div>
  {/if}
  <div class="flex items-center justify-center">
    {#if skeleton}
      <Placeholder class="rounded-2xl" width="100%" height="40px" />
    {:else}
      <p
        spellcheck="false"
        style="max-width: 70ch"
        class={`p-2 border border-black rounded-2xl w-full text-gray-600 overflow-ellipsis whitespace-nowrap overflow-hidden`}>
        {text}
      </p>
    {/if}
    <div on:click={handleCopy} class="ml-2 cursor-pointer">
      {#if skeleton}
        <Placeholder class="rounded-full" height="40px" width="40px" />
      {:else}
        <div class="relative">
          <img src="/copy.png" alt="copy button indicator" />
          {#if isCopied}
            <div
              transition:fly={{ y: -30 }}
              id="tooltip"
              class:hidden={!isCopied}
              class="absolute p-1 font-bold bg-cyan-500 text-white rounded-lg">
              Copied
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>

</div>

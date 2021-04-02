<script>
  import { url } from '@roxi/routify'

  $: isOnline = window.navigator.onLine
</script>

<style>
  .huge {
    font-size: 12rem;
  }
  .e404 {
    text-align: center;
  }
</style>

<svelte:head>
  <title>{isOnline ? 'Page not found' : 'Offline'}</title>

</svelte:head>

<div class="e404">
  {#if isOnline}
    <div class="huge">404</div>
  {:else}
    <div class="huge">Offline</div>
  {/if}
  <div class="big text-2xl">
    {isOnline ? 'Page Not Found' : 'Refresh the page if your connection is back'}
    <!-- link to the parent folder of _fallback.svelte -->
    <a class="text-blue-500 underline" href={$url('../')}>Go back</a>
  </div>
</div>

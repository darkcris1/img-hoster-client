<script>
  import ServiceWorker from '../Serviceworker.svelte'
</script>

<style lang="postcss">
  a {
    @apply font-bold;
  }

  a > img {
    height: 30px;
    width: 30px;
  }
</style>

<ServiceWorker />
<!-- routify:options preload="proximity" -->
<nav class="p-4 shadow-md primary-bg text-center z-50">
  <a href="/" class="text-4xl text-white">Image Hoster</a>
</nav>
<slot />

<footers
  class="primary-bg py-4 text-white text-center font-bold shadow-2xl flex
  justify-center align-center">
  <span class="text-2xl">Copyright 2020 |</span>
  <a href="https://github.com/darkcris1" rel="noopener">
    <img src="/github.png" class="ml-5 mr-3" alt="github indicator icon" />
  </a>
  <a href="https://facebook.com/crisjunjun123" rel="noopener">
    <img src="/fblite.png" alt="facebook indicator icon" />
  </a>
</footers>

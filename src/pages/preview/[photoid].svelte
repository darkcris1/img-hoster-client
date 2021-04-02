<script>
  import { metatags, ready, redirect } from '@roxi/routify'
  import InputWithCopy from '../../components/InputWithCopy.svelte'
  import Placeholder from '../../components/Placeholder.svelte'
  import fetcher from '../../http'
  import { loadImage } from '../../utils'
  import { onMount } from 'svelte'

  export let imageName = 'Image Hoster | Preview'
  export let photoid = '...............'
  let imageLoading = true
  let isLoaded = true

  $: metatags.title = imageName

  let imageSrc, hrefSrc
  onMount(async () => {
    try {
      const res = await fetcher.get('/photo/' + photoid)
      const data = await res.json()
      $ready()
      imageName = data.name
      imageSrc = data.imageUrl
      isLoaded = false
      hrefSrc = await loadImage(imageSrc)
      imageLoading = false
    } catch (err) {
      $redirect('/404')
    }
  })
</script>

<style>
  [data-imageplaceholder] > img {
    max-width: 100%;
    max-height: 100%;
    transition: transform 1000ms;
  }
  [data-imageplaceholder]:hover > img {
    transform: scale(1.2);
  }
</style>

<section
  class="rounded flex flex-col md:flex-row items-center justify-center mx-auto">
  <div class="m-5 flex items-center justify-center text-center flex-col w-full">

    <div
      data-imageplaceholder
      class="flex items-center justify-center bg-gray-100 transition-transform
      overflow-hidden rounded-md"
      style="height:400px;width: 25rem; max-width: 100%; background:
      url('/images/transparent.jpg');">
      {#if imageLoading}
        <Placeholder height="100%" />
      {:else}
        <img src={hrefSrc} alt={`${imageName.replace(/\..+?$/, '')} image`} />
      {/if}
    </div>
    <div class="flex justify-between items-center">

      <div class="flex items-center flex-col md:flex-row">
        {#if isLoaded}
          <Placeholder class="m-4 rounded-md" height="1rem" width="10rem" />
          <Placeholder class="m-4 rounded-md" height="2.5rem" width="5rem" />
        {:else}
          <span
            style="width: 25ch;"
            class="text-lg overflow-ellipsis overflow-hidden whitespace-nowrap">
            {imageName}
          </span>
          <a
            href={hrefSrc}
            download={imageName}
            target="_self"
            class="m-4 rounded-md p-2 primary-bg font-bold text-white
            text-center shadow-md">
            Download
          </a>
        {/if}

      </div>

    </div>
  </div>
  <div class="flex flex-col justify-center p-5 w-full">
    <h1 class="text-center">Embeddable</h1>
    <InputWithCopy
      skeleton={isLoaded}
      class="my-2"
      text={`${imageSrc}`}
      label="URL" />
    <InputWithCopy
      skeleton={isLoaded}
      text={`<img src="${imageSrc}" />`}
      label="Image Tag" />
    <InputWithCopy
      skeleton={isLoaded}
      text={`<a href="${imageSrc}" download="${imageName}"/>`}
      label="Anchor Tag Downloadable" />
    <InputWithCopy
      skeleton={isLoaded}
      text={window.location.href}
      label="This Website" />
    <InputWithCopy skeleton={imageLoading} text={hrefSrc} label="Base64" />

  </div>
</section>

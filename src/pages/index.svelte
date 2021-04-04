<script>
   import { url, metatags, redirect } from "@roxi/routify";
   import { tick } from "svelte";
   import fetcher from "../http";
   import { compressImage, onVisible } from "../utils";
   import calert from "calerts";
   import Img from "../components/Img.svelte";

   metatags.title = "Image Hoster for free";
   metatags.description = "Host your image and embed it anywhere";

   let loading = true;
   let fetchError = false;
   let isFileUploading = false;
   let data = [];
   let fileInput;
   let nextPageToken = "";

   function isFileImage(file) {
      return /\.(png|JPEG|jpg)$/i.test(file.name);
   }

   function handleFileUpload(file) {
      if (!file) return;

      compressImage(file, async (compressFile, error) => {
         if (error) return calert(error);

         isFileUploading = true;
         try {
            const form = new FormData();
            form.append("__image", compressFile);

            const res = await fetcher.post("/photo", form);
            const data = await res.json();

            $redirect("./preview/" + data.id);
         } catch (error) {
            calert("Error", "Could Not upload the image", "error");
         } finally {
            fileInput.value = "";
            isFileUploading = false;
         }
      });
   }

   function handleDragDrop(e) {
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (!isFileImage(file)) return alert("File must be a type of PNG or JPG");
      handleFileUpload(file);
   }

   async function fetchRecentPhoto() {
      try {
         loading = true;
         const res = await fetcher.get("/photo?nexttoken=" + nextPageToken);
         const resData = await res.json();

         nextPageToken = resData.nextPageToken || "";
         data = [...data, ...resData.files];
         await tick();
         fetchError = false;
      } catch (error) {
         console.log(error);
         fetchError = true;
         calert("Fetch Error", "Cannot Fetch the Recent Uploads", "error");
      } finally {
         loading = false;
      }
   }
   setTimeout(fetchRecentPhoto, 100);
</script>

<!-- Main page -->
<section
   class=" rounded flex flex-col md:flex-row items-center justify-center mx-auto"
>
   <div class="text-center md:text-left flex flex-col my-4">
      <h1>Upload your image for free</h1>
      <hr class="primary-bg mt-2 mb-3 border-none" style="height: 1px" />
      <p class="text-2xl">
         If you want an image to be embeddable anywhere
         <br />
         this is the right tool for you
      </p>
   </div>
   <input
      on:change={(e) => handleFileUpload(e.target.files[0])}
      type="file"
      name="image"
      accept="image/x-png,image/jpeg"
      id="imageFile"
      disabled={isFileUploading}
      bind:this={fileInput}
      hidden
   />
   <label class="my-4 mx-0 md:mx-10 shadow-md" for="imageFile">
      <div
         on:dragover|preventDefault|stopPropagation
         on:drop|preventDefault|stopPropagation={handleDragDrop}
         style="border-width: 2px;max-width: 25rem;"
         class="primary-bg border-dashed border-green-400 p-10 md:p-14 text-white
      text-lg cursor-pointer flex items-center justify-center rounded-md"
         class:cursor-wait={isFileUploading}
      >
         {#if isFileUploading}
            <span class="text-4xl">Uploading .....</span>
         {:else}
            <span>
               Drag your file image over here or click this to upload your image
            </span>
            <img src="/upload.png" width="50" height="50" alt="upload icon" />
         {/if}
      </div>
   </label>
</section>

<!-- Recent Uploads -->
<section class=" bg-gray-50 flex flex-col items-center mx-auto ">
   <h2 class="font-bold">Recent Uploads</h2>
   <div
      class="flex flex-wrap justify-center items-center mx-auto my-2 max-w-full"
   >
      {#each data as { name, id, imageUrl, imageMediaMetadata }, i (id)}
         <div
            class="flex flex-col items-center hover:shadow-lg bg-gray-100 m-2"
         >
            <a
               use:onVisible={() =>
                  i + 1 === data.length && nextPageToken && fetchRecentPhoto()}
               role="navigation"
               href={$url("./preview/:id", { id })}
               class="image-holder bg-gray-200 m-5 relative flex flex-col
          items-center justify-center"
               style="background: url('/images/transparent.jpg');"
            >
               <Img
                  class="z-10"
                  width={imageMediaMetadata.width}
                  height={imageMediaMetadata.height}
                  alt={`recent photos #${i + 1}`}
                  src={imageUrl}
               />
            </a>

            <div
               style="max-width: 20ch"
               class="overflow-ellipsis overflow-hidden whitespace-nowrap text-base"
            >
               {name}
            </div>
         </div>
      {/each}
      {#if loading}
         <div
            class="loader animate-spin rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"
         />
      {:else if fetchError}
         <div class="text-2xl m-10">
            There is a problem while fetching the photos
         </div>
         <button
            on:click={() => fetchRecentPhoto()}
            class="m-4 rounded-md p-2 primary-bg font-bold text-white text-center
        shadow-md"
         >
            Fetch Again
         </button>
      {/if}
   </div>
</section>

<style>
   h1,
   span {
      @apply font-bold;
   }
   .image-holder {
      max-width: 300px;
      max-height: 300px;
      justify-content: center;
      align-items: center;
      display: flex;
      overflow: hidden;
      transition: overflow 0.5s;
   }
   .image-holder :global(img) {
      z-index: 10;
      transition: transform 0.5s ease;
   }
   .image-holder :global(img:hover) {
      transform: scale(1.1);
   }
   .loader {
      border-top-color: var(--primary);
   }
</style>

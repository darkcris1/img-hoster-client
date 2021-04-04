import Compressor from "compressorjs";

function compressImage(file, callback) {
   new Compressor(file, {
      quality: 0.7,
      maxHeight: 400,
      maxWidth: 400,
      convertSize: 600000, // if the png is 600kb then it will not compress the image
      error: (error) => {
         callback(null, error.message);
      },
      success: (blob) => {
         callback(new File([blob], blob.name, { type: blob.type }));
      },
   });
}
function toDataUrl(url, callback) {
   var xhr = new XMLHttpRequest();
   xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
         callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
   };
   xhr.open("GET", url);
   xhr.responseType = "blob";
   xhr.send();
}
const loadImage = (src) => {
   return new Promise((resolve) => {
      toDataUrl(src, resolve);
   });
};

function onVisible(node, callback) {
   const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((el) => {
         if (el.isIntersecting) {
            callback();
            self.unobserve(el.target);
         }
      });
   });
   observer.observe(node);
}
export { compressImage, loadImage, onVisible };

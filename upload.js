let thumbnailElement;
    var image;

    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
        const dropZoneElement = inputElement.closest(".drop-zone");
      
        dropZoneElement.addEventListener("click", (e) => {
          inputElement.click();
        });
      
        inputElement.addEventListener("change", (e) => {
          if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
          }
        });
      
        dropZoneElement.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropZoneElement.classList.add("drop-zone--over");
        });
      
        ["dragleave", "dragend"].forEach((type) => {
          dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
          });
        });
      
        dropZoneElement.addEventListener("drop", (e) => {
          e.preventDefault();
      
          if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
          }
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });
      
      /**
       * Updates the thumbnail on a drop zone element.
       *
       * @param {HTMLElement} dropZoneElement
       * @param {File} file
       */
       function updateThumbnail(dropZoneElement, file) {
        init().then((fonction)=>{
          predict();
        });
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
   
         // First time - remove the prompt
        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
            dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }
      
        // First time - there is no thumbnail element, so lets create it
        if (!thumbnailElement) {
          thumbnailElement = document.createElement("img");
          thumbnailElement.classList.add("drop-zone__thumb");
          dropZoneElement.appendChild(thumbnailElement);
        }
      
        // Show thumbnail for image files
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            //thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
            image = reader.result;
            thumbnailElement.id = "imageUpload";
            imageUpload.src = image;
          };
        } else {
          thumbnailElement.style.backgroundImage = null;
        }

        thumbnailElement.dataset.label = file.name;
      }

var i = 0;
function move() {
  var elem = document.getElementById("label-container");
      elem.style.width = prediction[0].probability.toFixed(2)*100 + "%";
      elem.style.width = prediction[1].probability.toFixed(2)*100 + "%";
      elem.style.width = prediction[2].probability.toFixed(2)*100 + "%";
console.log(prediction[0].probability.toFixed(2)*100);
}
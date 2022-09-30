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
       * 
       * @param {File} file
       */
       function updateThumbnail(dropZoneElement, file) {
        
        loading();
        init().then(()=>{
          predict();
          closeLoadingWithMask();
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
          document.getElementsByClassName("drop-zone")[0].style.border = "0px";
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

      function loading(){
        //화면에 출력할 마스크를 설정해줍니다.
        var mask  = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
        var loadingImg = '';
    
        document.getElementById("loadimgImg").innerHTML += " <img src='./loading.gif' style='position: absolute; display: block; margin: 0px auto;'/>";
     
        //화면에 레이어 추가
        $('body')
            .append(mask)
      
        //마스크 표시
        $('#mask').show();
    }
    
    function closeLoadingWithMask() {
        $('#mask, #loadingImg').hide();
        $('#mask, #loadingImg').empty();  
    }

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

$(document).ready(function(){

				initFileUploader("#zdrop");

				function initFileUploader(target) {
					var previewNode = document.querySelector("#zdrop-template");
					previewNode.id = "";
					var previewTemplate = previewNode.parentNode.innerHTML;
					previewNode.parentNode.removeChild(previewNode);


					var zdrop = new Dropzone(target, {
						url: 'https://api.flawcra.cc/cdn/',
						maxFilesize:10000,
						previewTemplate: previewTemplate,
						autoQueue: true,
						previewsContainer: "#previews",
						clickable: "#upload-label"
					});

					zdrop.on("addedfile", function(file) { 
						$('.preview-container').css('visibility', 'visible');
					});

					zdrop.on("totaluploadprogress", function (progress) {
						var progr = document.querySelector(".progress .determinate");
						if (progr === undefined || progr === null)
							return;
						progr.style.width = progress + "%";
					});

					zdrop.on('dragenter', function () {
						$('.fileuploader').addClass("active");
					});

					zdrop.on('dragleave', function () {
						$('.fileuploader').removeClass("active");			
					});

					zdrop.on('drop', function () {
						$('.fileuploader').removeClass("active");	
					});

					zdrop.on("complete", function (data) {
						if(data.status == "success") {
							var json = JSON.parse(data.xhr.response);
							if(json.success == true) {
								data.previewElement.children[1].innerHTML = "<a href=\"#!\" data-url=\""+json.response+"\" data-dz-remove=\"\" class=\"btn-floating ph green white-text waves-effect waves-light\"><i class=\"material-icons white-text\">cloud_done</i></a><a href=\"#!\" data-dz-remove=\"\" class=\"btn-floating ph red white-text waves-effect waves-light\"><i class=\"material-icons white-text\">clear</i></a>";
								data.previewElement.children[1].children[0].addEventListener("click", function () { window[`copyLnk`](this); });
								data.previewElement.children[1].children[1].addEventListener("click", function () { this.parentElement.parentElement.remove(); });
								new Audio(browser.extension.getURL("sounds/done.mp3")).play();
							} else {
								data.previewElement.children[1].innerHTML = "<a href=\"#!\" data-url=\""+json.error+"\" data-dz-remove=\"\" class=\"btn-floating ph red white-text waves-effect waves-light\"><i class=\"material-icons white-text\">error</i></a><a href=\"#!\" data-dz-remove=\"\" class=\"btn-floating ph red white-text waves-effect waves-light\"><i class=\"material-icons white-text\">clear</i></a>";
								data.previewElement.children[1].children[0].addEventListener("click", function () { window[`copyLnk`](this); });
								data.previewElement.children[1].children[1].addEventListener("click", function () { this.parentElement.parentElement.remove(); });
								new Audio(browser.extension.getURL("sounds/error.mp3")).play();
							}
							
						} else {
							data.previewElement.children[1].innerHTML = "<a href=\"#!\" data-url=\"javascript:void;\" data-dz-remove=\"\" class=\"btn-floating ph red white-text waves-effect waves-light\"><i class=\"material-icons white-text\">error</i></a><a href=\"#!\" data-dz-remove=\"\" class=\"btn-floating ph red white-text waves-effect waves-light\"><i class=\"material-icons white-text\">clear</i></a>";
							data.previewElement.children[1].children[0].addEventListener("click", function () { this.parentElement.parentElement.remove(); });
							data.previewElement.children[1].children[1].addEventListener("click", function () { this.parentElement.parentElement.remove(); });
							new Audio(browser.extension.getURL("sounds/error.mp3")).play();
						}
						window["completed"] = data;
					});
					
					var toggle = true;
					/* Preview controller of hide / show */
					$('#controller').click(function() {
						if(toggle){
							$('#previews').css('visibility', 'hidden');
							$('#controller').html("keyboard_arrow_up");
							$('#previews').css('height', '0px');
							toggle = false;
						}else{
							$('#previews').css('visibility', 'visible');
							$('#controller').html("keyboard_arrow_down");
							$('#previews').css('height', 'initial');
							toggle = true;
						}
					});
				}

				window["copyLnk"] = (data) => {
					navigator.clipboard.writeText(data.getAttribute("data-url")).then(function() {
					    Toast.fire({
					        icon: 'success',
					        title: 'Successfully copied to Clipboard.'
					      });
					  }, function() {
					    Toast.fire({
					        icon: 'success',
					        title: 'No permission to interact with clopboard :('
					      });
					  });
				};

			});
function changeInputImage(image) {
  const placeholder = document.getElementById('img-placeholder')
  if (image.files && image.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      placeholder.src = e.target.result;
    }

    reader.readAsDataURL(image.files[0]); // convert to base64 string
  }
}

const stopPreview = () => {
  document.getElementById("card-preview-panel").style.display = "none";
}

const cardPreview = (imgPath) => {
  document.getElementById("card-preview-panel").style.display = "flex";
  document.getElementById("card-preview-img").setAttribute("src", imgPath);
  document.getElementById("card-preview-panel").addEventListener("click", stopPreview, {once: true});
}
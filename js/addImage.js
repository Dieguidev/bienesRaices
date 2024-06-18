import Dropzone from "dropzone";

const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

Dropzone.options.image = {
  dictDefaultMessage: "Sube tus imagenes",
  acceptedFiles: ".png, .jpg, .jpeg",
  maxFilesize: 5, // MB
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: true,
  addRemoveLinks: true,
  dictRemoveFile: "Borrar archivo",
  dictMaxFilesExceeded: "El límite es 1 archivo",
  // dictInvalidFileType: "Solo se aceptan archivos de imagen",
  // dictFileTooBig: "El archivo es demasiado grande, el peso máximo es 5MB",
  headers: {
    "CSRF-Token": token,
  },
  paramName: "image",
};

let fs = require("fs");
let core = require('@actions/core');
let sharp = require("sharp");
let artifact = require('@actions/artifact')
let dir = './images';
const artifactClient = artifact.create()
const artifactName = 'archive';
const path = '.'
let imageName = core.getInput('filename')
const options = {
  createArtifactFolder: true
}

async function download() {
  const downloadResponse = await artifactClient.downloadArtifact(artifactName, path, options)
  createFolder();
}
download()
function createFolder() {
  fs.mkdir(`${dir}`, { recursive: true }, err => {
    if (err) console.log(err);
    console.log('folder created')
    resizeImages()

  });
};
function resizeImages() {
  let input = sharp(`./${imageName}`);
  let sizes = [72, 96, 128, 144, 152, 192, 384, 512];
    sizes.forEach(size => {
    input
      .clone()
      .resize(size)
      .toFile(`${dir}/icon-${size}x${size}.png`, err => {

        if (err) {
          console.log(err)
        }
        if (size == 512) {
          fs.readdir('./archive', (err, files) => {
            files.forEach(file => {
              console.log(file);
            });
          });
          const files = [
            'images/icon-72x72.png',
            'images/icon-96x96.png',
            'images/icon-128x128.png',
            'images/icon-144x144.png',
            'images/icon-152x152.png',
            'images/icon-192x192.png',
            'images/icon-384x384.png',
            'images/icon-512x512.png',

          ]

          const rootDirectory = '.'
          const option = {
            continueOnError: false
          }

          const uploadResponse = artifactClient.uploadArtifact('generated-images', files, rootDirectory, option)
        }
      });
  });
};


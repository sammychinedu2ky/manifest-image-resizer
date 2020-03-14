# Manifest Image Resizer Action

This action was designed to help generate images that you can use as icons in your manifest.json file when creating a PWA( progressive web app)

## How to use it
- Create a repository and upload an image in the root directory (ie the image shouldn't be enclosed in a folder). 

- Click on the actions tab

- Click on `Set up a workflow yourself` 

- And paste this:

   `name: MY WorkFlow
    
    on: push
    
    jobs:
        create_images:
            runs-on: ubuntu-latest
            steps:
                
                - name: Checkout repository
                  uses: actions/checkout@v2
               
               - name: Send image to archive
                  uses: actions/upload-artifact@v1
                  with:
                    name: archive 
                    path: .
                
                - name: manifest-image-resizer action
                  uses: sammychinedu2ky/manifest-image-resizer@master
                  with:
                    filename: upload.png #name of image you uploaded and also ensure you attatch the image extension(ie png,jpg,ico etc)`

### The generated images would be saved in the artifact section with the name archive. And that's it 
 

#### You can as well check my site to generate easily both the manifest and standard icons by clicking [here](http://manifest-gen.netlify.com/)

# Image Processing API

## Table of Contents

This project is an image processing api that works when the user access the server page which is localhost on port :3000
The user has some images in the images folder,He choose one of it and access the image api resize endpoint and give it using query the name,width,and the height of the image he wants and the api resize and save it to a new folder called thumbanil ,If the user reaccess the same image with the same details the server will give him the created image.

After finishing the user can delete the thumbnail file if he wanted by acessing the reset api page.

## How it was made 

This project is combination of [a new built image processing api focused on the back end ,server api, requests ,and responses from the server] and old project I made about a designed front-end interactive webpage that I used to tell the user about the site and give him how to use it .

## Tests made
The server got logger middleware edited by me to give the ip,api visited,status,and the time taken in ms.
   # It test during runtime
    if the image is found in the directory or not.
    if the user give name ,width ,and height query parameters.
    if the image with given properties already exists.
    if the the directory is found to create it or write the new image.
    if the the directory is found or not before deleting.

## languages used in project

* Html (In the main page).
** Css (To give it nice look).
*** javascript (To give some interactive).
**** Backend javascript (To make the server get and send responses to the user and ).
***** Tpescript (Use to make the apis and most of the work ).

This project is being Tested by jasmine and supertest.
""    ""     ""   ""  Formatted using eslint and prettier.

## How to use
  # scripts:
  npm run build:To build the project
  npm run start:To start the server on localhost.
  npm run jasmine: To run jasmine.
  npm run test: To test the endpoint and fuctions using jasmine.
  npm run prettier:To use prettier with the files.
  npm run prettier:check  :To chcek that all files using the prettier format.
  npm run lint :To use eslint to check coding error.
                 (Note:after building the project for the first time or after deleting the build folder the eslint code will give some formatting error so run lint:fix code to fix them).
  npm run lint:fix   :To fix any formatting errors.
  

  ## Endpoints to be accessed
  localhost:3000  Will show the main front-end page.
  /api            Will give you nothing and redirect to the main page.
  /api/image      Will give you still in developing.
  /api/image/resize   Will take query parameters to resize the image.
  /api/image/resize?name={name}&width={width}&height={height}    Give right parameters to get api work.
  /api/reset       Will delete the thumbnail folder if it exists.


  ## Rquired
  Arranging dependencies correctly.
  Separating out image processing function.
  Handling errors and providing error messages.
  Including test specs for image processing.
  Defining return type and including type parameters for functions and callbacks.

  # Done
  * I had arranged the dependencies correctly by removing all the dependencies from the dependencies section except.
        {express and sharp } and all the other in devdependencies.
  ** Sparated the image processing function in a particulat file called processing.ts.
  *** Fixed the handling eroor problem when using  another prameters rather than the required and provide the user
        error message.
  **** Include test spec for image processing ,test the image processing function in isolation without sending a request
        to the server and include reset endpoint test to delete the Thumbnail folder.
  ***** Tried my best to define the return types,type parameters and call backs in the most of the functions.
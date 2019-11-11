# Speech_To_Text_Video

The goal of this project is to transcribe audio of videos to text files. The Video Intelligence API of Google Cloud was used to do it.

# Instructions

To execute it in your machine, please just replace the list variables bellow in the code:

- projectId --- Id of your project in google cloud
- keyFilename --- json file with information about your project in google cloud
- gcsUri --- Path of your video file
- extension_name --- Name of txt file that you'd like to create
- destFilename --- Local of you'd like to create txt file

# Language

The code was developed in node.js.

# Dependencies 

- @google-cloud/storage
- @google-cloud/video-intelligence

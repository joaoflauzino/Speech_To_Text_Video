// Import the Google Cloud Video Intelligence library
const videoIntelligence = require('@google-cloud/video-intelligence');

//Create client for buckets API
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
  projectId: 'ID PROJECT',
  keyFilename: 'JSON WITH KEYS',
});

//Create client for videoIntelligence API
const client = new videoIntelligence.VideoIntelligenceServiceClient({
    projectId: 'ID PROJECT',
    keyFilename: 'JSON WITH KEYS',
});

//Information of files
const gcsUri = 'PATH OF FILE';
var extension_name = 'TXT FILE';
var destFilename = 'BUCKET';


//Function to transcription of video
async function Transcription_video() {

    const videoContext = {
        speechTranscriptionConfig: {
            languageCode: 'pt-BR',
            enableAutomaticPunctuation2: true,
            },
    };

    const request = {
        inputUri: gcsUri,
        features: ['SPEECH_TRANSCRIPTION'],
        videoContext: videoContext,
    };

    const [operation] = await client.annotateVideo(request);
    const [operationResult] = await operation.promise();
    const alternative = operationResult.annotationResults[0].speechTranscriptions[0].alternatives[0];
    alternative.words.forEach(wordInfo => {
        const start_time = wordInfo.startTime.seconds + wordInfo.startTime.nanos * 1e-9;
        const end_time = wordInfo.endTime.seconds + wordInfo.endTime.nanos * 1e-9;
        console.log('\t' + start_time + 's - ' + end_time + 's: ' + wordInfo.word);
    });

    console.log('Transcription: ' + alternative.transcript);
    console.log("Duration: ", alternative.duration)

    var stream = await gcs.bucket(destFilename).file(extension_name).createWriteStream();
    stream.on('error', function(error){
        console.log(error);
    });
    stream.write(alternative.transcript);
    stream.end();

}

//Main
if (require.main === module) {

  Transcription_video();

}

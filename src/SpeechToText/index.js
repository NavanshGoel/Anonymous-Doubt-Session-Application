const fs = require("fs");
const { IamAuthenticator } = require("ibm-watson/auth");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: "EgtPhNH2rLyWfVaBTooVJPhaOD__rqp8FMf_ASC2cMhn",
  }),
  serviceUrl:
    "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/789e1c8c-7e60-4eb3-a281-4d61dcdf693a",
});

const params = {
  objectMode: true,
  contentType: "audio/m4a",
  model: "en-US_BroadbandModel",
  keywords: ["colorado", "tornado", "tornadoes"],
  keywordsThreshold: 0.5,
  maxAlternatives: 3,
};

// Create the stream.
const recognizeStream = speechToText.recognizeUsingWebSocket(params);

// Pipe in the audio.
fs.createReadStream("./resources/audio.m4a").pipe(recognizeStream);

/*
 * Uncomment the following two lines of code ONLY if `objectMode` is `false`.
 *
 * WHEN USED TOGETHER, the two lines pipe the final transcript to the named
 * file and produce it on the console.
 *
 * WHEN USED ALONE, the following line pipes just the final transcript to
 * the named file but produces numeric values rather than strings on the
 * console.
 */
// recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

/*
 * WHEN USED ALONE, the following line produces just the final transcript
 * on the console.
 */
// recognizeStream.setEncoding('utf8');

// Listen for events.
recognizeStream.on("data", function (event) {
  onEvent("Data:", event);
});
recognizeStream.on("error", function (event) {
  onEvent("Error:", event);
});
recognizeStream.on("close", function (event) {
  onEvent("Close:", event);
});

// Display events on the console.
function onEvent(name, event) {
  console.log(name, JSON.stringify(event, null, 2));
}

const translate = require("@vitalets/google-translate-api");
translate("bete moj kara di", { from: "hi", to: "en" })
  .then((res) => {
    console.log(res.text);
    //=> Ik spreek Nederlands!
    console.log(res.from.text.autoCorrected);
    //=> true
    console.log(res.from.text.value);
    //=> I [speak] Dutch!
    console.log(res.from.text.didYouMean);
    //=> false
  })
  .catch((err) => {
    console.error(err);
  });

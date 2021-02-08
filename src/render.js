/* eslint-disable func-style */
//Front End Code
// desktopCapturer records screen, remote access' IPC (host proceses)
const { desktopCapturer, remote } = require('electron');
const videoElement = document.querySelector('video');
const { writeFile } = require('fs');
//Buttons
const startBtn = document.querySelector('startBtn');
const stopBtn = document.querySelector('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;

//Get all screens on desktop
const { Menu, dialog } = remote;
// async function getVideoSources() {
//Cannot declre funtoin b/c it will not intialize properly
async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });

  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => selectSource(source)
      };
    })
  );


  videoOptionsMenu.popup();
}

let mediaRecorder;  //Global variable to capture video
const recordedChunks = [];


//Change the videoSource Windo to record
const selectSource = async (source) => {
  videoSelectBtn.innerText = source.name;
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
      }
    }
  };


  //Create Stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  videoElement.srcObject = stream;
  videoElement.play();

  //Create the recorder
  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new mediaRecorder(stream, options);

  //Regider events
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;

  //Capture all recorded Chunks
  function handleDataAvailable(e) {
    console.log('Video Data available');
    recordedChunks.push(e.data);
  }

  //Save the video on stop
  async function handleStop(e) {
    const blob = new Blob(recordedChunks, {
      type: 'video/webm; codecs=vp9'
    });
    const buffer = Buffer.from(await blob.arrayBuffer());

    //Dialog
    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: 'Save Video',
      defaultPath: `vid-${Date.now()}.webm`
    });
    console.log(filePath);
    //Where to save, and raw Data, then message of success (callback)
    writeFile(filePath, buffer, () => `Video saved`);
  }

};


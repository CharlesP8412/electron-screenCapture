//Front End Code
// desktopCapturer records screen, remote access' IPC (host proceses)
const { desktopCapturer, remote } = require('electron');
const videoElement = document.querySelector('video');
//Buttons
const startBtn = document.querySelector('startBtn');
const stopBtn = document.querySelector('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;

//Get all screens on desktop
const { Menu } = remote;
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
};

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
};
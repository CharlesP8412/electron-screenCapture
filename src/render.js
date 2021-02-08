//Front End Code
//Buttons
const videoElement = document.querySelector('video');
const startBtn = document.querySelector('startBtn');
const stopBtn = document.querySelector('stopBtn');
const videoSelectBtn = document.querySelector('videoSelectBtn');
videoSelectBtn.onClick = getVideoSources;

//Get all screens on desktop
// desktopCapturer records screen, remote access' IPC (host proceses)
const { desktopCapturer, remote } = require('electron');
const getVideoSources = async () => {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });
};
## Screen Capture on Electron

Basic screen/ window capture app that allows videos to be saved to `.webm`. <br/>
App is deployable to desktop using Electron.

### Dependencies

- Electron (DesktopCapturer & Remote)
- Electron-Forge
- FS

```
Depending on your OS, extra packages or programs maybe required to make all install files.
ie on Linux may need to install 'rpmbuilder' and 'mono-devel' (win32 builds) using `apt-get`
```

### To Run

1. Clone the Repo
2. Run `npm install`
3. Start in development `npm start`
4. To make a local installer file run `npm run make` (Detects the system you are running and builds for that system)

### To make specific install files

| OS      | Command              | File Type                              |
| ------- | -------------------- | -------------------------------------- |
| Windows | `npm run make-win`   | Creates install folder with EXE & DLLs |
| Linux   | `npm run make-linux` | DEB & RPM                              |
| MAC     | `npm run make-mac`   | DMG                                    |

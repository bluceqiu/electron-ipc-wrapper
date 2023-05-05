class ElectronIpcWrapper {
    static instance = null;
    
    static getInstance() {
      if (!ElectronIpcWrapper.instance) {
        ElectronIpcWrapper.instance = new ElectronIpcWrapper();
      }
  
      return ElectronIpcWrapper.instance;
    }
    
    constructor() {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcMain = window.require('electron').ipcMain;
      this.channels = {};
    }
    
    send(channel, data) {
      this.ipcRenderer.send(channel, data);
    }
    
    on(channel, listener) {
      if (!this.channels[channel]) {
        this.channels[channel] = [];
      }
      this.channels[channel].push(listener);
      
      this.ipcMain.on(channel, listener);
    }
    
    off(channel, listener) {
      if (!this.channels[channel]) {
        return;
      }
      
      const index = this.channels[channel].indexOf(listener);
      if (index >= 0) {
        this.channels[channel].splice(index, 1);
      }
      
      this.ipcMain.removeListener(channel, listener);
    }
    
    removeAllListeners(channel) {
      if (this.channels[channel]) {
        this.channels[channel].forEach((listener) => {
          this.ipcMain.removeListener(channel, listener);
        });
        delete this.channels[channel];
      }
    }
  }
  
  export default ElectronIpcWrapper;
  
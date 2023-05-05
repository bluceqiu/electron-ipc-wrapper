# 使用示例
```
import ElectronIpcWrapper from './ElectronIpcWrapper';

const ipcWrapper = new ElectronIpcWrapper();

// 在主进程中监听消息
ipcWrapper.on('test-channel', (event, data) => {
  console.log(data);
  // 回复消息
  ipcWrapper.send('test-channel-reply', 'Hello from main process!');
});

// 在渲染器进程中发送消息
ipcWrapper.send('test-channel', 'Hello from renderer process!');

// 在渲染器进程中监听回复
ipcWrapper.on('test-channel-reply', (event, data) => {
  console.log(data);
});

// 在渲染器进程中注销监听
ipcWrapper.off('test-channel', listenerFunction);

// 删除所有监听
ipcWrapper.removeAllListeners('test-channel');

```

# TODO
1. lib 打包输出
2. 支持 promise、async await
3. 测试用例
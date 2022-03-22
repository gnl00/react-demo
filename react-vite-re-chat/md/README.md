#react-vite-re-chat
> react-vite-chatroom 重构版

##相关技术
vite | react | react-router-dom | WebSocket | events | tailwind CSS

##前言
<br /> 1、在用户未授权/未登录成功之前不打开 websocket 链接，如何实现？（WebSocket 动态连接）
<br /> 2、页面如何拆分，组件如何封装？
<br /> 3、发送/接收消息时，聊天界面如何更新/渲染？

### WebSocket 连接动态开启
先上一张组件嵌套图

<img src="./assets/组件嵌套关系.png">

上部分代码，关键就在`<Auth>`层
```js
// routes.jsx
<BrowserRouter>
  <Routes>
    <Route path={'/'} element={<App />} />
    <Route path={'/login'} element={<Login />} />
  </Routes>
</BrowserRouter>
```

```js
// App.jsx
<Auth>
  <Chat />
</Auth>
```

```js
// Auth.jsx
import {createContext, useState} from "react";

export default function Auth(props) {
  const Context = createContext(null)

  // 从 store 中获取登录状态
  const [isAuth, setIsAuth] = useState(false);
  const [webSocket, setWebSocket] = useState(null)
  
  if (isAuth) {
    // 登录后才进行 websoket 连接
    const ws = "@/network/websocket/websocket";
    setWebSocket(ws)
  }
  return (
    <Context.Provider value={webSocket}>
      { isAuth ? props.children : <></> }
    </Context.Provider>
  )
}
```

首先默认进入`<Login>`，登录成功将授权状态保存到 store 中，再 Redirect 到 `/`。
同时`<Auth>`检查登录状态，已授权才会连接 websocket

####组件封装
先将界面大概描绘出来

<img src="./assets/界面草图.png">

可将界面大概分为以下组件：聊天框头部、通讯好友、聊天框、发送消息框、接收消息框

<img src="./assets/组件结构.png">
























##参考
[基于 Vue 开发一个 多人聊天室（万字长文） - 从 0 到 1 篇](https://segmentfault.com/a/1190000040688086)










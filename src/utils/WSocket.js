/**
 * websocket 工具类
 */
class WSocket {
    constructor(baseUrl) {
        this.ws = null; //
        this.timeout = 10000;
        this.timeoutObj = null;
        this.serverTimeoutObj = null;
        this.baseUrl = baseUrl; //后端约定的定制
        this.isReconnecting = false;
        this.msgObjEvent = new Event("getMessage");
        this.reconnectEvent = new Event("reconnectEvent");
        this.init();
    }

    init() {
        this.ws = new WebSocket(this.baseUrl);
        this.ws.addEventListener('open', () => {
            console.log("客户端链接成功");
            //重连发送消息到后端，告诉后端，老师建立链接
            // this.reconnectEvent.msg=Date.now();
            document.dispatchEvent(this.reconnectEvent);
            this.reset().start(); // 心跳检测
        });
        this.ws.addEventListener('close', () => {
            console.log("客户端链接关闭");
            if (this.isReconnecting) return; //
            this.isReconnecting = true;
            this.reconnect();
        });
        this.ws.addEventListener('error', () => {
            console.log("客户端链接错误");
            if (this.isReconnecting) return; //
            this.isReconnecting = true;
            this.reconnect();
        });
        this.ws.addEventListener('message', (e) => {
            this.reset().start();
            // console.log("接受消息：",e);
            if (e.data.indexOf("PONG") === -1) {
                // console.log("接受到消息web2——————————", e);
                this.msgObjEvent.msgObj = e.data;
                document.dispatchEvent(this.msgObjEvent);
            }
        });
    }

    // 没连接上会一直重连，设置延迟避免请求过
    reconnect(url) {
        setTimeout(() => {
            this.isReconnecting = false;//避免错误和关闭，连续执行reconnect；
            this.init();
        }, 5000);
    }

    reset() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    }

    start() {
        const self = this;
        this.timeoutObj = setTimeout(function () {
            // 这里发送一个心跳，后端收到后，返回一个心跳消息，
            // onmessage拿到返回的心跳就说明连接正常
            self.ws.send(JSON.stringify({type: "HEART_BEAT", msg: 'WEB'}));
            self.serverTimeoutObj = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
                self.ws.close();// 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout);
        }, self.timeout);
    }
}

export default WSocket

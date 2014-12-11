console.log("Hello from Prototypical");

function Thing(initialStuff) {
    if (typeof initialStuff !== "object") initialStuff = prototypical.quickGet(initialStuff)
    var keys = Object.keys(initialStuff);
    for (var i = keys.length - 1; i >= 0; i--) {
        this[keys[i]] = initialStuff[keys[i]]
    };
}

Thing.prototype.get = function get(key) {
    if (this.hasOwnProperty(key)) {
        return this[key];
    }
    else if (this.hasOwnProperty("prototype")) {
        return prototypical.quickGet(this.prototype)[key];
    }
}

Thing.prototype.set = function set(key, value) {
    this[key] = value;
    return this;
}

window.prototypical = {
    Thing: Thing,
    demo: function () {
        var dog = { name: "Sam", breed: "Mutt", prototype: "https://48067914bb3d7935906839bc04226b8b5f55d44b-www.googledrive.com/host/0Bzu4cytkv4B8aXZ0UUpiXzkzclE/boxer.js" };
        return new Thing(dog);
    },
    demo2: function () {
        var dog = { name: "Monty", prototype: "https://48067914bb3d7935906839bc04226b8b5f55d44b-www.googledrive.com/host/0Bzu4cytkv4B8aXZ0UUpiXzkzclE/corgi.js" };
        return new Thing(dog);
    },
    demo3: function () {
        return new Thing("https://48067914bb3d7935906839bc04226b8b5f55d44b-www.googledrive.com/host/0Bzu4cytkv4B8aXZ0UUpiXzkzclE/oxford.js");
    },
    quickGet: function quickGet(url) {
        var req = new XMLHttpRequest(), resp;
        req.open("GET", url, false);
        req.send(null);
        resp = req.responseText;
        try {
            return eval("(" + resp + ")");
        } catch (e) {
            console.error("Unable to parse",url,resp);
            return resp;
        }
    }
}
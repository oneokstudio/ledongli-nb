var appurl = "http://vazee.newbalance.com.cn/h5/gallery/";
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?7caa70c2607cee020fcf49672beb0d76";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
$(document).ready(function () {
    $(window).on("resize orientationchange", App.FnResize);
    App.FnFitWindow();
    App.FnLoadAsset();
});
var STATE;
(function (STATE) {
    STATE[STATE["STATE_LOADING"] = 0] = "STATE_LOADING";
    STATE[STATE["STATE_INTRO"] = 1] = "STATE_INTRO";
    STATE[STATE["STATE_START"] = 2] = "STATE_START";
    STATE[STATE["STATE_GAMING"] = 3] = "STATE_GAMING";
    STATE[STATE["STATE_GAMEOVER"] = 4] = "STATE_GAMEOVER";
})(STATE || (STATE = {}));
;
var App = (function () {
    function App() {
    }
    App.FnLoadAsset = function () {
        switch (appType) {
            case "game":
                App.FnLoadGameAsset();
                break;
            case "offline":
                App.FnLoadOfflineAsset();
                break;
        }
    };
    App.FnLoadOfflineAsset = function () {
        var _list = [
            "img/friend.json",
            "img/score-export.xml",
        ];
        var _endLen = [2, 3, 2, 2, 3];
        for (var i = 0; i < _endLen[curLevel - 1]; i++) {
            _list.push("img/end" + curLevel + i + ".json");
        }
        PIXI.loader.add(_list).load(function () {
            $("#loader").hide();
            $("#game").show();
            App.FnOfflineInit();
        });
        PIXI.loader.on("progress", function (e) {
            $("#percent").html(Math.floor(PIXI.loader.progress).toString());
        });
    };
    App.FnLoadGameAsset = function () {
        var _animalLength = [1, 1, 2, 1, 2];
        var _list = [
            "img/track.jpg",
            "img/atlas0.json",
            "img/atlas1.json",
            "img/atlas2.json",
            "img/score-export.xml",
            "img/font-export.xml",
            "img/shareGo.json",
            "img/share-back.jpg",
            "img/share-back-landscape.jpg",
            "img/shoe.json"
        ];
        //if (_animalLength[curLevel - 1] === 1) {
        //    _list.push("img/L" + curLevel + ".json");
        //}
        //else {
        //    for (var i = 0; i < _animalLength[curLevel - 1]; i++) {
        //        _list.push("img/L" + curLevel + i + ".json");
        //    }
        //}
        PIXI.loader.add(_list).load(function () {
            $("#loader").hide();
            $("#game").show();
            App.FnGameInit();
        });
        PIXI.loader.on("progress", function (e) {
            $("#percent").html(Math.floor(PIXI.loader.progress).toString());
        });
    };
    App.FnOfflineInit = function () {
        if (!App.Render) {
            App.EventState = new LiteEvent();
            App.EventResize = new LiteEvent();
            App.EventUpdate = new LiteEvent();
            App.Render = PIXI.autoDetectRenderer(640, 1030, {
                view: document.getElementById("game"),
                resolution: 2,
                autoResize: true
            });
            App.Render.backgroundColor = 0;
            App.Stage = new PIXI.Container();
            App.Stage.addChild(vazee.Game.Instance);
            App.FnFitWindow();
            App.FnLoop();
        }
    };
    App.FnGameInit = function () {
        if (!App.Render) {
            Sfx.FnBgm();
            App.EventState = new LiteEvent();
            App.EventResize = new LiteEvent();
            App.EventUpdate = new LiteEvent();
            App.Render = PIXI.autoDetectRenderer(640, 1030, {
                view: document.getElementById("game"),
                resolution: 2,
                autoResize: true
            });
            App.Render.backgroundColor = 0;
            App.Stage = new PIXI.Container();
            App.Stage.addChild(vazee.Game.Instance);
            App.FnFitWindow();
            App.FnLoop();
            if (curLevel === 1) {
                App.FnIntro();
            }
            else {
                App.FnStart();
            }
        }
    };
    App.FnIntro = function () {
        if (App.State === 1 /* STATE_INTRO */) {
            return;
        }
        App.State = 1 /* STATE_INTRO */;
        App.EventState.trigger(1 /* STATE_INTRO */);
    };
    App.FnStart = function () {
        if (App.State === 2 /* STATE_START */) {
            return;
        }
        App.State = 2 /* STATE_START */;
        App.EventState.trigger(2 /* STATE_START */);
    };
    App.FnGaming = function () {
        if (App.State === 3 /* STATE_GAMING */) {
            return;
        }
        App.State = 3 /* STATE_GAMING */;
        App.EventState.trigger(3 /* STATE_GAMING */);
        App.Stage.addChild(vazee.GamingBg.Instance);
    };
    App.FnGameOver = function (aSuccess) {
        if (App.State === 4 /* STATE_GAMEOVER */) {
            return;
        }
        App.Success = aSuccess;
        App.State = 4 /* STATE_GAMEOVER */;
        App.EventState.trigger(4 /* STATE_GAMEOVER */);
        App.Stage.removeChild(vazee.GamingBg.Instance);
        App.Stage.addChild(vazee.BtnBuy.Instance);
        App.Stage.addChild(vazee.BtnShare.Instance);
        App.Stage.addChild(vazee.Shoe.Instance);
    };
    App.FnLoop = function () {
        window.requestAnimFrame(App.FnLoop);
        App.Render.render(App.Stage);
        var _now = Date.now();
        var _dt = _now - (App.Time || _now);
        App.Time = _now;
        App.EventUpdate.trigger(_dt);
    };
    App.FnResize = function () {
        if (App.ToResize) {
            clearTimeout(App.ToResize);
        }
        App.ToResize = setTimeout(App.FnFitWindow, 300);
    };
    App.FnFitWindow = function () {
        App.WinW = (document.documentElement.clientWidth || 640);
        App.WinH = (document.documentElement.clientHeight || 1030);
        App.Portrait = (App.WinH > App.WinW);
        if (App.Portrait) {
            (appType === "game") ? $("#loader").addClass("r90") : $("#loader").removeClass("r90");
            //(appType === "game") ? $(".full-screen").addClass("r90") : $("#loader").removeClass("r90");
        }
        else {
            (appType === "game") ? $("#loader").removeClass("r90") : $("#loader").addClass("r90");
        }
        if (App.Render) {
            App.Render.resize(App.WinW, App.WinH);
            App.Render.render(App.Stage);
            if (App.Portrait) {
                App.Stage.scale.y = App.WinW / 640;
                App.Stage.scale.x = App.Stage.scale.y;
                App.Stage.rotation = Math.PI * .5;
                App.Stage.position.set(App.WinW, 0);
            }
            else {
                App.Stage.scale.y = App.WinH / 640;
                App.Stage.scale.x = App.Stage.scale.y;
                App.Stage.rotation = 0;
                App.Stage.position.set(0, 0);
            }
            App.EventResize.trigger(App.Portrait);
        }
    };
    App.FnZeroFill = function (num, width) {
        width -= num.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(num.toString()) ? 2 : 1)).join("0") + num;
        }
        return num + "";
    };
    App.FnDebug = function (aInfo) {
        $("#debug").append("[" + aInfo + "]");
    };
    App.State = 0 /* STATE_LOADING */;
    App.Success = false;
    return App;
})();
if (wx) {
    wx.ready(function () {
        var _link;
        if (appType === "offline") {
            _link = appurl + "share.php?friend=1&score=" + offlineScore + "&name=" + encodeURIComponent(username);
            fnWxShare(fnGetCopy(offlineScore, username, curLevel), _link);
        }
        else if (curLevel > 1) {
            _link = appurl + "share.php?friend=1&friendlevel=" + (curLevel - 1) + "&score=" + prevscore + "&name=" + encodeURIComponent(username);
            fnWxShare(fnGetCopy(prevscore, username, curLevel - 1), _link);
        }
        else {
            fnWxShare("10米加速能多快？测一测，看你够不够拽！", appurl);
        }
    });
}
function fnGetCopy(aScore, aName, aLevel) {
    "use strict";
    var _pre = "10米加速" + (aScore * .01).toFixed(2) + "秒，" + aName;
    switch (aLevel) {
        case 1:
            return _pre + "也有神一般的龟速！你必定快过TA！";
        case 2:
            return _pre + "叫二师兄就此歇菜！该你上了！";
        case 3:
            return _pre + "将汗血宝马极速秒杀！你也来秒一下！";
        case 4:
            return _pre + "颠覆猎豹王者之速！你能否再颠覆？";
        case 5:
            return _pre + "统领物种速度链！你行吗？";
    }
}
function fnWxShare(aTitle, aLink) {
    "use strict";
    if (wx) {
        var _icon = "img/shareicon.jpg";
        if (App.Success || appType === "offline") {
            _icon = "img/icon" + curLevel + ".jpg";
        }
        else if (curLevel > 1) {
            _icon = "img/icon" + (curLevel - 1) + ".jpg";
        }
        var _img = appurl + _icon;
        wx.onMenuShareTimeline({
            title: aTitle,
            link: aLink,
            imgUrl: _img,
            success: function () {
                _hmt.push(["_trackEvent", "button", "click", "ShareSuccess"]);
                fnShowShoe();
            },
            cancel: function () {
                _hmt.push(["_trackEvent", "button", "click", "ShareCancel"]);
                fnShowShoe();
            }
        });
        wx.onMenuShareAppMessage({
            title: aTitle,
            link: aLink,
            desc: "NB首推速度链测试，你敢不敢任性跑一把？",
            imgUrl: _img,
            success: function () {
                fnShowShoe();
            },
            cancel: function () {
                fnShowShoe();
            }
        });
    }
}
function fnShowShoe() {
    "use strict";
    if (vazee.share.Share.Instance.opened && vazee.share.Content.Instance.visible) {
        vazee.share.Content.Instance.visible = false;
        vazee.share.Shoe.Instance.visible = true;
    }
}
var LiteEvent = (function () {
    function LiteEvent() {
        this.handlers = [];
    }
    LiteEvent.prototype.on = function (handler) {
        this.handlers.push(handler);
    };
    LiteEvent.prototype.off = function (handler) {
        this.handlers = this.handlers.filter(function (h) { return h !== handler; });
    };
    LiteEvent.prototype.trigger = function (data) {
        if (this.handlers) {
            this.handlers.slice(0).forEach(function (h) { return h(data); });
        }
    };
    return LiteEvent;
})();
var Sfx = (function () {
    function Sfx() {
    }
    Sfx.FnBgm = function () {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }
        var audioPath = "sfx/";
        var sounds = [
            { id: "Music", src: "bgm.mp3" }
        ];
        createjs.Sound.alternateExtensions = ["ogg"];
        createjs.Sound.addEventListener("fileload", Sfx.FnPlayBgm);
        createjs.Sound.registerSounds(sounds, audioPath);
    };
    Sfx.FnPlayBgm = function () {
        vazee.control.Music.Instance.fnActive();
        if (musicOn) {
            createjs.Sound.play("Music", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, .1);
        }
        else {
            vazee.control.Music.Instance.musicOn = false;
        }
    };
    return Sfx;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var vazee;
//(function (vazee) {
//    "use strict";
//    var Animal = (function (_super) {
//        __extends(Animal, _super);
//        function Animal() {
//            var _this = this;
//            var _texture = [];
//            for (var i = 0; i < 24; i++) {
//                _texture.push(PIXI.Texture.fromFrame("animal" + App.FnZeroFill(i, 3) + ".png"));
//            }
//            _super.call(this, _texture);
//            this.speed = 1.3;
//            this.running = false;
//            this.position.set(-810, 84);
//            this.animationSpeed = .25;
//            App.EventState.on(function (aState) {
//                switch (aState) {
//                    case 3 /* STATE_GAMING */:
//                        _this.fnRun();
//                        break;
//                }
//            });
//            App.EventUpdate.on(function (dt) {
//                _this.fnUpdate(dt);
//            });
//        }
//        Object.defineProperty(Animal, "Instance", {
//            get: function () {
//                if (!Animal._Instance) {
//                    Animal._Instance = new Animal();
//                }
//                return Animal._Instance;
//            },
//            enumerable: true,
//            configurable: true
//        });
//        Animal.prototype.fnRun = function () {
//            this.play();
//            if (curLevel < 3) {
//                TweenMax.from(this, 4, { animationSpeed: 1, ease: Linear.easeNone });
//            }
//            TweenMax.to(this, 4, { speed: Animal.SpeedSet[curLevel - 1], ease: Linear.easeNone });
//            this.running = true;
//        };
//        Animal.prototype.fnUpdate = function (dt) {
//            if (this.running) {
//                this.x += (this.speed * dt - vazee.Track.TrackSpeed);
//            }
//        };
//        Animal.SpeedSet = [.6, .8, .88, 1.07, 1.42];
//        return Animal;
//    })(PIXI.extras.MovieClip);
//    vazee.Animal = Animal;
//})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var control;
    (function (control) {
        "use strict";
        var BtnLeft = (function (_super) {
            __extends(BtnLeft, _super);
            function BtnLeft() {
                this.texNormal = PIXI.Texture.fromFrame("control-left-btn.png");
                this.texHigh = PIXI.Texture.fromFrame("control-left-btn-high.png");
                _super.call(this, this.texNormal);
                this.position.set(77, -170);
            }
            Object.defineProperty(BtnLeft, "Instance", {
                get: function () {
                    if (!BtnLeft._Instance) {
                        BtnLeft._Instance = new BtnLeft();
                    }
                    return BtnLeft._Instance;
                },
                enumerable: true,
                configurable: true
            });
            BtnLeft.prototype.fnHigh = function () {
                this.texture = this.texHigh;
            };
            BtnLeft.prototype.fnNormal = function () {
                this.texture = this.texNormal;
            };
            BtnLeft.prototype.fnActive = function () {
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap).on("mousedown", this.fnHigh).on("touchstart", this.fnHigh).on("mouseup", this.fnNormal).on("touchend", this.fnNormal).on("mouseupoutside", this.fnNormal).on("touchendoutside", this.fnNormal);
                }
            };
            BtnLeft.prototype.fnTap = function () {
                switch (App.State) {
                    case 1 /* STATE_INTRO */:
                        App.FnStart();
                        break;
                    case 3 /* STATE_GAMING */:
                        if (control.Control.CurTap === 1 /* RIGHT */) {
                            control.Control.CurTap = 0 /* LEFT */;
                            vazee.Hero.Instance.fnAddSpeed(true);
                        }
                        else {
                            vazee.Hero.Instance.fnAddSpeed(false);
                        }
                        break;
                }
            };
            return BtnLeft;
        })(PIXI.Sprite);
        control.BtnLeft = BtnLeft;
    })(control = vazee.control || (vazee.control = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var control;
    (function (control) {
        "use strict";
        var BtnRight = (function (_super) {
            __extends(BtnRight, _super);
            function BtnRight() {
                var _this = this;
                this.texNormal = PIXI.Texture.fromFrame("control-right-btn.png");
                this.texHigh = PIXI.Texture.fromFrame("control-right-btn-high.png");
                _super.call(this, this.texNormal);
                this.position.set(900, -170);
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - 240;
                });
            }
            Object.defineProperty(BtnRight, "Instance", {
                get: function () {
                    if (!BtnRight._Instance) {
                        BtnRight._Instance = new BtnRight();
                    }
                    return BtnRight._Instance;
                },
                enumerable: true,
                configurable: true
            });
            BtnRight.prototype.fnHigh = function () {
                this.texture = this.texHigh;
            };
            BtnRight.prototype.fnNormal = function () {
                this.texture = this.texNormal;
            };
            BtnRight.prototype.fnActive = function () {
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap).on("mousedown", this.fnHigh).on("touchstart", this.fnHigh).on("mouseup", this.fnNormal).on("touchend", this.fnNormal).on("mouseupoutside", this.fnNormal).on("touchendoutside", this.fnNormal);
                }
            };
            BtnRight.prototype.fnTap = function () {
                switch (App.State) {
                    case 1 /* STATE_INTRO */:
                        App.FnStart();
                        break;
                    case 3 /* STATE_GAMING */:
                        if (control.Control.CurTap === 0 /* LEFT */) {
                            control.Control.CurTap = 1 /* RIGHT */;
                            vazee.Hero.Instance.fnAddSpeed(true);
                        }
                        else {
                            vazee.Hero.Instance.fnAddSpeed(false);
                        }
                        break;
                }
            };
            return BtnRight;
        })(PIXI.Sprite);
        control.BtnRight = BtnRight;
    })(control = vazee.control || (vazee.control = {}));
})(vazee || (vazee = {}));
var TAPPED;
(function (TAPPED) {
    TAPPED[TAPPED["LEFT"] = 0] = "LEFT";
    TAPPED[TAPPED["RIGHT"] = 1] = "RIGHT";
})(TAPPED || (TAPPED = {}));
;
var vazee;
(function (vazee) {
    var control;
    (function (control) {
        "use strict";
        var Control = (function (_super) {
            __extends(Control, _super);
            function Control() {
                var _this = this;
                _super.call(this);
                this.addChild(control.BtnLeft.Instance);
                this.addChild(control.BtnRight.Instance);
                this.addChild(control.FingerLeft.Instance);
                this.addChild(control.FingerRight.Instance);
                this.addChild(control.Music.Instance);
                this.y = 640;
                this.alpha = 0;
                TweenMax.to(this, .6, {
                    alpha: 1,
                    delay: 1.1,
                    onComplete: function () {
                        if (curLevel === 1) {
                            _this.fnDemo();
                        }
                    }
                });
                App.EventState.on(function (aState) {
                    if (aState === 2 /* STATE_START */) {
                        if (_this.tlDemo) {
                            _this.tlDemo.kill();
                        }
                        control.FingerLeft.Instance.visible = false;
                        control.FingerRight.Instance.visible = false;
                        control.BtnLeft.Instance.fnNormal();
                        control.BtnRight.Instance.fnNormal();
                        _this.fnActive();
                    }
                });
            }
            Object.defineProperty(Control, "Instance", {
                get: function () {
                    if (!Control._Instance) {
                        Control._Instance = new Control();
                    }
                    return Control._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Control.prototype.fnDemo = function () {
                this.tlDemo = new TimelineMax({ repeat: -1 });
                this.tlDemo.to(control.FingerLeft.Instance, .1, {
                    y: 0,
                    onComplete: function () {
                        control.BtnLeft.Instance.fnHigh();
                    }
                }).to(control.FingerLeft.Instance, .1, {
                    y: control.FingerLeft.Instance.height,
                    onStart: function () {
                        control.BtnLeft.Instance.fnNormal();
                    }
                }, "+=.1").to(control.FingerRight.Instance, .1, {
                    y: 0,
                    onComplete: function () {
                        control.BtnRight.Instance.fnHigh();
                    }
                }).to(control.FingerRight.Instance, .1, {
                    y: control.FingerRight.Instance.height,
                    onStart: function () {
                        control.BtnRight.Instance.fnNormal();
                    }
                }, "+=.1");
            };
            Control.prototype.fnActive = function () {
                control.BtnLeft.Instance.fnActive();
                control.BtnRight.Instance.fnActive();
                //App.FnGaming();
            };
            Control.CurTap = 0 /* LEFT */;
            return Control;
        })(PIXI.Container);
        control.Control = Control;
    })(control = vazee.control || (vazee.control = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var control;
    (function (control) {
        "use strict";
        var FingerLeft = (function (_super) {
            __extends(FingerLeft, _super);
            function FingerLeft() {
                _super.call(this, PIXI.Texture.fromFrame("control-finger.png"));
                this.anchor.set(1, 1);
                this.scale.x = -1;
                this.y = this.height;
            }
            Object.defineProperty(FingerLeft, "Instance", {
                get: function () {
                    if (!FingerLeft._Instance) {
                        FingerLeft._Instance = new FingerLeft();
                    }
                    return FingerLeft._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return FingerLeft;
        })(PIXI.Sprite);
        control.FingerLeft = FingerLeft;
    })(control = vazee.control || (vazee.control = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var control;
    (function (control) {
        "use strict";
        var FingerRight = (function (_super) {
            __extends(FingerRight, _super);
            function FingerRight() {
                var _this = this;
                _super.call(this, PIXI.Texture.fromFrame("control-finger.png"));
                this.anchor.y = 1;
                this.y = this.height;
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - 180;
                });
            }
            Object.defineProperty(FingerRight, "Instance", {
                get: function () {
                    if (!FingerRight._Instance) {
                        FingerRight._Instance = new FingerRight();
                    }
                    return FingerRight._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return FingerRight;
        })(PIXI.Sprite);
        control.FingerRight = FingerRight;
    })(control = vazee.control || (vazee.control = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var control;
    (function (control) {
        "use strict";
        var Music = (function (_super) {
            __extends(Music, _super);
            function Music() {
                var _this = this;
                this.texOn = PIXI.Texture.fromFrame("MUSIC_ON.png");
                this.texOff = PIXI.Texture.fromFrame("MUSIC_OFF.png");
                _super.call(this, (musicOn) ? this.texOn : this.texOff);
                this.visible = false;
                this.musicOn = true;
                this.position.set(77, -110);
                App.EventResize.on(function (aPortrait) {
                    _this.x = (((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - _this.width) * .5;
                });
            }
            Object.defineProperty(Music, "Instance", {
                get: function () {
                    if (!Music._Instance) {
                        Music._Instance = new Music();
                    }
                    return Music._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Music.prototype.fnActive = function () {
                this.visible = true;
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap);
                }
            };
            Music.prototype.fnTap = function () {
                this.musicOn = !this.musicOn;
                if (this.musicOn) {
                    createjs.Sound.play("Music", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, .1);
                    this.texture = this.texOn;
                }
                else {
                    this.texture = this.texOff;
                    createjs.Sound.stop();
                }
                _hmt.push(["_trackEvent", "button", "click", "Music"]);
            };
            return Music;
        })(PIXI.Sprite);
        control.Music = Music;
    })(control = vazee.control || (vazee.control = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    "use strict";
    var Counter = (function (_super) {
        __extends(Counter, _super);
        function Counter() {
            var _this = this;
            _super.call(this, "0.0s", { font: "60px font-export", align: "right" });
            this.x = 820;
            this.y = -100;
            this._num = 0;
            App.EventResize.on(function (aPortrait) {
                _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - 140;
            });
            App.EventState.on(function (aState) {
                switch (aState) {
                    case 2 /* STATE_START */:
                        TweenMax.to(_this, .6, { y: 20, ease: Back.easeOut });
                        break;
                    case 3 /* STATE_GAMING */:
                        Counter.Stop = false;
                        break;
                    case 4 /* STATE_GAMEOVER */:
                        if (App.Success) {
                            _this.fnSetWx();
                        }
                        break;
                }
            });
            App.EventUpdate.on(function (dt) {
                _this.fnUpdate(dt);
            });
        }
        Object.defineProperty(Counter, "Instance", {
            get: function () {
                if (!Counter._Instance) {
                    Counter._Instance = new Counter();
                }
                return Counter._Instance;
            },
            enumerable: true,
            configurable: true
        });
        Counter.prototype.fnUpdate = function (dt) {
            if (!Counter.Stop) {
                this.num += dt * .035;
            }
        };
        Counter.prototype.fnSuccess = function () {
            Counter.Stop = true;
            switch (curLevel) {
                case 1:
                    return (this._num <= 1000);
                case 2:
                    return (this._num <= 390);
                case 3:
                    return (this._num <= 360);
                case 4:
                    return (this._num <= 310);
                case 5:
                    return (this._num <= 250);
            }
        };
        Counter.prototype.fnSetWx = function () {
            var _link = appurl + "share.php?friend=1&friendlevel=" + curLevel + "&score=" + this._num + "&name=" + encodeURIComponent(username);
            fnWxShare(fnGetCopy(this._num, username, curLevel), _link);
        };
        Object.defineProperty(Counter.prototype, "num", {
            get: function () {
                return this._num;
            },
            set: function (aNum) {
                this._num = aNum;
                this.text = (aNum * .01).toFixed(2) + "s";
            },
            enumerable: true,
            configurable: true
        });
        Counter.Stop = true;
        return Counter;
    })(PIXI.extras.BitmapText);
    vazee.Counter = Counter;
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var fail;
    (function (fail) {
        "use strict";
        var BtnBack = (function (_super) {
            __extends(BtnBack, _super);
            function BtnBack() {
                _super.call(this, PIXI.Texture.fromFrame("success-btn-share.png"));
                this.position.set(0, 222);
                this.addChild(fail.Light.Instance);
                if (curLevel === 1) {
                    this.visible = false;
                }
            }
            Object.defineProperty(BtnBack, "Instance", {
                get: function () {
                    if (!BtnBack._Instance) {
                        BtnBack._Instance = new BtnBack();
                    }
                    return BtnBack._Instance;
                },
                enumerable: true,
                configurable: true
            });
            BtnBack.prototype.fnActive = function () {
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap);
                }
            };
            BtnBack.prototype.fnTap = function () {
                vazee.share.Share.Instance.fnShow();
                _hmt.push(["_trackEvent", "button", "click", "Share"]);
            };
            return BtnBack;
        })(PIXI.Sprite);
        fail.BtnBack = BtnBack;
    })(fail = vazee.fail || (vazee.fail = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var fail;
    (function (fail) {
        "use strict";
        var BtnRestart = (function (_super) {
            __extends(BtnRestart, _super);
            function BtnRestart() {
                _super.call(this, PIXI.Texture.fromFrame("fail-restart.png"));
                this.position.set(18, 130);
            }
            Object.defineProperty(BtnRestart, "Instance", {
                get: function () {
                    if (!BtnRestart._Instance) {
                        BtnRestart._Instance = new BtnRestart();
                    }
                    return BtnRestart._Instance;
                },
                enumerable: true,
                configurable: true
            });
            BtnRestart.prototype.fnActive = function () {
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap);
                }
            };
            BtnRestart.prototype.fnTap = function () {
                _hmt.push(["_trackEvent", "button", "click", "Restart"]);
              location.reload();
                //var _music = (vazee.control.Music.Instance.musicOn) ? "on" : "off";
                //window.location.href = appurl + "?level=" + (curLevel) + "&music=" + _music + "&prevscore=" + prevscore + "&name=" + encodeURIComponent(username);
            };
            return BtnRestart;
        })(PIXI.Sprite);
        fail.BtnRestart = BtnRestart;
    })(fail = vazee.fail || (vazee.fail = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var fail;
    (function (fail) {
        "use strict";
        var Copy = (function (_super) {
            __extends(Copy, _super);
            function Copy() {
                _super.call(this, PIXI.Texture.fromFrame("fail-copy.png"));
                this.position.set(52, 0);
            }
            Object.defineProperty(Copy, "Instance", {
                get: function () {
                    if (!Copy._Instance) {
                        Copy._Instance = new Copy();
                    }
                    return Copy._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Copy;
        })(PIXI.Sprite);
        fail.Copy = Copy;
    })(fail = vazee.fail || (vazee.fail = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var fail;
    (function (fail) {
        "use strict";
        var Fail = (function (_super) {
            __extends(Fail, _super);
            function Fail() {
                var _this = this;
                _super.call(this);
                this.position.set(1200, 640);
                this.visible = false;
                this.addChild(fail.Copy.Instance);
                this.addChild(fail.BtnRestart.Instance);
                this.addChild(fail.BtnBack.Instance);
                this.rotation = -11.4 * Math.PI / 180;
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - _this.width;
                });
            }
            Object.defineProperty(Fail, "Instance", {
                get: function () {
                    if (!Fail._Instance) {
                        Fail._Instance = new Fail();
                    }
                    return Fail._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Fail.prototype.fnShow = function () {
                this.visible = true;
                fail.Light.Instance.fnShow();
                TweenMax.to(this, .6, {
                    y: 160,
                    ease: Back.easeOut,
                    onComplete: function () {
                        fail.BtnBack.Instance.fnActive();
                        fail.BtnRestart.Instance.fnActive();
                    }
                });
                _hmt.push(["_trackEvent", "page", "view", "gamefail"]);
            };
            return Fail;
        })(PIXI.Container);
        fail.Fail = Fail;
    })(fail = vazee.fail || (vazee.fail = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var fail;
    (function (fail) {
        "use strict";
        var Light = (function (_super) {
            __extends(Light, _super);
            function Light() {
                _super.call(this, PIXI.Texture.fromFrame("title-light2.png"));
                this.visible = false;
                this.position.set(-200, 73);
            }
            Object.defineProperty(Light, "Instance", {
                get: function () {
                    if (!Light._Instance) {
                        Light._Instance = new Light();
                    }
                    return Light._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Light.prototype.fnShow = function () {
                this.visible = true;
                if (!this.tlLight) {
                    this.tlLight = new TimelineMax({ repeat: -1 });
                    this.tlLight.from(this, .2, { alpha: 0 }).from(this, .3, { x: 300 }, "-=.2").to(this, .2, { alpha: 0 }, "-=.2");
                }
                else {
                    this.tlLight.play();
                }
            };
            Light.prototype.fnHide = function () {
                if (this.tlLight) {
                    this.tlLight.pause();
                }
                this.visible = false;
            };
            return Light;
        })(PIXI.Sprite);
        fail.Light = Light;
    })(fail = vazee.fail || (vazee.fail = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    "use strict";
    var Finished = (function (_super) {
        __extends(Finished, _super);
        function Finished() {
            var _this = this;
            _super.call(this, PIXI.Texture.fromFrame("finish.png"));
            this.position.set(9000, 106);
            App.EventUpdate.on(function (dt) {
                _this.fnUpdate(dt);
            });
        }
        Object.defineProperty(Finished, "Instance", {
            get: function () {
                if (!Finished._Instance) {
                    Finished._Instance = new Finished();
                }
                return Finished._Instance;
            },
            enumerable: true,
            configurable: true
        });
        Finished.prototype.fnUpdate = function (dt) {
            if (vazee.Track.Stop) {
                return;
            }
            this.x -= vazee.Track.TrackSpeed;
            if (App.State === 3 /* STATE_GAMING */) {
                if (this.x < -250) {
                    if (vazee.Counter.Instance.fnSuccess()) {
                        App.FnGameOver(true);
                        vazee.success.Success.Instance.fnShow();
                    }
                    else {
                        App.FnGameOver(false);
                        vazee.fail.Fail.Instance.fnShow();
                    }
                }
            }
        };
        return Finished;
    })(PIXI.Sprite);
    vazee.Finished = Finished;
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var Bg = (function (_super) {
            __extends(Bg, _super);
            function Bg() {
                var _this = this;
                _super.call(this);
                App.EventResize.on(function (aPortrait) {
                    var _w = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x;
                    _this.beginFill(0);
                    _this.moveTo(0, 0);
                    _this.lineTo(_w, 0);
                    _this.lineTo(_w, 640);
                    _this.lineTo(0, 640);
                    _this.lineTo(0, 0);
                    _this.endFill();
                });
            }
            Object.defineProperty(Bg, "Instance", {
                get: function () {
                    if (!Bg._Instance) {
                        Bg._Instance = new Bg();
                    }
                    return Bg._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Bg;
        })(PIXI.Graphics);
        friend.Bg = Bg;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var BtnGame = (function (_super) {
            __extends(BtnGame, _super);
            function BtnGame() {
                _super.call(this, PIXI.Texture.fromFrame("success-btn-game.png"));
                this.position.set(0, 220);
                this.addChild(friend.Light.Instance);
            }
            Object.defineProperty(BtnGame, "Instance", {
                get: function () {
                    if (!BtnGame._Instance) {
                        BtnGame._Instance = new BtnGame();
                    }
                    return BtnGame._Instance;
                },
                enumerable: true,
                configurable: true
            });
            BtnGame.prototype.fnActive = function () {
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap);
                }
            };
            BtnGame.prototype.fnTap = function () {
                _hmt.push(["_trackEvent", "button", "click", "Share2Game"]);
                window.location.href = appurl;
            };
            return BtnGame;
        })(PIXI.Sprite);
        friend.BtnGame = BtnGame;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var Content = (function (_super) {
            __extends(Content, _super);
            function Content() {
                var _this = this;
                _super.call(this);
                this.addChild(friend.Copy.Instance);
                this.addChild(friend.Score.Instance);
                this.addChild(friend.BtnGame.Instance);
                // this.addChild(Name.Instance);
                this.rotation = -(11.4 + 90) * Math.PI / 180;
                this.position.set(260, 580);
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .6;
                });
            }
            Object.defineProperty(Content, "Instance", {
                get: function () {
                    if (!Content._Instance) {
                        Content._Instance = new Content();
                    }
                    return Content._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Content;
        })(PIXI.Container);
        friend.Content = Content;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var Copy = (function (_super) {
            __extends(Copy, _super);
            function Copy() {
                _super.call(this, PIXI.Texture.fromFrame("success-copy.png"));
                this.position.set(-37, 20);
            }
            Object.defineProperty(Copy, "Instance", {
                get: function () {
                    if (!Copy._Instance) {
                        Copy._Instance = new Copy();
                    }
                    return Copy._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Copy;
        })(PIXI.Sprite);
        friend.Copy = Copy;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var Ending = (function (_super) {
            __extends(Ending, _super);
            function Ending() {
                var _this = this;
                var _texture = [];
                for (var i = 0; i < 30; i++) {
                    _texture.push(PIXI.Texture.fromFrame("ending" + App.FnZeroFill(i, 3) + ".png"));
                }
                _super.call(this, _texture);
                this.anchor.set(.5, .6);
                this.y = 320;
                this.animationSpeed = .33;
                this.rotation = -90 * Math.PI / 180;
                this.loop = false;
                this.visible = false;
                this.onComplete = function () {
                    _this.gotoAndPlay(10);
                };
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .35;
                });
            }
            Object.defineProperty(Ending, "Instance", {
                get: function () {
                    if (!Ending._Instance) {
                        Ending._Instance = new Ending();
                    }
                    return Ending._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Ending;
        })(PIXI.extras.MovieClip);
        friend.Ending = Ending;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var Friend = (function (_super) {
            __extends(Friend, _super);
            function Friend() {
                _super.call(this);
                this.addChild(friend.Bg.Instance);
                this.addChild(friend.Ending.Instance);
                this.addChild(friend.Content.Instance);
                this.fnShow();
            }
            Object.defineProperty(Friend, "Instance", {
                get: function () {
                    if (!Friend._Instance) {
                        Friend._Instance = new Friend();
                    }
                    return Friend._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Friend.prototype.fnShow = function () {
                TweenMax.to(friend.Score.Instance, .6, { num: offlineScore, delay: .2, onComplete: function () {
                    friend.Score.Instance.fnCenter();
                } });
                friend.BtnGame.Instance.fnActive();
                setTimeout(function () {
                    friend.Ending.Instance.visible = true;
                    friend.Ending.Instance.play();
                    friend.Light.Instance.fnShow();
                }, 300);
                _hmt.push(["_trackEvent", "page", "view", "ShareFromFriend"]);
            };
            return Friend;
        })(PIXI.Container);
        friend.Friend = Friend;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var Light = (function (_super) {
            __extends(Light, _super);
            function Light() {
                _super.call(this, PIXI.Texture.fromFrame("title-light2.png"));
                this.visible = false;
                this.position.set(-200, 73);
            }
            Object.defineProperty(Light, "Instance", {
                get: function () {
                    if (!Light._Instance) {
                        Light._Instance = new Light();
                    }
                    return Light._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Light.prototype.fnShow = function () {
                this.visible = true;
                if (!this.tlLight) {
                    this.tlLight = new TimelineMax({ repeat: -1 });
                    this.tlLight.from(this, .2, { alpha: 0 }).from(this, .3, { x: 300 }, "-=.2").to(this, .2, { alpha: 0 }, "-=.2");
                }
                else {
                    this.tlLight.play();
                }
            };
            Light.prototype.fnHide = function () {
                if (this.tlLight) {
                    this.tlLight.pause();
                }
                this.visible = false;
            };
            return Light;
        })(PIXI.Sprite);
        friend.Light = Light;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var Name = (function (_super) {
            __extends(Name, _super);
            function Name() {
                _super.call(this, username, { fill: "#FFFFFF" });
                if (this.width > 190) {
                    while (this.width > 190) {
                        this.text = this.text.substr(0, this.text.length - 1);
                    }
                }
                this.position.set(148 - this.width * .5, 27);
            }
            Object.defineProperty(Name, "Instance", {
                get: function () {
                    if (!Name._Instance) {
                        Name._Instance = new Name();
                    }
                    return Name._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Name;
        })(PIXI.Text);
        friend.Name = Name;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var friend;
    (function (friend) {
        "use strict";
        var Score = (function (_super) {
            __extends(Score, _super);
            function Score() {
                _super.call(this, "0.0", { font: "100px score-export", align: "right" });
                this.position.set(410 - this.textWidth, 100);
                this._num = 0;
            }
            Object.defineProperty(Score, "Instance", {
                get: function () {
                    if (!Score._Instance) {
                        Score._Instance = new Score();
                    }
                    return Score._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Score.prototype, "num", {
                get: function () {
                    return this._num;
                },
                set: function (aNum) {
                    this._num = aNum;
                    this.text = (aNum * .01).toFixed(2);
                    this.position.x = 410 - this.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            Score.prototype.fnCenter = function () {
                var _this = this;
                setTimeout(function () {
                    _this.position.x = 410 - _this.textWidth;
                }, 100);
            };
            return Score;
        })(PIXI.extras.BitmapText);
        friend.Score = Score;
    })(friend = vazee.friend || (vazee.friend = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    "use strict";
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this);
            switch (appType) {
                case "game":
                    this.fnGameInit();
                    break;
                case "offline":
                    this.fnOfflineInit();
                    break;
            }
        }
        Object.defineProperty(Game, "Instance", {
            get: function () {
                if (!Game._Instance) {
                    Game._Instance = new Game();
                }
                return Game._Instance;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.fnOfflineInit = function () {
            this.addChild(vazee.friend.Friend.Instance);
            this.addChild(vazee.Logo.Instance);
        };
        Game.prototype.fnGameInit = function () {
            vazee.Track.FnUpdateTrackSpeed();
            this.addChild(new vazee.Track(0));
            this.addChild(new vazee.Track(1));
            this.addChild(new vazee.Track(2));
            this.addChild(vazee.Finished.Instance);
            this.addChild(vazee.level.Level.Instance);
            //this.addChild(vazee.Animal.Instance);
            this.addChild(vazee.fail.Fail.Instance);
            this.addChild(vazee.Hero.Instance);
            this.addChild(vazee.title.Title.Instance);
            this.addChild(vazee.control.Control.Instance);
            //this.addChild(vazee.LevelNum.Instance);
            this.addChild(vazee.Logo.Instance);
            this.addChild(vazee.Counter.Instance);
            this.addChild(vazee.success.Success.Instance);
            this.addChild(vazee.share.Share.Instance);
            this.x = -600;
            TweenMax.to(this, 1, { x: 0 });
        };
        return Game;
    })(PIXI.Container);
    vazee.Game = Game;
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    "use strict";
    var Hero = (function (_super) {
        __extends(Hero, _super);
        function Hero() {
            var _this = this;
            var _texture = [];
            for (var i = 0; i < 73; i++) {
                _texture.push(PIXI.Texture.fromFrame("hero" + App.FnZeroFill(i, 3) + ".png"));
            }
            _super.call(this, _texture);
            this.slowing = false;
            this.position.set(-12, 162);
            this.animationSpeed = Hero.MinSpeed + ((curLevel < 4) ? .1 : 0);
            this.loop = false;
            //switch (curLevel) {
            //    case 1:
            //        Hero.MaxSpeed = .5;
            //        break;
            //    case 2:
            //        Hero.MaxSpeed = .7;
            //        break;
            //    case 3:
            //        Hero.MaxSpeed = .56;
            //        break;
            //    case 4:
            //        Hero.MaxSpeed = .65;
            //        break;
            //    case 5:
            //        Hero.MaxSpeed = .88;
            //        break;
            //}
            this.onComplete = function () {
                _this.gotoAndPlay(58);
            };
            App.EventState.on(function (aState) {
                switch (aState) {
                    case 3 /* STATE_GAMING */:
                        _this.play();
                        TweenMax.to(_this, 2, {
                            x: (((App.Portrait) ? App.WinH : App.WinW) / App.Stage.scale.x - _this.width) * .4,
                            ease: Linear.easeNone
                        });
                        break;
                }
            });
            App.EventUpdate.on(function (dt) {
                _this.fnUpdate(dt);
            });
        }
        Object.defineProperty(Hero, "Instance", {
            get: function () {
                if (!Hero._Instance) {
                    Hero._Instance = new Hero();
                }
                return Hero._Instance;
            },
            enumerable: true,
            configurable: true
        });
        Hero.prototype.fnAddSpeed = function (aSpeedUp) {
            var _this = this;
            this.animationSpeed += ((aSpeedUp) ? 0.015 : 0.005);
            if (this.animationSpeed > Hero.MaxSpeed) {
                this.animationSpeed = Hero.MaxSpeed;
            }
            this.slowing = false;
            if (this.toSlow) {
                clearTimeout(this.toSlow);
            }
            this.toSlow = setTimeout(function () {
                _this.slowing = true;
            }, 200);
        };
        Hero.prototype.fnUpdate = function (dt) {
            if (this.slowing) {
                this.animationSpeed -= .001 * dt;
                if (this.animationSpeed < Hero.MinSpeed) {
                    this.animationSpeed = Hero.MinSpeed;
                }
            }
        };
        Hero.MinSpeed = .33;
        Hero.MaxSpeed = 3.3;

        //Hero.MinSpeed = 3.8;
        //Hero.MaxSpeed = 1.9;

        return Hero;
    })(PIXI.extras.MovieClip);
    vazee.Hero = Hero;
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var level;
    (function (level) {
        "use strict";
        var Go = (function (_super) {
            __extends(Go, _super);
            function Go() {
                _super.call(this, PIXI.Texture.fromFrame("go.png"));
                this.position.set(-this.width, 93);
            }
            Object.defineProperty(Go, "Instance", {
                get: function () {
                    if (!Go._Instance) {
                        Go._Instance = new Go();
                    }
                    return Go._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Go;
        })(PIXI.Sprite);
        level.Go = Go;
    })(level = vazee.level || (vazee.level = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var level;
    (function (level) {
        "use strict";
        var Level = (function (_super) {
            __extends(Level, _super);
            function Level() {
                var _this = this;
                _super.call(this);

                this.addChild(level.Ready.Instance);
                this.addChild(level.Go.Instance);
                //this.addChild(level.LevelNum.Instance);

                App.EventState.on(function (aState) {
                    if (aState === 2 /* STATE_START */) {
                        _this.fnShow();
                    }
                });
            }
            Object.defineProperty(Level, "Instance", {
                get: function () {
                    if (!Level._Instance) {
                        Level._Instance = new Level();
                    }
                    return Level._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Level.prototype.fnShow = function () {
                var _this = this;
                this.tlShow = new TimelineMax({
                    delay: .6,
                    onComplete: function () {
                        _this.visible = false;
                        App.FnGaming();
                    }
                });
                this.tlShow
                    //.to(level.LevelNum.Instance, .3, { x: 270 })
                    //.to(level.LevelNum.Instance, 1.6, { x: 300 }, .3)
                    .to(level.Ready.Instance, .3, { x: 257, onStart: function () {
                        level.Ready.Instance.visible = true;
                    } }, .2)
                    .to(level.Ready.Instance, .6, { x: 220 }, .8)
                    .to(level.Ready.Instance, .3, { x: -level.Ready.Instance.width, onComplete: function () {
                        level.Ready.Instance.visible = false;
                    } }, 1.1)
                    .to(level.Go.Instance, .8, { x: 340 }, 1)
                    //.to(level.LevelNum.Instance, .3, { x: 400, alpha: 0, onComplete: function () {
                    //    level.LevelNum.Instance.visible = false;
                    //} })
                    .to(level.Go.Instance, .5, { x: 500, alpha: 0, onComplete: function () {
                        level.Go.Instance.visible = false;
                    } }, "-=.3");
                _hmt.push(["_trackEvent", "page", "view", "gamestart_" + curLevel]);
            };
            return Level;
        })(PIXI.Container);
        level.Level = Level;
    })(level = vazee.level || (vazee.level = {}));
})(vazee || (vazee = {}));
var vazee;
//(function (vazee) {
//    var level;
//    (function (level) {
//        "use strict";
//        var LevelNum = (function (_super) {
//            __extends(LevelNum, _super);
//            function LevelNum() {
//                _super.call(this, PIXI.Texture.fromFrame("level" + curLevel + ".png"));
//                this.position.set(-this.width, 106);
//            }
//            Object.defineProperty(LevelNum, "Instance", {
//                get: function () {
//                    if (!LevelNum._Instance) {
//                        LevelNum._Instance = new LevelNum();
//                    }
//                    return LevelNum._Instance;
//                },
//                enumerable: true,
//                configurable: true
//            });
//            return LevelNum;
//        })(PIXI.Sprite);
//        level.LevelNum = LevelNum;
//    })(level = vazee.level || (vazee.level = {}));
//})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var level;
    (function (level) {
        "use strict";
        var Ready = (function (_super) {
            __extends(Ready, _super);
            function Ready() {
                var _this = this;
                _super.call(this, PIXI.Texture.fromFrame("ready.png"));
                this.position.set(1000, 168);
                this.visible = false;
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x;
                });
            }
            Object.defineProperty(Ready, "Instance", {
                get: function () {
                    if (!Ready._Instance) {
                        Ready._Instance = new Ready();
                    }
                    return Ready._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Ready;
        })(PIXI.Sprite);
        level.Ready = Ready;
    })(level = vazee.level || (vazee.level = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    "use strict";
    var LevelNum = (function (_super) {
        __extends(LevelNum, _super);
        function LevelNum() {
            //_super.call(this, PIXI.Texture.fromFrame("level_num.png"));
            //this.position.set(30, -this.height);
            //TweenMax.to(this, .3, { y: 96, ease: Back.easeOut, delay: (curLevel > 1) ? .5 : 1.8 });
        }
        Object.defineProperty(LevelNum, "Instance", {
            get: function () {
                if (!LevelNum._Instance) {
                    LevelNum._Instance = new LevelNum();
                }
                return LevelNum._Instance;
            },
            enumerable: true,
            configurable: true
        });
        return LevelNum;
    })(PIXI.Sprite);
    vazee.LevelNum = LevelNum;
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    "use strict";
    var Logo = (function (_super) {
        __extends(Logo, _super);
        function Logo() {
            _super.call(this, PIXI.Texture.fromFrame("logo.png"));
            if (appType === "game") {
                this.position.set(20, -this.height);
                TweenMax.to(this, .3, { y: 20, ease: Back.easeOut, delay: (curLevel > 1) ? .3 : 1.6 });
            }
            else {
                this.rotation = -90 * Math.PI / 180;
                this.position.set(20, 880);
                TweenMax.to(this, .3, { y: 620, ease: Back.easeOut, delay: .1 });
            }
        }
        Object.defineProperty(Logo, "Instance", {
            get: function () {
                if (!Logo._Instance) {
                    Logo._Instance = new Logo();
                }
                return Logo._Instance;
            },
            enumerable: true,
            configurable: true
        });
        return Logo;
    })(PIXI.Sprite);
    vazee.Logo = Logo;
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var share;
    (function (share) {
        "use strict";
        var Bg = (function (_super) {
            __extends(Bg, _super);
            function Bg() {
                var _this = this;
                _super.call(this);
                App.EventResize.on(function (aPortrait) {
                    var _w = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x;
                    _this.beginFill(0);
                    _this.moveTo(0, 0);
                    _this.lineTo(_w, 0);
                    _this.lineTo(_w, 640);
                    _this.lineTo(0, 640);
                    _this.lineTo(0, 0);
                    _this.endFill();
                });
            }
            Object.defineProperty(Bg, "Instance", {
                get: function () {
                    if (!Bg._Instance) {
                        Bg._Instance = new Bg();
                    }
                    return Bg._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Bg;
        })(PIXI.Graphics);
        share.Bg = Bg;
    })(share = vazee.share || (vazee.share = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var share;
    (function (share) {
        "use strict";
        var Content = (function (_super) {
            __extends(Content, _super);
            function Content() {
                var _this = this;
                _super.call(this);
                this.addChild(share.Go.Instance);
                this.addChild(share.Ready.Instance);
                this.addChild(share.Copy.Instance);
                App.EventResize.on(function (aPortrait) {
                    if (App.Portrait) {
                        _this.rotation = -(44.9 + 90) * Math.PI / 180;
                        _this.position.set(830, 800);
                    }
                    else {
                        _this.rotation = -30 * Math.PI / 180;
                        _this.position.set(App.WinW / App.Stage.scale.x - 980, 600);
                    }
                });
            }
            Object.defineProperty(Content, "Instance", {
                get: function () {
                    if (!Content._Instance) {
                        Content._Instance = new Content();
                    }
                    return Content._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Content;
        })(PIXI.Container);
        share.Content = Content;
    })(share = vazee.share || (vazee.share = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var share;
    (function (share) {
        "use strict";
        var Copy = (function (_super) {
            __extends(Copy, _super);
            function Copy() {
                _super.call(this, PIXI.Texture.fromFrame("share-copy.png"));
                this.visible = false;
            }
            Object.defineProperty(Copy, "Instance", {
                get: function () {
                    if (!Copy._Instance) {
                        Copy._Instance = new Copy();
                    }
                    return Copy._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Copy.prototype.fnReset = function () {
                this.position.set(0, 0);
                this.visible = false;
            };
            return Copy;
        })(PIXI.Sprite);
        share.Copy = Copy;
    })(share = vazee.share || (vazee.share = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var share;
    (function (share) {
        "use strict";
        var Go = (function (_super) {
            __extends(Go, _super);
            function Go() {
                var _texture = [];
                for (var i = 0; i < 12; i++) {
                    _texture.push(PIXI.Texture.fromFrame("Go" + i + ".png"));
                }
                _super.call(this, _texture);
                this.fnReset();
                this.animationSpeed = .25;
            }
            Object.defineProperty(Go, "Instance", {
                get: function () {
                    if (!Go._Instance) {
                        Go._Instance = new Go();
                    }
                    return Go._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Go.prototype.fnReset = function () {
                this.position.set(500, -120);
                this.visible = false;
                this.stop();
            };
            return Go;
        })(PIXI.extras.MovieClip);
        share.Go = Go;
    })(share = vazee.share || (vazee.share = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var share;
    (function (share) {
        "use strict";
        var Ready = (function (_super) {
            __extends(Ready, _super);
            function Ready() {
                _super.call(this, PIXI.Texture.fromFrame("share-ready.png"));
                this.fnReset();
            }
            Object.defineProperty(Ready, "Instance", {
                get: function () {
                    if (!Ready._Instance) {
                        Ready._Instance = new Ready();
                    }
                    return Ready._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Ready.prototype.fnReset = function () {
                this.position.set(370, -80);
                this.visible = false;
            };
            return Ready;
        })(PIXI.Sprite);
        share.Ready = Ready;
    })(share = vazee.share || (vazee.share = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var share;
    (function (share) {
        "use strict";
        var Share = (function (_super) {
            __extends(Share, _super);
            function Share() {
                _super.call(this);
                this.opened = false;
                this.y = 640;
                this.addChild(share.Bg.Instance);
                this.addChild(share.Content.Instance);
                this.addChild(share.Shoe.Instance);
            }
            Object.defineProperty(Share, "Instance", {
                get: function () {
                    if (!Share._Instance) {
                        Share._Instance = new Share();
                    }
                    return Share._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Share.prototype.fnShow = function () {
                var _this = this;
                this.visible = true;
                TweenMax.to(this, .3, {
                    y: 0,
                    onComplete: function () {
                        _this.opened = true;
                        var tlShow = new TimelineMax({
                            onComplete: function () {
                                _this.fnActive();
                            }
                        });
                        var e = Back.easeOut;
                        tlShow.from(share.Copy.Instance, .3, { x: "-=300", ease: e, onStart: function () {
                            share.Copy.Instance.visible = true;
                        } }).from(share.Ready.Instance, .3, { x: "-=300", onStart: function () {
                            share.Ready.Instance.visible = true;
                        } }, "-=.1").to(share.Ready.Instance, .3, { x: "+=650" }, "+=.6").from(share.Go.Instance, .3, { x: "-=300", onStart: function () {
                            share.Go.Instance.visible = true;
                        } }, "-=.3");
                    }
                });
            };
            Share.prototype.fnActive = function () {
                if (!this.interactive) {
                    share.Go.Instance.play();
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap);
                }
            };
            Share.prototype.fnHide = function () {
                this.opened = false;
                TweenMax.to(this, .3, {
                    y: 640,
                    onComplete: function () {
                        share.Shoe.Instance.visible = false;
                        share.Content.Instance.visible = true;
                        share.Copy.Instance.fnReset();
                        share.Ready.Instance.fnReset();
                        share.Go.Instance.fnReset();
                    }
                });
            };
            Share.prototype.fnTap = function () {
                if (share.Shoe.Instance.visible) {
                    this.fnHide();
                    _hmt.push(["_trackEvent", "page", "view", "Ad_Loaded"]);
                }
                else {
                    share.Content.Instance.visible = false;
                    share.Shoe.Instance.visible = true;
                    _hmt.push(["_trackEvent", "button", "click", "ShareBack"]);
                }
            };
            return Share;
        })(PIXI.Container);
        share.Share = Share;
    })(share = vazee.share || (vazee.share = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var share;
    (function (share) {
        "use strict";
        var Shoe = (function (_super) {
            __extends(Shoe, _super);
            function Shoe() {
                var _this = this;
                _super.call(this, PIXI.Texture.fromImage((App.Portrait) ? "img/share-back.jpg" : "img/share-back-landscape.jpg"));
                this.visible = false;
                App.EventResize.on(function (aPortrait) {
                    _this.texture = PIXI.Texture.fromImage((aPortrait) ? "img/share-back.jpg" : "img/share-back-landscape.jpg");
                    _this.x = (((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - _this.width) * .5;
                });
            }
            Object.defineProperty(Shoe, "Instance", {
                get: function () {
                    if (!Shoe._Instance) {
                        Shoe._Instance = new Shoe();
                    }
                    return Shoe._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Shoe;
        })(PIXI.Sprite);
        share.Shoe = Shoe;
    })(share = vazee.share || (vazee.share = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var Bg = (function (_super) {
            __extends(Bg, _super);
            function Bg() {
                var _this = this;
                _super.call(this);
                App.EventResize.on(function (aPortrait) {
                    var _w = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x;
                    _this.beginFill(0);
                    _this.moveTo(0, 0);
                    _this.lineTo(_w, 0);
                    _this.lineTo(_w, 640);
                    _this.lineTo(0, 640);
                    _this.lineTo(0, 0);
                    _this.endFill();
                });
            }
            Object.defineProperty(Bg, "Instance", {
                get: function () {
                    if (!Bg._Instance) {
                        Bg._Instance = new Bg();
                    }
                    return Bg._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Bg;
        })(PIXI.Graphics);
        success.Bg = Bg;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
//击败多少人
var vazee;
(function (vazee) {
  "use strict";
  var success;
  (function (success) {
    "use strict";
    var TitleDefeat = (function (_super) {
      __extends(TitleDefeat, _super);
      function TitleDefeat() {
        _super.call(this, PIXI.Texture.fromFrame("record.png"));
        this.position.set(-180, 155);
      }
      Object.defineProperty(TitleDefeat, "Instance", {
        get: function () {
          if (!TitleDefeat._Instance) {
            TitleDefeat._Instance = new TitleDefeat();
          }
          return TitleDefeat._Instance;
        },
        enumerable: true,
        configurable: true
      });
      return TitleDefeat;
    })(PIXI.Sprite);
    success.TitleDefeat = TitleDefeat;
  })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var BtnNext = (function (_super) {
            __extends(BtnNext, _super);
            function BtnNext() {
                _super.call(this, PIXI.Texture.fromFrame("success-btn-next.png"));
                this.position.set(20, 190);
                this.visible = (curLevel < 5);
            }
            Object.defineProperty(BtnNext, "Instance", {
                get: function () {
                    if (!BtnNext._Instance) {
                        BtnNext._Instance = new BtnNext();
                    }
                    return BtnNext._Instance;
                },
                enumerable: true,
                configurable: true
            });
            BtnNext.prototype.fnActive = function () {
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap);
                }
            };
            BtnNext.prototype.fnTap = function () {
              _hmt.push(["_trackEvent", "button", "click", "NextLevel"]);

                $.ajax({
                    type: "post",
                    dataType: "json",
                    data:{},
                    url: "lottery.php",
                    success: function(res){
                        if(res.code == 200){
                          // 成功
                          if (res.success) {
                            $('.fs-success').show();
                          // 失败
                          } else {
                            $('.fs-fail').show();
                          }
                          // 服务器异常
                        } else {
                            alert(res.msg)
                        }
                    },
                    error: function(jqXHR, exception) {
                      if (jqXHR.status === 0) {
                        alert('提示', '连接失败，请稍后重试~');
                      } else if (jqXHR.status == 401) {
                        alert('提示', '连接服务器需要权限~');
                      } else if (jqXHR.status == 404) {
                        alert('提示', '请求 url 无法找到。[404]');
                      } else if (jqXHR.status >= 500 && jqXHR.status < 600) {
                        alert('提示', '十分抱歉，服务器内部发生错误。' + jqXHR.status);
                      } else if (exception === 'parsererror') {
                        alert('提示', 'JSON 解析失败！请尝试切换网络。');
                      } else if (exception === 'timeout') {
                        alert('提示', '连接超时，请稍后重试~');
                      } else {
                        alert('提示', '发现未知错误。(' + jqXHR.responseText + ', ' + exception + ')');
                      }
                    }
                });

                //var _music = (vazee.control.Music.Instance.musicOn) ? "on" : "off";
                //window.location.href = appurl + "?level=" + (curLevel + 1) + "&music=" + _music + "&prevscore=" + vazee.Counter.Instance.num + "&name=" + encodeURIComponent(username);
            };
            return BtnNext;
        })(PIXI.Sprite);
        success.BtnNext = BtnNext;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var BtnShare = (function (_super) {
            __extends(BtnShare, _super);
            function BtnShare() {
                _super.call(this, PIXI.Texture.fromFrame("success-btn-share.png"));
                this.addChild(success.Light.Instance);
                this.position.set(-90, 280);
            }
            Object.defineProperty(BtnShare, "Instance", {
                get: function () {
                    if (!BtnShare._Instance) {
                        BtnShare._Instance = new BtnShare();
                    }
                    return BtnShare._Instance;
                },
                enumerable: true,
                configurable: true
            });
            BtnShare.prototype.fnActive = function () {
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap);
                }
            };
            BtnShare.prototype.fnTap = function () {
                location.href = 'http://www.baidu.com';
            };
            return BtnShare;
        })(PIXI.Sprite);
        success.BtnShare = BtnShare;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var Content = (function (_super) {
            __extends(Content, _super);
            function Content() {
                var _this = this;
                _super.call(this);
                this.addChild(success.Copy.Instance);
                this.addChild(success.Score.Instance);
                this.addChild(success.TitleDefeat.Instance);
                this.addChild(success.BtnNext.Instance);
                this.addChild(success.BtnShare.Instance);
                this.rotation = -11.4 * Math.PI / 180;
                this.y = 140;
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .48;
                });
            }
            Object.defineProperty(Content, "Instance", {
                get: function () {
                    if (!Content._Instance) {
                        Content._Instance = new Content();
                    }
                    return Content._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Content;
        })(PIXI.Container);
        success.Content = Content;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var Copy = (function (_super) {
            __extends(Copy, _super);
            function Copy() {
                _super.call(this, PIXI.Texture.fromFrame("success-copy.png"));
                this.position.set(127, -50);
            }
            Object.defineProperty(Copy, "Instance", {
                get: function () {
                    if (!Copy._Instance) {
                        Copy._Instance = new Copy();
                    }
                    return Copy._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Copy;
        })(PIXI.Sprite);
        success.Copy = Copy;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var Ending = (function (_super) {
            __extends(Ending, _super);
            function Ending() {
                var _this = this;
                var _texture = [];
                for (var i = 0; i < 30; i++) {
                    _texture.push(PIXI.Texture.fromFrame("ending" + App.FnZeroFill(i, 3) + ".png"));
                }
                _super.call(this, _texture);
                this.anchor.set(.5, .6);
                this.y = 320;
                this.animationSpeed = .33;
                this.loop = false;
                this.visible = false;
                this.onComplete = function () {
                    _this.gotoAndPlay(10);
                };
                this.x = ((App.Portrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .25;
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .25;
                });
            }
            Object.defineProperty(Ending, "Instance", {
                get: function () {
                    if (!Ending._Instance) {
                        Ending._Instance = new Ending();
                    }
                    return Ending._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Ending;
        })(PIXI.extras.MovieClip);
        success.Ending = Ending;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var Light = (function (_super) {
            __extends(Light, _super);
            function Light() {
                _super.call(this, PIXI.Texture.fromFrame("title-light2.png"));
                this.visible = false;
                this.position.set(-200, 73);
            }
            Object.defineProperty(Light, "Instance", {
                get: function () {
                    if (!Light._Instance) {
                        Light._Instance = new Light();
                    }
                    return Light._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Light.prototype.fnShow = function () {
                this.visible = true;
                if (!this.tlLight) {
                    this.tlLight = new TimelineMax({ repeat: -1 });
                    this.tlLight.from(this, .2, { alpha: 0 }).from(this, .3, { x: 300 }, "-=.2").to(this, .2, { alpha: 0 }, "-=.2");
                }
                else {
                    this.tlLight.play();
                }
            };
            Light.prototype.fnHide = function () {
                if (this.tlLight) {
                    this.tlLight.pause();
                }
                this.visible = false;
            };
            return Light;
        })(PIXI.Sprite);
        success.Light = Light;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var Loader = (function (_super) {
            __extends(Loader, _super);
            function Loader() {
                var _this = this;
                _super.call(this, PIXI.Texture.fromFrame("success-loader.png"));
                this.anchor.set(1, .5);
                this.y = 320;
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x * .3;
                });
            }
            Object.defineProperty(Loader, "Instance", {
                get: function () {
                    if (!Loader._Instance) {
                        Loader._Instance = new Loader();
                    }
                    return Loader._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Loader;
        })(PIXI.Sprite);
        success.Loader = Loader;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var Score = (function (_super) {
            __extends(Score, _super);
            function Score() {
                _super.call(this, "0.0", { font: "100px score-export", align: "right" });
                this.position.set(410 - this.textWidth, 50);
                this._num = 0;
            }
            Object.defineProperty(Score, "Instance", {
                get: function () {
                    if (!Score._Instance) {
                        Score._Instance = new Score();
                    }
                    return Score._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Score.prototype, "num", {
                get: function () {
                    return this._num;
                },
                set: function (aNum) {
                    this._num = aNum;
                    this.text = (aNum * .01).toFixed(2);
                    this.position.x = 410 - this.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            Score.prototype.fnCenter = function () {
                var _this = this;
                setTimeout(function () {
                    _this.position.x = 410 - _this.textWidth;
                }, 100);
            };
            return Score;
        })(PIXI.extras.BitmapText);
        success.Score = Score;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var success;
    (function (success) {
        "use strict";
        var Success = (function (_super) {
            __extends(Success, _super);
            function Success() {
                _super.call(this);
                this.y = 640;
                this.addChild(success.Bg.Instance);
                this.addChild(success.Content.Instance);
                //this.addChild(success.Loader.Instance);
                this.fnLoadAnim();
            }
            Object.defineProperty(Success, "Instance", {
                get: function () {
                    if (!Success._Instance) {
                        Success._Instance = new Success();
                    }
                    return Success._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Success.prototype.fnShow = function () {
                this.visible = true;
                success.Light.Instance.fnShow();
                TweenMax.to(this, .3, {
                    y: 0,
                    onComplete: function () {
                        vazee.Track.Stop = true;
                        vazee.Hero.Instance.stop();
                        vazee.Hero.Instance.visible = false;
                        //vazee.Animal.Instance.stop();
                        //vazee.Animal.Instance.visible = false;
                        vazee.control.Control.Instance.visible = false;
                        TweenMax.to(success.Score.Instance, .6, {
                            num: vazee.Counter.Instance.num,
                            delay: .2,
                            onComplete: function () {
                                success.Score.Instance.fnCenter();
                            }
                        });
                        success.BtnNext.Instance.fnActive();
                        success.BtnShare.Instance.fnActive();
                        if (!success.Loader.Instance.visible) {
                            setTimeout(function () {
                                success.Ending.Instance.visible = true;
                                success.Ending.Instance.play();
                            }, 200);
                        }
                    }
                });
                _hmt.push(["_trackEvent", "page", "view", "gamesuccess"]);
            };
            Success.prototype.fnLoadAnim = function () {
                var _this = this;
                PIXI.loader.reset();
                var _list = [];
                //var _endLen = [2, 3, 2, 2, 3];
                //for (var i = 0; i < _endLen[curLevel - 1]; i++) {
                //    _list.push("img/end" + curLevel + i + ".json");
                //}
                PIXI.loader.add(_list).load(function () {
                    success.Loader.Instance.visible = false;
                    _this.addChild(success.Ending.Instance);
                    if (App.State === 4 /* STATE_GAMEOVER */ && App.Success) {
                        success.Ending.Instance.visible = true;
                        success.Ending.Instance.play();
                    }
                });
            };
            return Success;
        })(PIXI.Container);
        success.Success = Success;
    })(success = vazee.success || (vazee.success = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var title;
    (function (title) {
        "use strict";
        var Light1 = (function (_super) {
            __extends(Light1, _super);
            function Light1() {
                _super.call(this, PIXI.Texture.fromFrame("title-light1.png"));
                this.y = 156;
                this.visible = false;
            }
            Object.defineProperty(Light1, "Instance", {
                get: function () {
                    if (!Light1._Instance) {
                        Light1._Instance = new Light1();
                    }
                    return Light1._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Light1;
        })(PIXI.Sprite);
        title.Light1 = Light1;
    })(title = vazee.title || (vazee.title = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var title;
    (function (title) {
        "use strict";
        var Light2 = (function (_super) {
            __extends(Light2, _super);
            function Light2() {
                _super.call(this, PIXI.Texture.fromFrame("title-light2.png"));
                this.y = 179;
                this.visible = false;
            }
            Object.defineProperty(Light2, "Instance", {
                get: function () {
                    if (!Light2._Instance) {
                        Light2._Instance = new Light2();
                    }
                    return Light2._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return Light2;
        })(PIXI.Sprite);
        title.Light2 = Light2;
    })(title = vazee.title || (vazee.title = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var title;
    (function (title) {
        "use strict";
        var Title = (function (_super) {
            __extends(Title, _super);
            function Title() {
                var _this = this;
                _super.call(this);
                this.addChild(title.TitleText.Instance);
                this.addChild(title.TitleSub.Instance);
                this.addChild(title.TitleStart.Instance);
                this.addChild(title.Light1.Instance);
                this.addChild(title.Light2.Instance);
                this.position.set(200, 180);
                this.rotation = -11.5 * Math.PI / 180;
                title.TitleText.Instance.rotation = 2.2 * Math.PI / 180;
                App.EventResize.on(function (aPortrait) {
                    _this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - 800;
                });
                App.EventState.on(function (aState) {
                    switch (aState) {
                        case 1 /* STATE_INTRO */:
                            _this.fnShow();
                            break;
                        case 2 /* STATE_START */:
                            _this.fnHide();
                            break;
                        case 2 /* STATE_START */:
                            _this.visible = false;
                            break;
                    }
                });
            }
            Object.defineProperty(Title, "Instance", {
                get: function () {
                    if (!Title._Instance) {
                        Title._Instance = new Title();
                    }
                    return Title._Instance;
                },
                enumerable: true,
                configurable: true
            });
            Title.prototype.fnHide = function () {
                if (this.tlLight1) {
                    this.tlLight1.kill();
                    title.Light1.Instance.visible = false;
                    this.tlLight2.kill();
                    title.Light2.Instance.visible = false;
                    this.tlTitle.reverse();
                }
            };
            Title.prototype.fnShow = function () {
                var _e = Back.easeOut;
                this.tlTitle = new TimelineMax();
                this.tlTitle.set(title.TitleText.Instance, { visible: false }).from(title.TitleText.Instance, 0.5, {
                    x: 800,
                    ease: _e,
                    onStart: function () {
                        title.TitleText.Instance.visible = true;
                    }
                }, 1).set(title.TitleSub.Instance, { visible: false }, "-=0.4").from(title.TitleSub.Instance, 0.5, {
                    x: -800,
                    ease: _e,
                    onStart: function () {
                        title.TitleSub.Instance.visible = true;
                    }
                }, "-=0.4").set(title.TitleStart.Instance, { visible: false }, "-=0.4").from(title.TitleStart.Instance, 0.5, {
                    x: 800,
                    ease: _e,
                    onStart: function () {
                        title.TitleStart.Instance.visible = true;
                    },
                    onComplete: function () {
                        title.TitleStart.Instance.fnActive();
                    }
                }, "-=0.4");
                this.tlLight1 = new TimelineMax({ repeat: -1, delay: 1.6, onStart: function () {
                    title.Light1.Instance.visible = true;
                } });
                this.tlLight1.from(title.Light1.Instance, .2, { alpha: 0 }).from(title.Light1.Instance, .4, { x: 600 }, "-=.2").to(title.Light1.Instance, .2, { alpha: 0 }, "-=.2");
                this.tlLight2 = new TimelineMax({ repeat: -1, delay: 1.7, onStart: function () {
                    title.Light2.Instance.visible = true;
                } });
                this.tlLight2.from(title.Light2.Instance, .2, { alpha: 0 }).from(title.Light2.Instance, .3, { x: 400 }, "-=.2").to(title.Light2.Instance, .2, { alpha: 0 }, "-=.2");
                _hmt.push(["_trackEvent", "page", "view", "gamehome"]);
            };
            return Title;
        })(PIXI.Container);
        title.Title = Title;
    })(title = vazee.title || (vazee.title = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var title;
    (function (title) {
        "use strict";
        var TitleStart = (function (_super) {
            __extends(TitleStart, _super);
            function TitleStart() {
                _super.call(this, PIXI.Texture.fromFrame("title-start.png"));
                this.position.set(70, 162);
                this.visible = false;
            }
            Object.defineProperty(TitleStart, "Instance", {
                get: function () {
                    if (!TitleStart._Instance) {
                        TitleStart._Instance = new TitleStart();
                    }
                    return TitleStart._Instance;
                },
                enumerable: true,
                configurable: true
            });
            TitleStart.prototype.fnActive = function () {
                if (!this.interactive) {
                    this.buttonMode = this.interactive = true;
                    this.on("click", this.fnTap).on("tap", this.fnTap);
                }
            };
            TitleStart.prototype.fnTap = function () {
                App.FnStart();
                _hmt.push(["_trackEvent", "button", "click", "StartGame"]);
            };
            TitleStart.prototype.handleLoad = function (event) {
                createjs.Sound.play(event.src);
            };
            return TitleStart;
        })(PIXI.Sprite);
        title.TitleStart = TitleStart;
    })(title = vazee.title || (vazee.title = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var title;
    (function (title) {
        "use strict";
        var TitleSub = (function (_super) {
            __extends(TitleSub, _super);
            function TitleSub() {
                _super.call(this, PIXI.Texture.fromFrame("title-sub.png"));
                this.y = 123;
                this.x = -50;
                this.visible = false;
            }
            Object.defineProperty(TitleSub, "Instance", {
                get: function () {
                    if (!TitleSub._Instance) {
                        TitleSub._Instance = new TitleSub();
                    }
                    return TitleSub._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return TitleSub;
        })(PIXI.Sprite);
        title.TitleSub = TitleSub;
    })(title = vazee.title || (vazee.title = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    var title;
    (function (title) {
        "use strict";
        var TitleText = (function (_super) {
            __extends(TitleText, _super);
            function TitleText() {
                //_super.call(this, PIXI.Texture.fromFrame("title-text.png"));
                _super.call(this, PIXI.Texture.fromFrame("home-title.png"));
                this.y = -115;
                this.visible = false;
            }
            Object.defineProperty(TitleText, "Instance", {
                get: function () {
                    if (!TitleText._Instance) {
                        TitleText._Instance = new TitleText();
                    }
                    return TitleText._Instance;
                },
                enumerable: true,
                configurable: true
            });
            return TitleText;
        })(PIXI.Sprite);
        title.TitleText = TitleText;
    })(title = vazee.title || (vazee.title = {}));
})(vazee || (vazee = {}));
var vazee;
(function (vazee) {
    "use strict";
    var Track = (function (_super) {
        __extends(Track, _super);
        function Track(aId) {
            var _this = this;
            _super.call(this, PIXI.Texture.fromFrame("img/track.jpg"));
            this.x = aId * Track.TRACK_W;
            App.EventUpdate.on(function (dt) {
                _this.fnUpdate(dt);
            });
            App.EventState.on(function (aState) {
                switch (aState) {
                    case 3 /* STATE_GAMING */:
                        Track.Stop = false;
                        TweenMax.to(Track, .8, { Facter: 1.8, ease: Linear.easeNone });
                        break;
                }
            });
        }
        Track.FnUpdateTrackSpeed = function () {
            App.EventUpdate.on(function (dt) {
                if (Track.Stop) {
                    return;
                }
                Track.TrackSpeed = vazee.Hero.Instance.animationSpeed * dt * Track.Facter;
            });
        };
        Track.prototype.fnUpdate = function (dt) {
            if (Track.Stop) {
                return;
            }
            this.x -= Track.TrackSpeed;
            if (this.x < -Track.TRACK_W) {
                this.x += Track.TRACK_W * 3;
            }
        };
        Track.TRACK_W = 1032;
        Track.Stop = true;
        Track.Facter = 0;
        Track.TrackSpeed = 0;
        return Track;
    })(PIXI.Sprite);
    vazee.Track = Track;
})(vazee || (vazee = {}));

//游戏运行时背景
var vazee;
(function (vazee) {
    "use strict";
    var GamingBg = (function (_super) {
        __extends(GamingBg, _super);
        function GamingBg() {
            var _this = this;
            _super.call(this, PIXI.Texture.fromFrame("gaming.png"));
            this.position.set(530, 80);
            this.visible = true;
        }
        Object.defineProperty(GamingBg, "Instance", {
            get: function () {
                if (!GamingBg._Instance) {
                    GamingBg._Instance = new GamingBg();
                }
                return GamingBg._Instance;
            },
            enumerable: true,
            configurable: true
        });
        return GamingBg;
    })(PIXI.Sprite);
    vazee.GamingBg = GamingBg;
})(vazee || (vazee = {}));

//购买按钮
var vazee;
(function (vazee) {
    "use strict";
    var BtnBuy = (function (_super) {
        __extends(BtnBuy, _super);
        function BtnBuy() {
            var _this = this;
            _super.call(this, PIXI.Texture.fromFrame("btn-buy.png"));
            this.position.set(500, 530);
            this.visible = true;
        }
        Object.defineProperty(BtnBuy, "Instance", {
            get: function () {
                if (!BtnBuy._Instance) {
                    BtnBuy._Instance = new BtnBuy();
                }
                return BtnBuy._Instance;
            },
            enumerable: true,
            configurable: true
        });
        return BtnBuy;
    })(PIXI.Sprite);
    vazee.BtnBuy = BtnBuy;
})(vazee || (vazee = {}));

//分享按钮
var vazee;
(function (vazee) {
    "use strict";
    var BtnShare = (function (_super) {
        __extends(BtnShare, _super);
        function BtnShare() {
            var _this = this;
            _super.call(this, PIXI.Texture.fromFrame("btn-share.png"));
            this.position.set(750, 530);

            this.visible = true;
        }
        Object.defineProperty(BtnShare, "Instance", {
            get: function () {
                if (!BtnShare._Instance) {
                    BtnShare._Instance = new BtnShare();
                }
                return BtnShare._Instance;
            },
            enumerable: true,
            configurable: true
        });
        BtnShare.prototype.fnActive = function () {
          if (!this.interactive) {
            this.buttonMode = this.interactive = true;
            this.on("click", this.fnTap).on("tap", this.fnTap);
          }
        };
        BtnShare.prototype.fnTap = function () {
          setShare({
            'image_url':'',
            'link_url':'http://www.baidu.com',
            'title':'乐动力NB',
            'content':'乐动力NBBB',
            'shared_to':'0'
          });
        };
        return BtnShare;
    })(PIXI.Sprite);
    vazee.BtnShare = BtnShare;
})(vazee || (vazee = {}));

//鞋子
var vazee;
(function (vazee) {
  "use strict";
  var Shoe = (function (_super) {
    __extends(Shoe, _super);
    function Shoe() {
      var _this = this;
      _super.call(this, PIXI.Texture.fromFrame("shoe.png"));
      this.position.set(-50, 30);
      this.visible = true;
    }
    Object.defineProperty(Shoe, "Instance", {
      get: function () {
        if (!Shoe._Instance) {
          Shoe._Instance = new Shoe();
        }
        return Shoe._Instance;
      },
      enumerable: true,
      configurable: true
    });
    return Shoe;
  })(PIXI.Sprite);
  vazee.Shoe = Shoe;
})(vazee || (vazee = {}));
//# sourceMappingURL=app.js.map
declare var appType: string;
declare var curLevel: number;

var appurl = "http://vazee.newbalance.com.cn/h5/gallery/";

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?7caa70c2607cee020fcf49672beb0d76";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback: Function) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

$(document).ready(function () {
    $(window).on("resize orientationchange", App.FnResize);
    App.FnFitWindow();
    App.FnLoadAsset();
});

enum STATE { STATE_LOADING, STATE_INTRO, STATE_START, STATE_GAMING, STATE_GAMEOVER };

class App {
    static Render:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
    static Stage:PIXI.Container;
    static ToResize:number;
    static Portrait:boolean;
    static WinW:number;
    static WinH: number;
    static EventResize: LiteEvent<boolean>;
    static EventUpdate: LiteEvent<number>;
    static Time: number;
    static State: STATE = STATE.STATE_LOADING;
    static EventState: LiteEvent<number>;

    static FnLoadAsset() {

        switch (appType) {
            case "game":
                App.FnLoadGameAsset();
                break;
            case "offline":
                App.FnLoadOfflineAsset();
                break;
        }

    }

    static FnLoadOfflineAsset() {
        var _list = [
            "img/friend.json",
            "img/score-export.xml",
        ];
        var _endLen = [2, 3, 2, 2, 3];
        for (var i = 0; i < _endLen[curLevel - 1]; i++) {
            _list.push("img/end" + curLevel + i + ".json");
        }
        PIXI.loader.add(_list).load(() => {
            $("#loader").hide();
            $("#game").show();
            App.FnOfflineInit();
        });
        PIXI.loader.on("progress", function (e: any) {
            $("#percent").html(Math.floor(PIXI.loader.progress).toString());
        });

    }

    static FnLoadGameAsset() {
        var _animalLength = [1, 1, 2, 1, 2];
        var _list = [
            "img/track.jpg",
            "img/atlas0.json",
            "img/atlas1.json",
            "img/score-export.xml",
            "img/font-export.xml",
            "img/shareGo.json",
            "img/share-back.jpg",
            "img/share-back-landscape.jpg"
        ];
        if (_animalLength[curLevel-1] === 1) {
            _list.push("img/L" + curLevel + ".json");
        } else {
            for (var i = 0; i < _animalLength[curLevel-1]; i++) {
                _list.push("img/L" + curLevel + i + ".json");
            }
        }
        PIXI.loader.add(_list).load(() => {
            $("#loader").hide();
            $("#game").show();
            App.FnGameInit();
        });
        PIXI.loader.on("progress", function (e: any) {
            $("#percent").html(Math.floor(PIXI.loader.progress).toString());
        });

    }

    static FnOfflineInit() {
        if (!App.Render) {
            App.EventState = new LiteEvent<number>();
            App.EventResize = new LiteEvent<boolean>();
            App.EventUpdate = new LiteEvent<number>();
            App.Render = PIXI.autoDetectRenderer(640, 1030, {
                view: <HTMLCanvasElement>document.getElementById("game"),
                resolution: 2,
                autoResize: true
            });
            App.Render.backgroundColor = 0;
            App.Stage = new PIXI.Container();
            App.Stage.addChild(vazee.Game.Instance);
            App.FnFitWindow();
            App.FnLoop();
        }
    }

    static FnGameInit() {
        if (!App.Render) {
            Sfx.FnBgm();
            App.EventState = new LiteEvent<number>();
            App.EventResize = new LiteEvent<boolean>();
            App.EventUpdate = new LiteEvent<number>();
            App.Render = PIXI.autoDetectRenderer(640, 1030, {
                view: <HTMLCanvasElement>document.getElementById("game"),
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
            } else {
                App.FnStart();
            }
        }
    }

    static FnIntro() {
        if (App.State === STATE.STATE_INTRO) {
            return;
        }
        App.State = STATE.STATE_INTRO;
        App.EventState.trigger(STATE.STATE_INTRO);
    }

    static FnStart() {
        if (App.State === STATE.STATE_START) {
            return;
        }
        App.State = STATE.STATE_START;
        App.EventState.trigger(STATE.STATE_START);
    }

    static FnGaming() {
        if (App.State === STATE.STATE_GAMING) {
            return;
        }
        App.State = STATE.STATE_GAMING;
        App.EventState.trigger(STATE.STATE_GAMING);
    }
    static Success: boolean = false;
    static FnGameOver(aSuccess: boolean) {
        if (App.State === STATE.STATE_GAMEOVER) {
            return;
        }
        App.Success = aSuccess;
        App.State = STATE.STATE_GAMEOVER;
        App.EventState.trigger(STATE.STATE_GAMEOVER);
    }

    static FnLoop() {
        window.requestAnimFrame(App.FnLoop);
        App.Render.render(App.Stage);
        var _now = Date.now();
        var _dt = _now - (App.Time || _now);
        App.Time = _now;
        App.EventUpdate.trigger(_dt);
    }

    static FnResize() {
        if (App.ToResize) {
            clearTimeout(App.ToResize);
        }
        App.ToResize = setTimeout(App.FnFitWindow, 300);
    }

    static FnFitWindow() {
        App.WinW = (document.documentElement.clientWidth || 640);
        App.WinH = (document.documentElement.clientHeight || 1030);
        App.Portrait = (App.WinH > App.WinW);
        if (App.Portrait) {
            (appType === "game") ? $("#loader").addClass("r90") : $("#loader").removeClass("r90");
        } else {
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
            } else {
                App.Stage.scale.y = App.WinH / 640;
                App.Stage.scale.x = App.Stage.scale.y;
                App.Stage.rotation = 0;
                App.Stage.position.set(0, 0);
            }
            App.EventResize.trigger(App.Portrait);
        }
    }

    static FnZeroFill(num: number, width: number) {
        width -= num.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(num.toString()) ? 2 : 1)).join("0") + num;
        }
        return num + "";
    }

    static FnDebug(aInfo: string) {
        $("#debug").append("[" + aInfo + "]");
    }
}

declare var prevscore: number;
declare var wx;
if (wx) {
    wx.ready(function () {
        var _link: string;
        if (appType === "offline") {
            _link = appurl + "share.php?friend=1&score=" + offlineScore + "&name=" + encodeURIComponent(username);
            fnWxShare(fnGetCopy(offlineScore, username, curLevel), _link);
        } else if (curLevel > 1) {
            _link = appurl + "share.php?friend=1&friendlevel=" + (curLevel - 1)
                + "&score=" + prevscore + "&name=" + encodeURIComponent(username);
            fnWxShare(fnGetCopy(prevscore, username, curLevel-1), _link);
        } else {
            fnWxShare("10米加速能多快？测一测，看你够不够拽！", appurl);
        }
    });
}

function fnGetCopy(aScore: number, aName:string, aLevel:number) {
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

function fnWxShare(aTitle: string, aLink: string) {
    "use strict";
    if (wx) {
        var _icon = "img/shareicon.jpg";
        if (App.Success || appType === "offline") {
            _icon = "img/icon" + curLevel + ".jpg";
        } else if (curLevel > 1) {
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
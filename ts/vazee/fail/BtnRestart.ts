module vazee.fail {
    "use strict";
    export class BtnRestart extends PIXI.Sprite {
        private static _Instance: BtnRestart;
        static get Instance() {
            if (!BtnRestart._Instance) {
                BtnRestart._Instance = new BtnRestart();
            }
            return BtnRestart._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("fail-restart.png"));
            this.position.set(18, 130);
        }

        fnActive() {
            if (!this.interactive) {
                this.buttonMode = this.interactive = true;
                this.on("click", this.fnTap)
                    .on("tap", this.fnTap);
            }
        }

        fnTap() {
            _hmt.push(["_trackEvent", "button", "click", "Restart"]);
            var _music = (control.Music.Instance.musicOn) ? "on" : "off";
            window.location.href = appurl + "?level=" + (curLevel) +
            "&music=" + _music + "&prevscore=" + prevscore + "&name=" + encodeURIComponent(username);
        }
    }
} 
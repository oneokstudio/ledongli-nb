module vazee.success {
    "use strict";
    export class BtnNext extends PIXI.Sprite {

        private static _Instance: BtnNext;
        static get Instance() {
            if (!BtnNext._Instance) {
                BtnNext._Instance = new BtnNext();
            }
            return BtnNext._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("success-btn-next.png"));
            this.position.set(20, 243);
            this.visible = (curLevel < 5);
        }

        fnActive() {
            if (!this.interactive) {
                this.buttonMode = this.interactive = true;
                this.on("click", this.fnTap)
                    .on("tap", this.fnTap);
            }
        }

        fnTap() {
            _hmt.push(["_trackEvent", "button", "click", "NextLevel"]);
            var _music = (control.Music.Instance.musicOn) ? "on" : "off";
            window.location.href = appurl + "?level=" + (curLevel + 1) +
            "&music=" + _music + "&prevscore="+ Counter.Instance.num + "&name=" + encodeURIComponent(username);
        }
    }
} 
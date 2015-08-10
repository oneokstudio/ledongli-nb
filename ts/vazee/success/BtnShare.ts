module vazee.success {
    "use strict";
    export class BtnShare extends PIXI.Sprite {

        private static _Instance: BtnShare;
        static get Instance() {
            if (!BtnShare._Instance) {
                BtnShare._Instance = new BtnShare();
            }
            return BtnShare._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("success-btn-share.png"));
            this.addChild(Light.Instance);
            this.position.set(-90, 340);
        }

        fnActive() {
            if (!this.interactive) {
                this.buttonMode = this.interactive = true;
                this.on("click", this.fnTap)
                    .on("tap", this.fnTap);
            }
        }

        fnTap() {
            share.Share.Instance.fnShow();
            _hmt.push(["_trackEvent", "button", "click", "Share"]);
        }
    }
} 
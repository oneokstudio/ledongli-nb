module vazee.fail {
    "use strict";
    export class BtnBack extends PIXI.Sprite {
        private static _Instance: BtnBack;
        static get Instance() {
            if (!BtnBack._Instance) {
                BtnBack._Instance = new BtnBack();
            }
            return BtnBack._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("success-btn-share.png"));
            this.position.set(0, 222);
            this.addChild(Light.Instance);
            if (curLevel === 1) {
                this.visible = false;
            }
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
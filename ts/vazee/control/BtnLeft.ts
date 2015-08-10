module vazee.control {
    "use strict";
    export class BtnLeft extends PIXI.Sprite {
        private static _Instance: BtnLeft;
        static get Instance() {
            if (!BtnLeft._Instance) {
                BtnLeft._Instance = new BtnLeft();
            }
            return BtnLeft._Instance;
        }

        texNormal: PIXI.Texture;
        texHigh: PIXI.Texture;
        constructor() {
            this.texNormal = PIXI.Texture.fromFrame("control-left-btn.png");
            this.texHigh = PIXI.Texture.fromFrame("control-left-btn-high.png");
            super(this.texNormal);
            this.position.set(77, -170);
        }

        fnHigh() {
            this.texture = this.texHigh;
        }

        fnNormal() {
            this.texture = this.texNormal;
        }

        fnActive() {
            if (!this.interactive) {
                this.buttonMode = this.interactive = true;
                this.on("click", this.fnTap)
                    .on("tap", this.fnTap)
                    .on("mousedown", this.fnHigh)
                    .on("touchstart", this.fnHigh)
                    .on("mouseup", this.fnNormal)
                    .on("touchend", this.fnNormal)
                    .on("mouseupoutside", this.fnNormal)
                    .on("touchendoutside", this.fnNormal);
            }
        }

        fnTap() {
            switch (App.State) {
                case STATE.STATE_INTRO:
                    App.FnStart();
                    break;
                case STATE.STATE_GAMING:
                    if (Control.CurTap === TAPPED.RIGHT) {
                        Control.CurTap = TAPPED.LEFT;
                        Hero.Instance.fnAddSpeed(true);
                    } else {
                        Hero.Instance.fnAddSpeed(false);
                    }
                    break;
            }
        }
    }
} 
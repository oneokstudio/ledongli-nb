module vazee.control {
    "use strict";
    export class BtnRight extends PIXI.Sprite {
        private static _Instance: BtnRight;
        static get Instance() {
            if (!BtnRight._Instance) {
                BtnRight._Instance = new BtnRight();
            }
            return BtnRight._Instance;
        }

        texNormal: PIXI.Texture;
        texHigh: PIXI.Texture;
        constructor() {
            this.texNormal = PIXI.Texture.fromFrame("control-right-btn.png");
            this.texHigh = PIXI.Texture.fromFrame("control-right-btn-high.png");
            super(this.texNormal);
            this.position.set(900, -170);
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - 240;
            });
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
                    if (Control.CurTap === TAPPED.LEFT) {
                        Control.CurTap = TAPPED.RIGHT;
                        Hero.Instance.fnAddSpeed(true);
                    } else {
                        Hero.Instance.fnAddSpeed(false);
                    }
                    break;
            }
        }
    }
}  
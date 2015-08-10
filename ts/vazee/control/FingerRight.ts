module vazee.control {
    "use strict";
    export class FingerRight extends PIXI.Sprite {

        private static _Instance: FingerRight;
        static get Instance() {
            if (!FingerRight._Instance) {
                FingerRight._Instance = new FingerRight();
            }
            return FingerRight._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("control-finger.png"));
            this.anchor.y = 1;
            this.y = this.height;
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - 180;
            });
        }

    }
} 
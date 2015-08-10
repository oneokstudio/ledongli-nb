module vazee.control {
    "use strict";
    export class FingerLeft extends PIXI.Sprite {

        private static _Instance: FingerLeft;
        static get Instance() {
            if (!FingerLeft._Instance) {
                FingerLeft._Instance = new FingerLeft();
            }
            return FingerLeft._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("control-finger.png"));
            this.anchor.set(1, 1);
            this.scale.x = -1;
            this.y = this.height;
        }
    }
} 
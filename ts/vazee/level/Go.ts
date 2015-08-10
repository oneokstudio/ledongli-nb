module vazee.level {
    "use strict";
    export class Go extends PIXI.Sprite {
        private static _Instance: Go;
        static get Instance() {
            if (!Go._Instance) {
                Go._Instance = new Go();
            }
            return Go._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("go.png"));
            this.position.set(-this.width, 93);
        }
    }
} 
module vazee.success {
    "use strict";
    export class Copy extends PIXI.Sprite {

        private static _Instance: Copy;
        static get Instance() {
            if (!Copy._Instance) {
                Copy._Instance = new Copy();
            }
            return Copy._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("success-copy.png"));
            this.position.set(57, 0);
        }
    }
} 
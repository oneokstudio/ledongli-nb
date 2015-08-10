module vazee.share {
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
            super(PIXI.Texture.fromFrame("share-copy.png"));
            this.visible = false;
        }

        fnReset() {
            this.position.set(0, 0);
            this.visible = false;
        }
    }
} 
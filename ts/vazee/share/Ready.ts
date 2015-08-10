 module vazee.share {
    "use strict";
    export class Ready extends PIXI.Sprite {
        private static _Instance: Ready;
        static get Instance() {
            if (!Ready._Instance) {
                Ready._Instance = new Ready();
            }
            return Ready._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("share-ready.png"));
            this.fnReset();
        }

        fnReset() {
            this.position.set(370, -80);
            this.visible = false;
        }
    }
}  
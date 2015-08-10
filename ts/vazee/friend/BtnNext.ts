module vazee.success {
    "use strict";
    export class BtnNext extends PIXI.Sprite {

        private static _Instance: BtnNext;
        static get Instance() {
            if (!BtnNext._Instance) {
                BtnNext._Instance = new BtnNext();
            }
            return BtnNext._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("success-btn-next.png"));
            this.position.set(20, 243);
        }

        fnActive() {
            this.buttonMode = this.interactive = true;
            this.on("click", this.fnTap)
                .on("tap", this.fnTap);
        }

        fnTap() {
            location.reload();
        }
    }
} 
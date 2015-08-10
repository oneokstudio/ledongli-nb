module vazee.title {
    "use strict";
    export class TitleText extends PIXI.Sprite {
        private static _Instance: TitleText;
        static get Instance() {
            if (!TitleText._Instance) {
                TitleText._Instance = new TitleText();
            }
            return TitleText._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("title-text.png"));
            this.visible = false;
        }
    }
} 
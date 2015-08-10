module vazee.title {
    "use strict";
    export class TitleSub extends PIXI.Sprite {
        private static _Instance: TitleSub;
        static get Instance() {
            if (!TitleSub._Instance) {
                TitleSub._Instance = new TitleSub();
            }
            return TitleSub._Instance;
        }
        constructor() {
            super(PIXI.Texture.fromFrame("title-sub.png"));
            this.y = 113;
            this.visible = false;
        }
    }
} 
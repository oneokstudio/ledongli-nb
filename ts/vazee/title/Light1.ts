module vazee.title {
    "use strict";
    export class Light1 extends PIXI.Sprite {
        private static _Instance: Light1;
        static get Instance() {
            if (!Light1._Instance) {
                Light1._Instance = new Light1();
            }
            return Light1._Instance;
        }
        constructor() {
            super(PIXI.Texture.fromFrame("title-light1.png"));
            this.y = 156;
            this.visible = false;
        }
    }
} 
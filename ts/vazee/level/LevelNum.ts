module vazee.level {
    "use strict";
    export class LevelNum extends PIXI.Sprite {
        private static _Instance: LevelNum;
        static get Instance() {
            if (!LevelNum._Instance) {
                LevelNum._Instance = new LevelNum();
            }
            return LevelNum._Instance;
        }
        constructor() {
            super(PIXI.Texture.fromFrame("level" + curLevel + ".png"));
            this.position.set(-this.width, 106);
        }
    }
} 
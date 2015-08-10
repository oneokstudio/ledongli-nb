module vazee {
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
            super(PIXI.Texture.fromFrame("level_num.png"));
            this.position.set(30, -this.height);
            TweenMax.to(this, .3, { y: 96, ease: Back.easeOut, delay: (curLevel > 1) ? .5 : 1.8 });

        }
    }
}  
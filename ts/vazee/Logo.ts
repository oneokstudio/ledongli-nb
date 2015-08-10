module vazee {
    "use strict";
    export class Logo extends PIXI.Sprite {
        private static _Instance: Logo;
        static get Instance() {
            if (!Logo._Instance) {
                Logo._Instance = new Logo();
            }
            return Logo._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("logo.png"));
            if (appType === "game") {
                this.position.set(20, -this.height);
                TweenMax.to(this, .3, { y: 20, ease: Back.easeOut, delay: (curLevel > 1) ? .3 : 1.6 });
            } else {
                this.rotation = -90 * Math.PI / 180;
                this.position.set(20, 880);
                TweenMax.to(this, .3, { y: 620, ease: Back.easeOut, delay: .1 });
            }
        }
    }
} 
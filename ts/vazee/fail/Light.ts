module vazee.fail {
    "use strict";
    export class Light extends PIXI.Sprite {
        private static _Instance: Light;
        static get Instance() {
            if (!Light._Instance) {
                Light._Instance = new Light();
            }
            return Light._Instance;
        }
        constructor() {
            super(PIXI.Texture.fromFrame("title-light2.png"));
            this.visible = false;
            this.position.set(-200, 73);
        }

        tlLight: TimelineMax;
        fnShow() {
            this.visible = true;
            if (!this.tlLight) {
                this.tlLight = new TimelineMax({ repeat: -1 });
                this.tlLight.from(this, .2, { alpha: 0 })
                    .from(this, .3, { x: 300 }, "-=.2")
                    .to(this, .2, { alpha: 0 }, "-=.2");
            } else {
                this.tlLight.play();
            }
        }

        fnHide() {
            if (this.tlLight) {
                this.tlLight.pause();
            }
            this.visible = false;
        }
    }
}   
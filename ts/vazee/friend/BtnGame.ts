module vazee.friend {
    "use strict";
    export class BtnGame extends PIXI.Sprite {

        private static _Instance: BtnGame;
        static get Instance() {
            if (!BtnGame._Instance) {
                BtnGame._Instance = new BtnGame();
            }
            return BtnGame._Instance;
        }

        constructor() {
            super(PIXI.Texture.fromFrame("success-btn-game.png"));
            this.position.set(0, 220);
            this.addChild(Light.Instance);
        }

        fnActive() {
            if (!this.interactive) {
                this.buttonMode = this.interactive = true;
                this.on("click", this.fnTap)
                    .on("tap", this.fnTap);
            }
        }

        fnTap() {
            _hmt.push(["_trackEvent", "button", "click", "Share2Game"]);
            window.location.href = appurl;
        }
    }
} 
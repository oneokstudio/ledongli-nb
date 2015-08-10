module vazee.fail {
    "use strict";
    export class Fail extends PIXI.Container {

        private static _Instance: Fail;
        static get Instance() {
            if (!Fail._Instance) {
                Fail._Instance = new Fail();
            }
            return Fail._Instance;
        }

        constructor() {
            super();
            this.position.set(1200, 640);
            this.visible = false;
            this.addChild(Copy.Instance);
            this.addChild(BtnRestart.Instance);
            this.addChild(BtnBack.Instance);
            this.rotation = -11.4 * Math.PI / 180;
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - this.width;
            });
        }

        fnShow() {
            this.visible = true;
            Light.Instance.fnShow();
            TweenMax.to(this, .6, {
                y: 160, ease: Back.easeOut, onComplete: () => {
                    BtnBack.Instance.fnActive();
                    BtnRestart.Instance.fnActive();
                }
            });
            _hmt.push(["_trackEvent", "page", "view", "gamefail"]);
        }
    }
} 
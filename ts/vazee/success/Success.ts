module vazee.success {
    "use strict";
    export class Success extends PIXI.Container {

        private static _Instance: Success;
        static get Instance() {
            if (!Success._Instance) {
                Success._Instance = new Success();
            }
            return Success._Instance;
        }
        constructor() {
            super();
            this.y = 640;
            this.addChild(Bg.Instance);
            this.addChild(Content.Instance);
            this.addChild(Loader.Instance);
            this.fnLoadAnim();
        }

        fnShow() {
            this.visible = true;
            Light.Instance.fnShow();
            TweenMax.to(this, .3, {
                y: 0, onComplete: () => {
                    Track.Stop = true;
                    Hero.Instance.stop(); Hero.Instance.visible = false;
                    Animal.Instance.stop(); Animal.Instance.visible = false;
                    control.Control.Instance.visible = false;

                    TweenMax.to(Score.Instance, .6, {
                        num: Counter.Instance.num,
                        delay: .2, onComplete: () => { Score.Instance.fnCenter(); }
                    });

                    BtnNext.Instance.fnActive();
                    BtnShare.Instance.fnActive();

                    if (!Loader.Instance.visible) {
                        setTimeout(() => {
                            Ending.Instance.visible = true;
                            Ending.Instance.play();
                        }, 200);
                    }
                }
            });
            _hmt.push(["_trackEvent", "page", "view", "gamesuccess"]);
        }

        fnLoadAnim() {
            PIXI.loader.reset();
            var _list = [];
            var _endLen = [2, 3, 2, 2, 3];
            for (var i = 0; i < _endLen[curLevel-1]; i++) {
                _list.push("img/end" + curLevel + i + ".json");
            }
            PIXI.loader.add(_list).load(() => {
                Loader.Instance.visible = false;
                this.addChild(Ending.Instance);
                if (App.State === STATE.STATE_GAMEOVER && App.Success) {
                    Ending.Instance.visible = true;
                    Ending.Instance.play();
                }
            });
        }
    }
} 
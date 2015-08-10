declare var offlineScore: number;

module vazee.friend {
    "use strict";
    export class Friend extends PIXI.Container {

        private static _Instance: Friend;
        static get Instance() {
            if (!Friend._Instance) {
                Friend._Instance = new Friend();
            }
            return Friend._Instance;
        }
        constructor() {
            super();
            this.addChild(Bg.Instance);
            this.addChild(Ending.Instance);
            this.addChild(Content.Instance);
            this.fnShow();
        }

        fnShow() {
            TweenMax.to(Score.Instance, .6, { num: offlineScore, delay: .2, onComplete: () => { Score.Instance.fnCenter(); } });
            BtnGame.Instance.fnActive();
            setTimeout(() => {
                Ending.Instance.visible = true;
                Ending.Instance.play();
                Light.Instance.fnShow();
            }, 300);
            _hmt.push(["_trackEvent", "page", "view", "ShareFromFriend"]);
        }
    }
} 
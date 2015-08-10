module vazee.level {
    "use strict";
    export class Level extends PIXI.Container {
        private static _Instance: Level;
        static get Instance() {
            if (!Level._Instance) {
                Level._Instance = new Level();
            }
            return Level._Instance;
        }

        tlShow: TimelineMax;
        constructor() {
            super();
            this.addChild(Ready.Instance);
            this.addChild(Go.Instance);
            this.addChild(LevelNum.Instance);
            App.EventState.on((aState: STATE) => {
                if (aState === STATE.STATE_START) {
                    this.fnShow();
                }
            });
        }

        fnShow() {
            this.tlShow = new TimelineMax({
                delay: .6, onComplete: () => {
                    this.visible = false;
                    App.FnGaming();
                }
            });
            this.tlShow
                .to(LevelNum.Instance, .3, { x: 270 })
                .to(LevelNum.Instance, 1.6, { x: 300 }, .3)
                .to(Ready.Instance, .3, { x: 257, onStart: () => { Ready.Instance.visible = true; } }, .2)
                .to(Ready.Instance, .6, { x: 220 }, .8)
                .to(Ready.Instance, .3, { x: -Ready.Instance.width, onComplete: () => { Ready.Instance.visible = false; } }, 1.1)
                .to(Go.Instance, .3, { x: 340 }, 1.2)
                .to(LevelNum.Instance, .3, { x:400, alpha: 0, onComplete: () => { LevelNum.Instance.visible = false; } })
                .to(Go.Instance, .3, { x: 500, alpha: 0, onComplete: () => { Go.Instance.visible = false; } }, "-=.3");
            _hmt.push(["_trackEvent", "page", "view", "gamestart_"+curLevel]);
        }
    }
} 
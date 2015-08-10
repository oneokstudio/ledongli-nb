enum TAPPED { LEFT, RIGHT };

module vazee.control {
    "use strict";
    export class Control extends PIXI.Container {
        private static _Instance: Control;
        static CurTap: TAPPED = TAPPED.LEFT;
        static get Instance() {
            if (!Control._Instance) {
                Control._Instance = new Control();
            }
            return Control._Instance;
        }

        tlDemo: TimelineMax;
        constructor() {
            super();
            this.addChild(BtnLeft.Instance);
            this.addChild(BtnRight.Instance);
            this.addChild(FingerLeft.Instance);
            this.addChild(FingerRight.Instance);
            this.addChild(Music.Instance);
            this.y = 640;
            this.alpha = 0;
                TweenMax.to(this, .6, {
                    alpha: 1, delay: 1.1, onComplete: () => {
                        if (curLevel === 1) {
                            this.fnDemo();
                        }
                    }
                });
            App.EventState.on((aState: number) => {
                if (aState === STATE.STATE_START) {
                    if (this.tlDemo) {
                        this.tlDemo.kill();
                    }
                    FingerLeft.Instance.visible = false;
                    FingerRight.Instance.visible = false;
                    BtnLeft.Instance.fnNormal();
                    BtnRight.Instance.fnNormal();
                    this.fnActive();
                }
            });
        }

        fnDemo() {
            this.tlDemo = new TimelineMax({ repeat: -1 });
            this.tlDemo.to(FingerLeft.Instance, .1, {
                y: 0, onComplete: () => {
                    BtnLeft.Instance.fnHigh();
                }
            }).to(FingerLeft.Instance, .1, {
                y: FingerLeft.Instance.height, onStart: () => {
                    BtnLeft.Instance.fnNormal();
                }
            }, "+=.1").to(FingerRight.Instance, .1, {
                y: 0, onComplete: () => {
                    BtnRight.Instance.fnHigh();
                }
            }).to(FingerRight.Instance, .1, {
                y: FingerRight.Instance.height, onStart: () => {
                    BtnRight.Instance.fnNormal();
                }
            }, "+=.1");
        }

        fnActive() {
            BtnLeft.Instance.fnActive();
            BtnRight.Instance.fnActive();
        }

    }
} 
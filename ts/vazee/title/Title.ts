module vazee.title {
    "use strict";
    export class Title extends PIXI.Container {
        private static _Instance: Title;
        static get Instance() {
            if (!Title._Instance) {
                Title._Instance = new Title();
            }
            return Title._Instance;
        }

        tlTitle: TimelineMax;
        tlLight1: TimelineMax;
        tlLight2: TimelineMax;
        constructor() {
            super();
            this.addChild(TitleText.Instance);
            this.addChild(TitleSub.Instance);
            this.addChild(TitleStart.Instance);
            this.addChild(Light1.Instance);
            this.addChild(Light2.Instance);
            this.position.set(200, 180);
            this.rotation = -11.5 * Math.PI / 180;
            App.EventResize.on((aPortrait: boolean) => {
                this.x = ((aPortrait) ? App.WinH : App.WinW) / App.Stage.scale.x - 800;
            });
            App.EventState.on((aState: STATE) => {
                switch (aState) {
                    case STATE.STATE_INTRO:
                        this.fnShow();
                        break;
                    case STATE.STATE_START:
                        this.fnHide();
                        break;
                    case STATE.STATE_START:
                        this.visible = false;
                        break;
                }
            });
        }

        fnHide() {
            if (this.tlLight1) {
                this.tlLight1.kill(); Light1.Instance.visible = false;
                this.tlLight2.kill(); Light2.Instance.visible = false;
                this.tlTitle.reverse();
            }
        }

        fnShow() {
            var _e = Back.easeOut;
            this.tlTitle = new TimelineMax();
            this.tlTitle
                .set(TitleText.Instance, { visible: false })
                .from(TitleText.Instance, 0.5, {
                        x: 800, ease: _e, onStart: () => {
                            TitleText.Instance.visible = true;
                        }
                    }, 1)
                .set(TitleSub.Instance, { visible: false }, "-=0.4")
                .from(TitleSub.Instance, 0.5, {
                            x: -800, ease: _e, onStart: () => {
                            TitleSub.Instance.visible = true;
                        }
                    }, "-=0.4")
                .set(TitleStart.Instance, { visible: false }, "-=0.4")
                .from(TitleStart.Instance, 0.5, {
                    x: 800, ease: _e, onStart: () => {
                        TitleStart.Instance.visible = true;
                    }, onComplete: () => { TitleStart.Instance.fnActive(); }
                }, "-=0.4");

            this.tlLight1 = new TimelineMax({ repeat: -1, delay: 1.6, onStart: () => { Light1.Instance.visible = true; } });
            this.tlLight1.from(Light1.Instance, .2, { alpha: 0 })
                .from(Light1.Instance, .4, { x: 600 }, "-=.2")
                .to(Light1.Instance, .2, { alpha: 0 }, "-=.2");

            this.tlLight2 = new TimelineMax({ repeat: -1, delay: 1.7, onStart: () => { Light2.Instance.visible = true; } });
            this.tlLight2.from(Light2.Instance, .2, { alpha: 0 })
                .from(Light2.Instance, .3, { x: 400 }, "-=.2")
                .to(Light2.Instance, .2, { alpha: 0 }, "-=.2");

            _hmt.push(["_trackEvent", "page", "view", "gamehome"]);
        }
    }
} 
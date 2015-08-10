module vazee.share {
    "use strict";
    export class Share extends PIXI.Container {

        private static _Instance: Share;
        static get Instance() {
            if (!Share._Instance) {
                Share._Instance = new Share();
            }
            return Share._Instance;
        }

        opened: boolean = false;
        constructor() {
            super();
            this.y = 640;
            this.addChild(Bg.Instance);
            this.addChild(Content.Instance);
            this.addChild(Shoe.Instance);
        }

        fnShow() {
            this.visible = true;
            TweenMax.to(this, .3, {
                y: 0, onComplete: () => {
                    this.opened = true;
                    var tlShow = new TimelineMax({
                        onComplete: () => {
                            this.fnActive();
                        }
                    });
                    var e = Back.easeOut;
                    tlShow
                        .from(Copy.Instance, .3, { x: "-=300", ease: e, onStart: () => { Copy.Instance.visible = true; } })
                        .from(Ready.Instance, .3, { x: "-=300", onStart: () => { Ready.Instance.visible = true; } }, "-=.1")
                        .to(Ready.Instance, .3, { x: "+=650" }, "+=.6")
                        .from(Go.Instance, .3, { x: "-=300", onStart: () => { Go.Instance.visible = true; } }, "-=.3");
                }
            });
        }

        fnActive() {
            if (!this.interactive) {
                Go.Instance.play();
                this.buttonMode = this.interactive = true;
                this.on("click", this.fnTap)
                    .on("tap", this.fnTap);
            }
        }

        fnHide() {
            this.opened = false;
            TweenMax.to(this, .3, {
                y: 640, onComplete: () => {
                    Shoe.Instance.visible = false;
                    Content.Instance.visible = true;
                    Copy.Instance.fnReset();
                    Ready.Instance.fnReset();
                    Go.Instance.fnReset();
                }
            });
        }

        fnTap() {
            if (Shoe.Instance.visible) {
                this.fnHide();
                _hmt.push(["_trackEvent", "page", "view", "Ad_Loaded"]);
            } else {
                Content.Instance.visible = false;
                Shoe.Instance.visible = true;
                _hmt.push(["_trackEvent", "button", "click", "ShareBack"]);
            }
        }
    }
} 
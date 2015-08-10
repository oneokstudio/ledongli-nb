module vazee {
    "use strict";
    export class Hero extends PIXI.extras.MovieClip {
        private static _Instance: Hero;
        static get Instance() {
            if (!Hero._Instance) {
                Hero._Instance = new Hero();
            }
            return Hero._Instance;
        }
        static MinSpeed: number = .33;
        static MaxSpeed: number = .9;
        toSlow: number;
        slowing: boolean;
        constructor() {
            var _texture = [];
            for (var i = 0; i < 73; i++) {
                _texture.push(PIXI.Texture.fromFrame("hero" + App.FnZeroFill(i, 3) + ".png"));
            }
            super(_texture);
            this.slowing = false;
            this.position.set(-12, 162);
            this.animationSpeed = Hero.MinSpeed + ((curLevel < 4) ? .1 : 0);
            this.loop = false;
            switch (curLevel) {
                case 1:
                    Hero.MaxSpeed = .5;
                    break;
                case 2:
                    Hero.MaxSpeed = .7;
                    break;
                case 3:
                    Hero.MaxSpeed = .56;
                    break;
                case 4:
                    Hero.MaxSpeed = .65;
                    break;
                case 5:
                    Hero.MaxSpeed = .88;
                    break;
            }
            this.onComplete = () => {
                this.gotoAndPlay(58);
            };
            App.EventState.on((aState: STATE) => {
                switch (aState) {
                    case STATE.STATE_GAMING:
                        this.play();
                        TweenMax.to(this, 2, {
                            x: (((App.Portrait) ? App.WinH : App.WinW) / App.Stage.scale.x - this.width) * .4,
                            ease: Linear.easeNone
                        });
                        break;
                }
            });
            App.EventUpdate.on((dt: number) => {
                this.fnUpdate(dt);
            });
        }

        fnAddSpeed(aSpeedUp: boolean) {
            this.animationSpeed += ((aSpeedUp)?.015:.005);
            if (this.animationSpeed > Hero.MaxSpeed) {
                this.animationSpeed = Hero.MaxSpeed;
            }
            this.slowing = false;
            if (this.toSlow) {
                clearTimeout(this.toSlow);
            }
            this.toSlow = setTimeout(() => { this.slowing = true; }, 200);
        }

        fnUpdate(dt:number) {
            if (this.slowing) {
                this.animationSpeed -= .001 * dt;
                if (this.animationSpeed < Hero.MinSpeed) {
                    this.animationSpeed = Hero.MinSpeed;
                }
            }
        }
    }
} 
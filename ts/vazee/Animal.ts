module vazee {
    "use strict";
    export class Animal extends PIXI.extras.MovieClip {

        private static _Instance: Animal;
        static get Instance() {
            if (!Animal._Instance) {
                Animal._Instance = new Animal();
            }
            return Animal._Instance;
        }

        static SpeedSet = [.6, .8, .88, 1.07, 1.42];
        speed: number;
        running: boolean;
        constructor() {
            var _texture = [];
            for (var i = 0; i < 24; i++) {
                _texture.push(PIXI.Texture.fromFrame("animal" + App.FnZeroFill(i, 3) + ".png"));
            }
            super(_texture);
            this.speed = 1.3;
            this.running = false;
            this.position.set(-810, 84);
            this.animationSpeed = .25;

            App.EventState.on((aState: number) => {
                switch (aState) {
                    case STATE.STATE_GAMING:
                        this.fnRun();
                        break;
                }
            });

            App.EventUpdate.on((dt: number) => {
                this.fnUpdate(dt);
            });
        }

        fnRun() {
            this.play();
            if (curLevel < 3) {
                TweenMax.from(this, 4, { animationSpeed: 1, ease: Linear.easeNone });
            }
            TweenMax.to(this, 4, { speed: Animal.SpeedSet[curLevel - 1], ease: Linear.easeNone});
            this.running = true;
        }

        fnUpdate(dt: number) {
            if (this.running) {
                this.x += (this.speed * dt - Track.TrackSpeed);
            }
        }
    }
} 
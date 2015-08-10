module vazee.friend {
    "use strict";
    export class Name extends PIXI.Text {

        private static _Instance: Name;
        static get Instance() {
            if (!Name._Instance) {
                Name._Instance = new Name();
            }
            return Name._Instance;
        }

        constructor() {
            super(username, { fill: "#FFFFFF" });
            if (this.width > 190) {
                while (this.width > 190) {
                    this.text = this.text.substr(0, this.text.length - 1);
                }
            }
            this.position.set(148 - this.width * .5, 27);
        }
    }
} 
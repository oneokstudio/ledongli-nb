/* tslint:disable */ 
interface Window {
    File: any; FileReader: any; FormData: any;
    requestAnimFrame: any;
    webkitRequestAnimationFrame: any;
    mozRequestAnimationFrame: any;
}
interface IElementFiles extends Element {
    files: Array<any>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

// Type declaration for externally-loaded CDN module (runtime dynamic import)
declare module "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js" {
    export class TubesCursor {
        constructor(canvas: HTMLCanvasElement, options?: any);
        updateColors(colors: any): void;
        dispose(): void;
        destroy(): void;
    }
    export default TubesCursor;
}

/**
 * 登录页 canvas 依赖 噪声库生命
 */
declare module 'perlin.js' {
  export default class Perlin {
    static seed(seed: number): void;
    static perlin3(x: number, y: number, z: number): number;
  }
}

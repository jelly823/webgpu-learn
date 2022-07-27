/*
 * @Author: ljl
 * @Date: 2022-07-27 11:22:50
 * @FilePath: /webgpu01/src/helper.ts
 * @Description: webgpu相关辅助函数
 */

/**
 * @description: 判断是否支持webgpu
 * @return {*}是否支持的字符串展示
 */
export const CheckWebGPU = () => {
    let result = 'Great! support WebGPU!';
    if (!navigator.gpu) {
        result = `Your browser dose not support WebGPU! Currently, WebGPU is supported in
         <a href='https://www.google.com/chrome/canary/'>Chrome canary v105</a> with the
         flag "#enable-unsafe-webgpu" enabled.`;
    }
    return result;
}
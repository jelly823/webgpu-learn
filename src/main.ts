/*
 * @Author: ljl
 * @Date: 2022-07-27 11:41:10
 * @FilePath: /webgpu01/src/main.ts
 * @Description: 入口
 */
import $ from 'jquery';
import { CheckWebGPU } from './helper';
import { Shaders } from './shader';

const CreateTriangle =async (color='(1.0, 1.0, 1.0, 1.0)') => {
    // 检查环境
    const checkgpu = CheckWebGPU();
    if(checkgpu.includes('not support WebGPU')){
        throw('not support WebGPU');
    }
    // 获取画布
    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;
    const context = canvas.getContext('webgpu') as GPUCanvasContext;
    // 获取可以被js控制的webgpu逻辑实例
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
    const device = await adapter?.requestDevice() as GPUDevice;
    // 颜色格式
    const format = navigator.gpu.getPreferredCanvasFormat(); // const format = 'bgra8unorm';
    // const format = context.getPreferredFormat(adapter); // 报错：Calling getPreferredFormat() on a GPUCanvasContext is deprecated and will soon be removed. Call navigator.gpu.getPreferredCanvasFormat() instead, which no longer requires an adapter.
    
    context.configure({
        device: device,
        format: format,
        alphaMode: 'opaque' // 不加报错：The default GPUCanvasAlphaMode will change from "premultiplied" to "opaque". Please explicitly set alphaMode to "premultiplied" if you would like to continue using that compositing mode.
    });

    const shader = Shaders(color);
    // 配置渲染管线
    const pipeline = await device.createRenderPipelineAsync({
        layout: 'auto', // 这里不加 layout: 'auto' 会报错
        vertex: {
            module: device.createShaderModule({
                code: shader.vertex
            }),
            entryPoint: 'main'
        },
        fragment: {
            module: device.createShaderModule({
                code: shader.fragment
            }),
            entryPoint: 'main',
            targets: [{
                format: format as GPUTextureFormat
            }]
        },
        primitive:{
            topology: "triangle-list",
        }
    });
    // 创建、提交命令
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            clearValue: { r: 0.5, g: 0.5, b: 0.8, a: 1.0 }, // background color 从loadColor变为clearColor
            loadOp: 'clear',
            storeOp: 'store'
        }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.draw(3, 1, 0, 0);
    renderPass.end(); // 从endPass 变为end

    device.queue.submit([commandEncoder.finish()]);
}

CreateTriangle();
$('#id-btn').on('click', ()=>{
    const color = $('#id-color').val() as string;
    CreateTriangle(color);
});
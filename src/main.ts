/*
 * @Author: ljl
 * @Date: 2022-07-27 11:41:10
 * @FilePath: /webgpu01/src/main.ts
 * @Description: 入口
 */
import $ from 'jquery';
import { CheckWebGPU } from './helper';

$('#id-gpu-check').html(CheckWebGPU())
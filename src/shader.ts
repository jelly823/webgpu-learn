/*
 * @Author: jelly823
 * @Date: 2022-07-27 20:30:16
 * @FilePath: /webgpu01/src/shader.ts
 * @Description: 着色器：顶点着色器、片元着色器，（此处涉及到一些WGSL语法可忽略）
 */

// export const Shaders = (color:string) => {
//     const vertex = `
//         [[stage(vertex)]]
//         fn main([[builtin(vertex_index)]] VertexIndex: u32) -> [[builtin(position)]] vec4<f32> {
//             var pos = array<vec2<f32>, 3>(
//                 vec2<f32>(0.0, 0.5),
//                 vec2<f32>(-0.5, -0.5),
//                 vec2<f32>(0.5, -0.5));
//             return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
//         }
//     `;

//     const fragment = `
//         [[stage(fragment)]]
//         fn main() -> [[location(0)]] vec4<f32> {
//             return vec4<f32>${color};
//         }
//     `;
//     return {vertex, fragment};
// }

export const Shaders = (color: string) => {
    const vertex = `
        @vertex
        fn main(@builtin(vertex_index) VertexIndex : u32) -> @builtin(position) vec4<f32> {
            var pos = array<vec2<f32>, 3>(
                vec2<f32>(0.0, 0.5),
                vec2<f32>(-0.5, -0.5),
                vec2<f32>(0.5, -0.5)
            );
            return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
        }
    `;
    const fragment = `
        @group(0) @binding(0) var<uniform> color : vec4<f32>;

        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>${color};
        }
    `;
    return { vertex, fragment };
}
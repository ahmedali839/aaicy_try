// "use client";

// import React, { useEffect, useRef } from "react";
// import { useTheme } from "next-themes";

// export default function FlowithFooter() {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const { theme, resolvedTheme } = useTheme();

//   useEffect(() => {
//     if (!containerRef.current || !canvasRef.current) return;
//     const currentTheme = resolvedTheme || theme || "dark";

//     class FluidSimulation {
//       constructor(canvas, container, themeMode) {
//         this.canvas = canvas;
//         this.container = container;
//         this.themeMode = themeMode;
//         this.init();
//       }

//       init() {
//         const gl = this.canvas.getContext("webgl", {
//           alpha: true,
//           premultipliedAlpha: false,
//           antialias: true,
//           preserveDrawingBuffer: false,
//         });

//         if (!gl) {
//           console.warn("WebGL not supported");
//           return;
//         }

//         const ext = gl.getExtension("OES_texture_float");
//         if (!ext) {
//           console.warn("OES_texture_float not supported");
//           return;
//         }

//         this.gl = gl;

//         this.params = {
//           cursorSize: 2,
//           cursorPower: 50,
//           distortionPower: 0.6,
//           spreadSpeed: 1.0,
//         };

//         this.pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false };
//         this.isVisible = true;
//         this.isRendering = true;

//         this.resizeCanvas();
//         this.createShaders();
//         this.initFBOs();
//         this.loadTexture();
//         this.setupEvents();
//         this.render();
//       }

//       resizeCanvas() {
//         const rect = this.container.getBoundingClientRect();
//         const dpr = Math.min(window.devicePixelRatio || 1, 2);

//         this.canvas.width = rect.width * dpr;
//         this.canvas.height = rect.height * dpr;
//         this.canvas.style.width = rect.width + "px";
//         this.canvas.style.height = rect.height + "px";

//         this.dpr = dpr;

//         const ratio = rect.width / rect.height;
//         this.res = {
//           w: Math.max(512 * ratio, rect.width * dpr * 0.5),
//           h: Math.max(512, rect.height * dpr * 0.5),
//         };
//       }

//       createShader(sourceCode, type) {
//         const gl = this.gl;
//         const shader = gl.createShader(type);
//         gl.shaderSource(shader, sourceCode);
//         gl.compileShader(shader);
//         if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//           console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//           return null;
//         }
//         return shader;
//       }

//       createProgram(fragSource) {
//         const gl = this.gl;
//         const vertSource = `
//           precision highp float;
//           varying vec2 vUv;
//           attribute vec2 a_position;
//           varying vec2 vL;
//           varying vec2 vR;
//           varying vec2 vT;
//           varying vec2 vB;
//           uniform vec2 u_texel;
//           void main () {
//             vUv = .5 * (a_position + 1.);
//             vL = vUv - vec2(u_texel.x, 0.);
//             vR = vUv + vec2(u_texel.x, 0.);
//             vT = vUv + vec2(0., u_texel.y);
//             vB = vUv - vec2(0., u_texel.y);
//             gl_Position = vec4(a_position, 0., 1.);
//           }
//         `;

//         const vertShader = this.createShader(vertSource, gl.VERTEX_SHADER);
//         const fragShader = this.createShader(fragSource, gl.FRAGMENT_SHADER);

//         const program = gl.createProgram();
//         gl.attachShader(program, vertShader);
//         gl.attachShader(program, fragShader);
//         gl.linkProgram(program);

//         const uniforms = {};
//         const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
//         for (let i = 0; i < uniformCount; i++) {
//           const name = gl.getActiveUniform(program, i).name;
//           uniforms[name] = gl.getUniformLocation(program, name);
//         }
//         return { program, uniforms };
//       }

//       createShaders() {
//         const isDark = this.themeMode === "dark";
//         const backgroundColor = isDark ? "vec4(0.03, 0.03, 0.04, 1.0)" : "vec4(0.965, 0.969, 0.973, 1.0)";

//         this.splatProgram = this.createProgram(`
//           precision highp float;
//           precision highp sampler2D;
//           varying vec2 vUv;
//           uniform sampler2D u_input_texture;
//           uniform float u_ratio;
//           uniform vec3 u_point_value;
//           uniform vec2 u_point;
//           uniform float u_point_size;
//           void main () {
//             vec2 p = vUv - u_point.xy;
//             p.x *= u_ratio;
//             vec3 splat = .6 * pow(2., -dot(p, p) / u_point_size) * u_point_value;
//             vec3 base = texture2D(u_input_texture, vUv).xyz;
//             gl_FragColor = vec4(base + splat, 1.);
//           }
//         `);

//         this.divergenceProgram = this.createProgram(`
//           precision highp float;
//           precision highp sampler2D;
//           varying highp vec2 vUv;
//           varying highp vec2 vL;
//           varying highp vec2 vR;
//           varying highp vec2 vT;
//           varying highp vec2 vB;
//           uniform sampler2D u_velocity_texture;
//           void main () {
//             float L = texture2D(u_velocity_texture, vL).x;
//             float R = texture2D(u_velocity_texture, vR).x;
//             float T = texture2D(u_velocity_texture, vT).y;
//             float B = texture2D(u_velocity_texture, vB).y;
//             float div = .25 * (R - L + T - B);
//             gl_FragColor = vec4(div, 0., 0., 1.);
//           }
//         `);

//         this.pressureProgram = this.createProgram(`
//           precision highp float;
//           precision highp sampler2D;
//           varying highp vec2 vUv;
//           varying highp vec2 vL;
//           varying highp vec2 vR;
//           varying highp vec2 vT;
//           varying highp vec2 vB;
//           uniform sampler2D u_pressure_texture;
//           uniform sampler2D u_divergence_texture;
//           void main () {
//             float L = texture2D(u_pressure_texture, vL).x;
//             float R = texture2D(u_pressure_texture, vR).x;
//             float T = texture2D(u_pressure_texture, vT).x;
//             float B = texture2D(u_pressure_texture, vB).x;
//             float divergence = texture2D(u_divergence_texture, vUv).x;
//             float pressure = (L + R + B + T - divergence) * .25;
//             gl_FragColor = vec4(pressure, 0., 0., 1.);
//           }
//         `);

//         this.gradientSubtractProgram = this.createProgram(`
//           precision highp float;
//           precision highp sampler2D;
//           varying highp vec2 vUv;
//           varying highp vec2 vL;
//           varying highp vec2 vR;
//           varying highp vec2 vT;
//           varying highp vec2 vB;
//           uniform sampler2D u_pressure_texture;
//           uniform sampler2D u_velocity_texture;
//           void main () {
//             float L = texture2D(u_pressure_texture, vL).x;
//             float R = texture2D(u_pressure_texture, vR).x;
//             float T = texture2D(u_pressure_texture, vT).x;
//             float B = texture2D(u_pressure_texture, vB).x;
//             vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
//             velocity.xy -= vec2(R - L, T - B);
//             gl_FragColor = vec4(velocity, 0., 1.);
//           }
//         `);

//         this.advectionProgram = this.createProgram(`
//           precision highp float;
//           precision highp sampler2D;
//           varying vec2 vUv;
//           uniform sampler2D u_velocity_texture;
//           uniform sampler2D u_input_texture;
//           uniform vec2 u_texel;
//           uniform vec2 u_output_textel;
//           uniform float u_dt;
//           uniform float u_dissipation;

//           vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
//             vec2 st = uv / tsize - 0.5;
//             vec2 iuv = floor(st);
//             vec2 fuv = fract(st);
//             vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
//             vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
//             vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
//             vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
//             return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
//           }

//           void main () {
//             vec2 coord = vUv - u_dt * bilerp(u_velocity_texture, vUv, u_texel).xy * u_texel;
//             vec4 velocity = bilerp(u_input_texture, coord, u_output_textel);
//             gl_FragColor = u_dissipation * velocity;
//           }
//         `);

//         this.displayProgram = this.createProgram(`
//           precision highp float;
//           precision highp sampler2D;
//           varying vec2 vUv;
//           uniform float u_ratio;
//           uniform float u_disturb_power;
//           uniform sampler2D u_output_texture;
//           uniform sampler2D u_velocity_texture;
//           uniform sampler2D u_text_texture;

//           void main () {
//             float offset = texture2D(u_output_texture, vUv).r;
//             vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
//             velocity += .001;

//             vec2 img_uv = vUv;
//             img_uv -= u_disturb_power * normalize(velocity) * offset;
//             img_uv -= u_disturb_power * normalize(velocity) * offset;

//             vec4 bgColor = ${backgroundColor};

//             if (img_uv.x < 0.0 || img_uv.x > 1.0 || img_uv.y < 0.0 || img_uv.y > 1.0) {
//               gl_FragColor = bgColor;
//             } else {
//               vec4 img = texture2D(u_text_texture, vec2(img_uv.x, 1. - img_uv.y));
//               gl_FragColor = img;
//             }
//           }
//         `);
//       }

//       createFBO(w, h) {
//         const gl = this.gl;
//         gl.activeTexture(gl.TEXTURE0);
//         const texture = gl.createTexture();
//         gl.bindTexture(gl.TEXTURE_2D, texture);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.FLOAT, null);

//         const fbo = gl.createFramebuffer();
//         gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
//         gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
//         gl.viewport(0, 0, w, h);
//         gl.clear(gl.COLOR_BUFFER_BIT);

//         return {
//           fbo,
//           texture,
//           width: w,
//           height: h,
//           attach: (id) => {
//             gl.activeTexture(gl.TEXTURE0 + id);
//             gl.bindTexture(gl.TEXTURE_2D, texture);
//             return id;
//           },
//         };
//       }

//       createDoubleFBO(w, h) {
//         let fbo1 = this.createFBO(w, h);
//         let fbo2 = this.createFBO(w, h);
//         return {
//           width: w,
//           height: h,
//           texelSizeX: 1 / w,
//           texelSizeY: 1 / h,
//           read: () => fbo1,
//           write: () => fbo2,
//           swap: () => {
//             [fbo1, fbo2] = [fbo2, fbo1];
//           },
//         };
//       }

//       initFBOs() {
//         const w = Math.floor(this.res.w);
//         const h = Math.floor(this.res.h);
//         this.outputColor = this.createDoubleFBO(w, h);
//         this.velocity = this.createDoubleFBO(w, h);
//         this.divergence = this.createFBO(w, h);
//         this.pressure = this.createDoubleFBO(w, h);
//       }

//       loadTexture() {
//         const gl = this.gl;
//         const scale = Math.min(window.devicePixelRatio || 1, 2) * 2;
//         const texWidth = Math.min(this.canvas.width * scale, 4096);
//         const texHeight = Math.min(this.canvas.height * scale, 4096);
//         const isDark = this.themeMode === "dark";
//         const background = isDark ? "#08090b" : "#F6F7F8";
//         const textColor = isDark ? "#ffffff" : "#000000";

//         const offscreen = document.createElement("canvas");
//         offscreen.width = texWidth;
//         offscreen.height = texHeight;
//         const ctx = offscreen.getContext("2d");

//         ctx.fillStyle = background;
//         ctx.fillRect(0, 0, texWidth, texHeight);

//         ctx.fillStyle = textColor;
//         ctx.font = `bold ${texHeight * 0.4}px system-ui, -apple-system, sans-serif`;
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText("AAICY", texWidth / 2, texHeight / 2);

//         this.imageTexture = gl.createTexture();
//         gl.bindTexture(gl.TEXTURE_2D, this.imageTexture);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);
//       }

//       setupEvents() {
//         this.handleMouseMove = (e) => {
//           const rect = this.container.getBoundingClientRect();
//           const x = e.clientX - rect.left;
//           const y = e.clientY - rect.top;

//           this.pointer.dx = 6 * (x - this.pointer.x);
//           this.pointer.dy = 6 * (y - this.pointer.y);
//           this.pointer.x = x;
//           this.pointer.y = y;
//           this.pointer.moved = true;
//         };

//         this.handleMouseLeave = () => {
//           this.pointer.moved = false;
//         };

//         this.container.addEventListener("mousemove", this.handleMouseMove);
//         this.container.addEventListener("mouseleave", this.handleMouseLeave);

//         this.handleResize = () => {
//           this.resizeCanvas();
//           this.initFBOs();
//           this.loadTexture();
//         };

//         window.addEventListener("resize", this.handleResize);
//         this.cleanup = () => {
//           window.removeEventListener("resize", this.handleResize);
//           this.container.removeEventListener("mousemove", this.handleMouseMove);
//           this.container.removeEventListener("mouseleave", this.handleMouseLeave);
//         };
//       }

//       blit(target) {
//         const gl = this.gl;
//         const buffer = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//         gl.bufferData(
//           gl.ARRAY_BUFFER,
//           new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
//           gl.STATIC_DRAW
//         );

//         const indexBuffer = gl.createBuffer();
//         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
//         gl.bufferData(
//           gl.ELEMENT_ARRAY_BUFFER,
//           new Uint16Array([0, 1, 2, 0, 2, 3]),
//           gl.STATIC_DRAW
//         );

//         gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
//         gl.enableVertexAttribArray(0);

//         if (target == null) {
//           gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
//           gl.bindFramebuffer(gl.FRAMEBUFFER, null);
//         } else {
//           gl.viewport(0, 0, target.width, target.height);
//           gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
//         }

//         gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
//       }

//       render() {
//         if (!this.isRendering) return;
//         if (!this.imageTexture) {
//           this.animationFrame = requestAnimationFrame(() => this.render());
//           return;
//         }

//         const gl = this.gl;
//         const dt = 1 / 60;
//         const canvasWidth = this.canvas.width;
//         const canvasHeight = this.canvas.height;
//         const dpr = this.dpr || 1;
//         const cssWidth = canvasWidth / dpr;
//         const cssHeight = canvasHeight / dpr;

//         if (this.pointer.moved) {
//           gl.useProgram(this.splatProgram.program);
//           gl.uniform1i(this.splatProgram.uniforms.u_input_texture, this.velocity.read().attach(1));
//           gl.uniform1f(this.splatProgram.uniforms.u_ratio, canvasWidth / canvasHeight);
//           gl.uniform2f(
//             this.splatProgram.uniforms.u_point,
//             this.pointer.x / cssWidth,
//             1 - this.pointer.y / cssHeight
//           );
//           gl.uniform3f(
//             this.splatProgram.uniforms.u_point_value,
//             this.pointer.dx,
//             -this.pointer.dy,
//             0
//           );
//           gl.uniform1f(this.splatProgram.uniforms.u_point_size, this.params.cursorSize * 0.001);
//           this.blit(this.velocity.write());
//           this.velocity.swap();

//           gl.uniform1i(this.splatProgram.uniforms.u_input_texture, this.outputColor.read().attach(1));
//           gl.uniform3f(this.splatProgram.uniforms.u_point_value, this.params.cursorPower * 0.001, 0, 0);
//           this.blit(this.outputColor.write());
//           this.outputColor.swap();
//         }

//         gl.useProgram(this.divergenceProgram.program);
//         gl.uniform2f(this.divergenceProgram.uniforms.u_texel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform1i(this.divergenceProgram.uniforms.u_velocity_texture, this.velocity.read().attach(1));
//         this.blit(this.divergence);

//         gl.useProgram(this.pressureProgram.program);
//         gl.uniform2f(this.pressureProgram.uniforms.u_texel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform1i(this.pressureProgram.uniforms.u_divergence_texture, this.divergence.attach(1));
//         for (let i = 0; i < 16; i++) {
//           gl.uniform1i(this.pressureProgram.uniforms.u_pressure_texture, this.pressure.read().attach(2));
//           this.blit(this.pressure.write());
//           this.pressure.swap();
//         }

//         gl.useProgram(this.gradientSubtractProgram.program);
//         gl.uniform2f(this.gradientSubtractProgram.uniforms.u_texel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform1i(this.gradientSubtractProgram.uniforms.u_pressure_texture, this.pressure.read().attach(1));
//         gl.uniform1i(this.gradientSubtractProgram.uniforms.u_velocity_texture, this.velocity.read().attach(2));
//         this.blit(this.velocity.write());
//         this.velocity.swap();

//         gl.useProgram(this.advectionProgram.program);
//         gl.uniform2f(this.advectionProgram.uniforms.u_texel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform2f(this.advectionProgram.uniforms.u_output_textel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform1i(this.advectionProgram.uniforms.u_velocity_texture, this.velocity.read().attach(1));
//         gl.uniform1i(this.advectionProgram.uniforms.u_input_texture, this.velocity.read().attach(1));
//         gl.uniform1f(this.advectionProgram.uniforms.u_dt, dt * this.params.spreadSpeed);
//         gl.uniform1f(this.advectionProgram.uniforms.u_dissipation, 0.97);
//         this.blit(this.velocity.write());
//         this.velocity.swap();

//         gl.useProgram(this.advectionProgram.program);
//         gl.uniform2f(this.advectionProgram.uniforms.u_output_textel, this.outputColor.texelSizeX, this.outputColor.texelSizeY);
//         gl.uniform1i(this.advectionProgram.uniforms.u_input_texture, this.outputColor.read().attach(2));
//         gl.uniform1f(this.advectionProgram.uniforms.u_dt, 8 * dt * this.params.spreadSpeed);
//         gl.uniform1f(this.advectionProgram.uniforms.u_dissipation, 0.98);
//         this.blit(this.outputColor.write());
//         this.outputColor.swap();

//         gl.useProgram(this.displayProgram.program);
//         gl.uniform1i(this.displayProgram.uniforms.u_velocity_texture, this.velocity.read().attach(2));
//         gl.uniform1f(this.displayProgram.uniforms.u_ratio, canvasWidth / canvasHeight);
//         gl.uniform1f(this.displayProgram.uniforms.u_disturb_power, this.params.distortionPower);
//         gl.uniform1i(this.displayProgram.uniforms.u_output_texture, this.outputColor.read().attach(1));

//         gl.activeTexture(gl.TEXTURE3);
//         gl.bindTexture(gl.TEXTURE_2D, this.imageTexture);
//         gl.uniform1i(this.displayProgram.uniforms.u_text_texture, 3);

//         this.blit(null);

//         this.animationFrame = requestAnimationFrame(() => this.render());
//       }
//     }

//     const sim = new FluidSimulation(canvasRef.current, containerRef.current, currentTheme);

//     return () => {
//       sim.isRendering = false;
//       if (sim.animationFrame) cancelAnimationFrame(sim.animationFrame);
//       if (sim.cleanup) sim.cleanup();
//     };
//   }, [theme, resolvedTheme]);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-[#F6F7F8] cursor-crosshair border-t border-gray-200"
//     >
//       <canvas
//         ref={canvasRef}
//         className="block w-full h-full"
//       />

//       {/* Footer copyright text */}
//       <div className="absolute bottom-8 text-sm text-gray-400 font-sans text-center w-full select-none z-10 pointer-events-none">
//         Copyright © 2026 Flowith Technologies Pte. Ltd. All rights reserved.
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useRef } from "react";
// import { useTheme } from "next-themes";

// export default function FlowithFooter() {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const { theme, resolvedTheme } = useTheme();

//   useEffect(() => {
//     if (!containerRef.current || !canvasRef.current) return;
//     const currentTheme = resolvedTheme || theme || "dark";

//     class FluidSimulation {
//       constructor(canvas, container, themeMode) {
//         this.canvas = canvas;
//         this.container = container;
//         this.themeMode = themeMode;
//         // Optimization: Reduce pressure iterations for better performance on lower-end devices
//         this.pressureIterations = 8;
//         this.init();
//       }

//       init() {
//         const gl = this.canvas.getContext("webgl", {
//           alpha: true,
//           premultipliedAlpha: false,
//           antialias: false, // Optimization: Disabled antialiasing for FBO operations
//           preserveDrawingBuffer: false,
//         });

//         if (!gl) return console.warn("WebGL not supported");
//         if (!gl.getExtension("OES_texture_float")) return console.warn("OES_texture_float not supported");

//         this.gl = gl;

//         this.params = {
//           cursorSize: 2,
//           cursorPower: 50,
//           distortionPower: 0.6,
//           spreadSpeed: 1.0,
//         };

//         this.pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false };
//         this.isVisible = true;
//         this.isRendering = true;

//         this.initGeometry(); // Create buffers ONCE
//         this.resizeCanvas();
//         this.createShaders();
//         this.initFBOs();
//         this.loadTexture();
//         this.setupEvents();
//         this.render();
//       }

//       // 🚀 FIX 1: Initialize Buffers only ONCE
//       initGeometry() {
//         const gl = this.gl;
//         this.vertexBuffer = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
//         gl.bufferData(
//           gl.ARRAY_BUFFER,
//           new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
//           gl.STATIC_DRAW
//         );

//         this.indexBuffer = gl.createBuffer();
//         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
//         gl.bufferData(
//           gl.ELEMENT_ARRAY_BUFFER,
//           new Uint16Array([0, 1, 2, 0, 2, 3]),
//           gl.STATIC_DRAW
//         );
//       }

//       resizeCanvas() {
//         const rect = this.container.getBoundingClientRect();
//         // Optimization: Clamp DPR to prevent mobile GPUs from choking on massive FBOs
//         const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

//         this.canvas.width = rect.width * dpr;
//         this.canvas.height = rect.height * dpr;
//         this.canvas.style.width = rect.width + "px";
//         this.canvas.style.height = rect.height + "px";

//         this.dpr = dpr;

//         const ratio = rect.width / rect.height;
//         this.res = {
//           w: Math.max(256 * ratio, rect.width * dpr * 0.5), // Scaled down slightly for performance
//           h: Math.max(256, rect.height * dpr * 0.5),
//         };
//       }

//       createShader(sourceCode, type) {
//         const gl = this.gl;
//         const shader = gl.createShader(type);
//         gl.shaderSource(shader, sourceCode);
//         gl.compileShader(shader);
//         if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//           console.error("Shader compile error:", gl.getShaderInfoLog(shader));
//           return null;
//         }
//         return shader;
//       }

//       createProgram(fragSource) {
//         const gl = this.gl;
//         const vertSource = `
//           precision highp float;
//           varying vec2 vUv;
//           attribute vec2 a_position;
//           varying vec2 vL;
//           varying vec2 vR;
//           varying vec2 vT;
//           varying vec2 vB;
//           uniform vec2 u_texel;
//           void main () {
//             vUv = .5 * (a_position + 1.);
//             vL = vUv - vec2(u_texel.x, 0.);
//             vR = vUv + vec2(u_texel.x, 0.);
//             vT = vUv + vec2(0., u_texel.y);
//             vB = vUv - vec2(0., u_texel.y);
//             gl_Position = vec4(a_position, 0., 1.);
//           }
//         `;

//         const vertShader = this.createShader(vertSource, gl.VERTEX_SHADER);
//         const fragShader = this.createShader(fragSource, gl.FRAGMENT_SHADER);

//         const program = gl.createProgram();
//         gl.attachShader(program, vertShader);
//         gl.attachShader(program, fragShader);
//         gl.linkProgram(program);

//         const uniforms = {};
//         const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
//         for (let i = 0; i < uniformCount; i++) {
//           const name = gl.getActiveUniform(program, i).name;
//           uniforms[name] = gl.getUniformLocation(program, name);
//         }

//         // Clean up shaders after linking to save memory
//         gl.deleteShader(vertShader);
//         gl.deleteShader(fragShader);

//         return { program, uniforms };
//       }

//       createShaders() {
//         const isDark = this.themeMode === "dark";
//         const backgroundColor = isDark ? "vec4(0.03, 0.03, 0.04, 1.0)" : "vec4(0.965, 0.969, 0.973, 1.0)";

//         // (Shader definitions remain the same, combined here for brevity)
//         this.splatProgram = this.createProgram(`
//           precision highp float; precision highp sampler2D; varying vec2 vUv;
//           uniform sampler2D u_input_texture; uniform float u_ratio; uniform vec3 u_point_value;
//           uniform vec2 u_point; uniform float u_point_size;
//           void main () {
//             vec2 p = vUv - u_point.xy; p.x *= u_ratio;
//             vec3 splat = .6 * pow(2., -dot(p, p) / u_point_size) * u_point_value;
//             vec3 base = texture2D(u_input_texture, vUv).xyz;
//             gl_FragColor = vec4(base + splat, 1.);
//           }`);

//         this.divergenceProgram = this.createProgram(`
//           precision highp float; precision highp sampler2D; varying highp vec2 vUv;
//           varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
//           uniform sampler2D u_velocity_texture;
//           void main () {
//             float L = texture2D(u_velocity_texture, vL).x; float R = texture2D(u_velocity_texture, vR).x;
//             float T = texture2D(u_velocity_texture, vT).y; float B = texture2D(u_velocity_texture, vB).y;
//             float div = .25 * (R - L + T - B); gl_FragColor = vec4(div, 0., 0., 1.);
//           }`);

//         this.pressureProgram = this.createProgram(`
//           precision highp float; precision highp sampler2D; varying highp vec2 vUv;
//           varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
//           uniform sampler2D u_pressure_texture; uniform sampler2D u_divergence_texture;
//           void main () {
//             float L = texture2D(u_pressure_texture, vL).x; float R = texture2D(u_pressure_texture, vR).x;
//             float T = texture2D(u_pressure_texture, vT).x; float B = texture2D(u_pressure_texture, vB).x;
//             float divergence = texture2D(u_divergence_texture, vUv).x;
//             float pressure = (L + R + B + T - divergence) * .25; gl_FragColor = vec4(pressure, 0., 0., 1.);
//           }`);

//         this.gradientSubtractProgram = this.createProgram(`
//           precision highp float; precision highp sampler2D; varying highp vec2 vUv;
//           varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
//           uniform sampler2D u_pressure_texture; uniform sampler2D u_velocity_texture;
//           void main () {
//             float L = texture2D(u_pressure_texture, vL).x; float R = texture2D(u_pressure_texture, vR).x;
//             float T = texture2D(u_pressure_texture, vT).x; float B = texture2D(u_pressure_texture, vB).x;
//             vec2 velocity = texture2D(u_velocity_texture, vUv).xy; velocity.xy -= vec2(R - L, T - B);
//             gl_FragColor = vec4(velocity, 0., 1.);
//           }`);

//         this.advectionProgram = this.createProgram(`
//           precision highp float; precision highp sampler2D; varying vec2 vUv;
//           uniform sampler2D u_velocity_texture; uniform sampler2D u_input_texture;
//           uniform vec2 u_texel; uniform vec2 u_output_textel; uniform float u_dt; uniform float u_dissipation;
//           vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
//             vec2 st = uv / tsize - 0.5; vec2 iuv = floor(st); vec2 fuv = fract(st);
//             vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize); vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
//             vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize); vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
//             return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
//           }
//           void main () {
//             vec2 coord = vUv - u_dt * bilerp(u_velocity_texture, vUv, u_texel).xy * u_texel;
//             vec4 velocity = bilerp(u_input_texture, coord, u_output_textel); gl_FragColor = u_dissipation * velocity;
//           }`);

//         this.displayProgram = this.createProgram(`
//           precision highp float; precision highp sampler2D; varying vec2 vUv;
//           uniform float u_ratio; uniform float u_disturb_power; uniform sampler2D u_output_texture;
//           uniform sampler2D u_velocity_texture; uniform sampler2D u_text_texture;
//           void main () {
//             float offset = texture2D(u_output_texture, vUv).r; vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
//             velocity += .001; vec2 img_uv = vUv;
//             img_uv -= u_disturb_power * normalize(velocity) * offset; img_uv -= u_disturb_power * normalize(velocity) * offset;
//             vec4 bgColor = ${backgroundColor};
//             if (img_uv.x < 0.0 || img_uv.x > 1.0 || img_uv.y < 0.0 || img_uv.y > 1.0) { gl_FragColor = bgColor; }
//             else { vec4 img = texture2D(u_text_texture, vec2(img_uv.x, 1. - img_uv.y)); gl_FragColor = img; }
//           }`);
//       }

//       createFBO(w, h) {
//         const gl = this.gl;
//         gl.activeTexture(gl.TEXTURE0);
//         const texture = gl.createTexture();
//         gl.bindTexture(gl.TEXTURE_2D, texture);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.FLOAT, null);

//         const fbo = gl.createFramebuffer();
//         gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
//         gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
//         gl.viewport(0, 0, w, h);
//         gl.clear(gl.COLOR_BUFFER_BIT);

//         return {
//           fbo, texture, width: w, height: h,
//           attach: (id) => {
//             gl.activeTexture(gl.TEXTURE0 + id);
//             gl.bindTexture(gl.TEXTURE_2D, texture);
//             return id;
//           },
//         };
//       }

//       createDoubleFBO(w, h) {
//         let fbo1 = this.createFBO(w, h);
//         let fbo2 = this.createFBO(w, h);
//         return {
//           width: w, height: h, texelSizeX: 1 / w, texelSizeY: 1 / h,
//           read: () => fbo1, write: () => fbo2,
//           swap: () => { [fbo1, fbo2] = [fbo2, fbo1]; },
//         };
//       }

//       initFBOs() {
//         const w = Math.floor(this.res.w);
//         const h = Math.floor(this.res.h);
//         this.outputColor = this.createDoubleFBO(w, h);
//         this.velocity = this.createDoubleFBO(w, h);
//         this.divergence = this.createFBO(w, h);
//         this.pressure = this.createDoubleFBO(w, h);
//       }

//       loadTexture() {
//         const gl = this.gl;
//         const scale = Math.min(window.devicePixelRatio || 1, 2) * 2;
//         const texWidth = Math.min(this.canvas.width * scale, 2048); // Clamped texture size
//         const texHeight = Math.min(this.canvas.height * scale, 2048);
//         const isDark = this.themeMode === "dark";
//         const background = isDark ? "#08090b" : "#F6F7F8";
//         const textColor = isDark ? "#ffffff" : "#000000";

//         const offscreen = document.createElement("canvas");
//         offscreen.width = texWidth; offscreen.height = texHeight;
//         const ctx = offscreen.getContext("2d", { willReadFrequently: true });

//         ctx.fillStyle = background;
//         ctx.fillRect(0, 0, texWidth, texHeight);
//         ctx.fillStyle = textColor;
//         ctx.font = `bold ${texHeight * 0.4}px system-ui, -apple-system, sans-serif`;
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText("AAICY", texWidth / 2, texHeight / 2);

//         if (this.imageTexture) gl.deleteTexture(this.imageTexture); // Prevent leak on resize
//         this.imageTexture = gl.createTexture();
//         gl.bindTexture(gl.TEXTURE_2D, this.imageTexture);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);
//       }

//       setupEvents() {
//         this.handleMouseMove = (e) => {
//           const rect = this.container.getBoundingClientRect();
//           const x = e.clientX - rect.left; const y = e.clientY - rect.top;
//           this.pointer.dx = 6 * (x - this.pointer.x); this.pointer.dy = 6 * (y - this.pointer.y);
//           this.pointer.x = x; this.pointer.y = y; this.pointer.moved = true;
//         };

//         this.handleMouseLeave = () => { this.pointer.moved = false; };

//         let resizeTimeout;
//         this.handleResize = () => {
//           clearTimeout(resizeTimeout);
//           resizeTimeout = setTimeout(() => {
//             this.resizeCanvas();
//             this.initFBOs();
//             this.loadTexture();
//           }, 150); // Debounce resize to prevent layout thrashing
//         };

//         this.container.addEventListener("mousemove", this.handleMouseMove, { passive: true });
//         this.container.addEventListener("mouseleave", this.handleMouseLeave, { passive: true });
//         window.addEventListener("resize", this.handleResize, { passive: true });

//         this.cleanup = () => {
//           window.removeEventListener("resize", this.handleResize);
//           this.container.removeEventListener("mousemove", this.handleMouseMove);
//           this.container.removeEventListener("mouseleave", this.handleMouseLeave);
//         };
//       }

//       // 🚀 FIX 2: Blit function now re-uses buffers perfectly
//       blit(target) {
//         const gl = this.gl;

//         gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
//         gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
//         gl.enableVertexAttribArray(0);

//         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

//         if (target == null) {
//           gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
//           gl.bindFramebuffer(gl.FRAMEBUFFER, null);
//         } else {
//           gl.viewport(0, 0, target.width, target.height);
//           gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
//         }

//         gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
//       }

//       render() {
//         if (!this.isRendering) return;
//         if (!this.imageTexture) {
//           this.animationFrame = requestAnimationFrame(this.render.bind(this));
//           return;
//         }

//         const gl = this.gl;
//         const dt = 1 / 60; // Assuming 60fps delta
//         const canvasWidth = this.canvas.width;
//         const canvasHeight = this.canvas.height;
//         const dpr = this.dpr || 1;
//         const cssWidth = canvasWidth / dpr;
//         const cssHeight = canvasHeight / dpr;

//         if (this.pointer.moved) {
//           gl.useProgram(this.splatProgram.program);
//           gl.uniform1i(this.splatProgram.uniforms.u_input_texture, this.velocity.read().attach(1));
//           gl.uniform1f(this.splatProgram.uniforms.u_ratio, canvasWidth / canvasHeight);
//           gl.uniform2f(this.splatProgram.uniforms.u_point, this.pointer.x / cssWidth, 1 - this.pointer.y / cssHeight);
//           gl.uniform3f(this.splatProgram.uniforms.u_point_value, this.pointer.dx, -this.pointer.dy, 0);
//           gl.uniform1f(this.splatProgram.uniforms.u_point_size, this.params.cursorSize * 0.001);
//           this.blit(this.velocity.write());
//           this.velocity.swap();

//           gl.uniform1i(this.splatProgram.uniforms.u_input_texture, this.outputColor.read().attach(1));
//           gl.uniform3f(this.splatProgram.uniforms.u_point_value, this.params.cursorPower * 0.001, 0, 0);
//           this.blit(this.outputColor.write());
//           this.outputColor.swap();
//         }

//         gl.useProgram(this.divergenceProgram.program);
//         gl.uniform2f(this.divergenceProgram.uniforms.u_texel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform1i(this.divergenceProgram.uniforms.u_velocity_texture, this.velocity.read().attach(1));
//         this.blit(this.divergence);

//         gl.useProgram(this.pressureProgram.program);
//         gl.uniform2f(this.pressureProgram.uniforms.u_texel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform1i(this.pressureProgram.uniforms.u_divergence_texture, this.divergence.attach(1));

//         // Optimization: Reduced iterations from 16 to this.pressureIterations (8)
//         for (let i = 0; i < this.pressureIterations; i++) {
//           gl.uniform1i(this.pressureProgram.uniforms.u_pressure_texture, this.pressure.read().attach(2));
//           this.blit(this.pressure.write());
//           this.pressure.swap();
//         }

//         gl.useProgram(this.gradientSubtractProgram.program);
//         gl.uniform2f(this.gradientSubtractProgram.uniforms.u_texel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform1i(this.gradientSubtractProgram.uniforms.u_pressure_texture, this.pressure.read().attach(1));
//         gl.uniform1i(this.gradientSubtractProgram.uniforms.u_velocity_texture, this.velocity.read().attach(2));
//         this.blit(this.velocity.write());
//         this.velocity.swap();

//         gl.useProgram(this.advectionProgram.program);
//         gl.uniform2f(this.advectionProgram.uniforms.u_texel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform2f(this.advectionProgram.uniforms.u_output_textel, this.velocity.texelSizeX, this.velocity.texelSizeY);
//         gl.uniform1i(this.advectionProgram.uniforms.u_velocity_texture, this.velocity.read().attach(1));
//         gl.uniform1i(this.advectionProgram.uniforms.u_input_texture, this.velocity.read().attach(1));
//         gl.uniform1f(this.advectionProgram.uniforms.u_dt, dt * this.params.spreadSpeed);
//         gl.uniform1f(this.advectionProgram.uniforms.u_dissipation, 0.97);
//         this.blit(this.velocity.write());
//         this.velocity.swap();

//         gl.useProgram(this.advectionProgram.program);
//         gl.uniform2f(this.advectionProgram.uniforms.u_output_textel, this.outputColor.texelSizeX, this.outputColor.texelSizeY);
//         gl.uniform1i(this.advectionProgram.uniforms.u_input_texture, this.outputColor.read().attach(2));
//         gl.uniform1f(this.advectionProgram.uniforms.u_dt, 8 * dt * this.params.spreadSpeed);
//         gl.uniform1f(this.advectionProgram.uniforms.u_dissipation, 0.98);
//         this.blit(this.outputColor.write());
//         this.outputColor.swap();

//         gl.useProgram(this.displayProgram.program);
//         gl.uniform1i(this.displayProgram.uniforms.u_velocity_texture, this.velocity.read().attach(2));
//         gl.uniform1f(this.displayProgram.uniforms.u_ratio, canvasWidth / canvasHeight);
//         gl.uniform1f(this.displayProgram.uniforms.u_disturb_power, this.params.distortionPower);
//         gl.uniform1i(this.displayProgram.uniforms.u_output_texture, this.outputColor.read().attach(1));

//         gl.activeTexture(gl.TEXTURE3);
//         gl.bindTexture(gl.TEXTURE_2D, this.imageTexture);
//         gl.uniform1i(this.displayProgram.uniforms.u_text_texture, 3);

//         this.blit(null);

//         this.animationFrame = requestAnimationFrame(this.render.bind(this));
//       }

//       // 🚀 FIX 3: Robust teardown sequence to release GPU memory
//       destroy() {
//         this.isRendering = false;
//         if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
//         if (this.cleanup) this.cleanup();

//         const gl = this.gl;
//         if (!gl) return;

//         // Release Buffers
//         if (this.vertexBuffer) gl.deleteBuffer(this.vertexBuffer);
//         if (this.indexBuffer) gl.deleteBuffer(this.indexBuffer);
//         if (this.imageTexture) gl.deleteTexture(this.imageTexture);

//         // Forcibly clear context to trigger immediate garbage collection
//         const ext = gl.getExtension('WEBGL_lose_context');
//         if (ext) ext.loseContext();
//       }
//     }

//     const sim = new FluidSimulation(canvasRef.current, containerRef.current, currentTheme);

//     return () => {
//       // Execute our new robust teardown on component unmount
//       sim.destroy();
//     };
//   }, [theme, resolvedTheme]);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-[#F6F7F8] dark:bg-[#08090b] cursor-crosshair border-t border-gray-200 dark:border-gray-800"
//     >
//       <canvas ref={canvasRef} className="block w-full h-full" />
//       <div className="absolute bottom-8 text-sm text-gray-400 font-sans text-center w-full select-none z-10 pointer-events-none">
//         Copyright © 2026 Flowith Technologies Pte. Ltd. All rights reserved.
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Reusable Social Icon Component
const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300 pointer-events-auto"
  >
    {children}
  </a>
);

console.log("Start REndering Water-Animations");


export default function FlowithFooter() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme, resolvedTheme } = useTheme();
  const simRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const currentTheme = resolvedTheme || theme || "dark";

    class FluidSimulation {
      constructor(canvas, container, themeMode) {
        this.canvas = canvas;
        this.container = container;
        this.themeMode = themeMode;
        this.pressureIterations = 8; // Kept at 8 for visual quality, safe with optimized FBOs

        // Tracking arrays for strict garbage collection
        this.glPrograms = [];
        this.glTextures = [];
        this.glFBOs = [];

        this.init();
      }

      init() {
        const gl = this.canvas.getContext("webgl", {
          alpha: true,
          premultipliedAlpha: false,
          antialias: false,
          preserveDrawingBuffer: false,
        });

        if (!gl) return console.warn("WebGL not supported");
        if (!gl.getExtension("OES_texture_float"))
          return console.warn("OES_texture_float not supported");

        this.gl = gl;

        this.params = {
          cursorSize: 2,
          cursorPower: 50,
          distortionPower: 0.6,
          spreadSpeed: 1.0,
        };

        this.pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false };
        this.isRendering = true;
        this.isVisible = false; // Start false, IntersectionObserver will flip this

        this.initGeometry();
        this.resizeCanvas();
        this.createShaders();
        this.initFBOs();
        this.loadTexture();
        this.setupEvents();

        // Initialize Intersection Observer to pause rendering when off-screen
        this.observer = new IntersectionObserver(
          (entries) => {
            this.isVisible = entries[0].isIntersecting;
            if (this.isVisible && this.isRendering && !this.animationFrame) {
              this.animationFrame = requestAnimationFrame(
                this.render.bind(this),
              );
            }
          },
          { threshold: 0.05 },
        );
        this.observer.observe(this.container);
      }

      initGeometry() {
        const gl = this.gl;
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
          gl.STATIC_DRAW,
        );

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(
          gl.ELEMENT_ARRAY_BUFFER,
          new Uint16Array([0, 1, 2, 0, 2, 3]),
          gl.STATIC_DRAW,
        );
      }

      resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        // Limit DPR to 1.5 to save GPU overhead on high-density displays
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + "px";
        this.canvas.style.height = rect.height + "px";
        this.dpr = dpr;

        const ratio = rect.width / rect.height;
        // Optimized internal resolution mapping
        this.res = {
          w: Math.max(128 * ratio, Math.min(rect.width * dpr * 0.35, 512)),
          h: Math.max(128, Math.min(rect.height * dpr * 0.35, 512)),
        };
      }

      createShader(sourceCode, type) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);
        return shader;
      }

      createProgram(fragSource) {
        const gl = this.gl;
        const vertSource = `
          precision highp float; varying vec2 vUv; attribute vec2 a_position;
          varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
          uniform vec2 u_texel;
          void main () {
            vUv = .5 * (a_position + 1.);
            vL = vUv - vec2(u_texel.x, 0.); vR = vUv + vec2(u_texel.x, 0.);
            vT = vUv + vec2(0., u_texel.y); vB = vUv - vec2(0., u_texel.y);
            gl_Position = vec4(a_position, 0., 1.);
          }
        `;
        const vertShader = this.createShader(vertSource, gl.VERTEX_SHADER);
        const fragShader = this.createShader(fragSource, gl.FRAGMENT_SHADER);
        const program = gl.createProgram();

        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        this.glPrograms.push(program); // Track for GC

        const uniforms = {};
        const uniformCount = gl.getProgramParameter(
          program,
          gl.ACTIVE_UNIFORMS,
        );
        for (let i = 0; i < uniformCount; i++) {
          const name = gl.getActiveUniform(program, i).name;
          uniforms[name] = gl.getUniformLocation(program, name);
        }

        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        return { program, uniforms };
      }

      createShaders() {
        const isDark = this.themeMode === "dark";
        const backgroundColor = "vec4(0.22, 0.74, 0.96, 1.0)"; // Sky blue in GLSL vec4
        // const backgroundColor = isDark
        // ? "vec4(0.03, 0.03, 0.04, 1.0)"
        //   : "vec4(0.965, 0.969, 0.973, 1.0)";

        this.splatProgram = this.createProgram(`
          precision highp float; precision highp sampler2D; varying vec2 vUv;
          uniform sampler2D u_input_texture; uniform float u_ratio; uniform vec3 u_point_value;
          uniform vec2 u_point; uniform float u_point_size;
          void main () {
            vec2 p = vUv - u_point.xy; p.x *= u_ratio;
            vec3 splat = .6 * pow(2., -dot(p, p) / u_point_size) * u_point_value;
            vec3 base = texture2D(u_input_texture, vUv).xyz; gl_FragColor = vec4(base + splat, 1.);
          }`);

        this.divergenceProgram = this.createProgram(`
          precision highp float; precision highp sampler2D; varying highp vec2 vUv;
          varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
          uniform sampler2D u_velocity_texture;
          void main () {
            float L = texture2D(u_velocity_texture, vL).x; float R = texture2D(u_velocity_texture, vR).x;
            float T = texture2D(u_velocity_texture, vT).y; float B = texture2D(u_velocity_texture, vB).y;
            float div = .25 * (R - L + T - B); gl_FragColor = vec4(div, 0., 0., 1.);
          }`);

        this.pressureProgram = this.createProgram(`
          precision highp float; precision highp sampler2D; varying highp vec2 vUv;
          varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
          uniform sampler2D u_pressure_texture; uniform sampler2D u_divergence_texture;
          void main () {
            float L = texture2D(u_pressure_texture, vL).x; float R = texture2D(u_pressure_texture, vR).x;
            float T = texture2D(u_pressure_texture, vT).x; float B = texture2D(u_pressure_texture, vB).x;
            float divergence = texture2D(u_divergence_texture, vUv).x;
            float pressure = (L + R + B + T - divergence) * .25; gl_FragColor = vec4(pressure, 0., 0., 1.);
          }`);

        this.gradientSubtractProgram = this.createProgram(`
          precision highp float; precision highp sampler2D; varying highp vec2 vUv;
          varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
          uniform sampler2D u_pressure_texture; uniform sampler2D u_velocity_texture;
          void main () {
            float L = texture2D(u_pressure_texture, vL).x; float R = texture2D(u_pressure_texture, vR).x;
            float T = texture2D(u_pressure_texture, vT).x; float B = texture2D(u_pressure_texture, vB).x;
            vec2 velocity = texture2D(u_velocity_texture, vUv).xy; velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0., 1.);
          }`);

        this.advectionProgram = this.createProgram(`
          precision highp float; precision highp sampler2D; varying vec2 vUv;
          uniform sampler2D u_velocity_texture; uniform sampler2D u_input_texture;
          uniform vec2 u_texel; uniform vec2 u_output_textel; uniform float u_dt; uniform float u_dissipation;
          vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5; vec2 iuv = floor(st); vec2 fuv = fract(st);
            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize); vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize); vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
          }
          void main () {
            vec2 coord = vUv - u_dt * bilerp(u_velocity_texture, vUv, u_texel).xy * u_texel;
            vec4 velocity = bilerp(u_input_texture, coord, u_output_textel); gl_FragColor = u_dissipation * velocity;
          }`);

        this.displayProgram = this.createProgram(`
          precision highp float; precision highp sampler2D; varying vec2 vUv;
          uniform float u_ratio; uniform float u_disturb_power; uniform sampler2D u_output_texture;
          uniform sampler2D u_velocity_texture; uniform sampler2D u_text_texture;
          void main () {
            float offset = texture2D(u_output_texture, vUv).r; vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
            velocity += .001; vec2 img_uv = vUv;
            img_uv -= u_disturb_power * normalize(velocity) * offset; img_uv -= u_disturb_power * normalize(velocity) * offset;
            vec4 bgColor = ${backgroundColor};
            if (img_uv.x < 0.0 || img_uv.x > 1.0 || img_uv.y < 0.0 || img_uv.y > 1.0) { gl_FragColor = bgColor; } 
            else { vec4 img = texture2D(u_text_texture, vec2(img_uv.x, 1. - img_uv.y)); gl_FragColor = img; }
          }`);
      }

      createFBO(w, h) {
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          w,
          h,
          0,
          gl.RGB,
          gl.FLOAT,
          null,
        );

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          texture,
          0,
        );
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);

        this.glTextures.push(texture); // Track for GC
        this.glFBOs.push(fbo); // Track for GC

        return {
          fbo,
          texture,
          width: w,
          height: h,
          attach: (id) => {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
          },
        };
      }

      createDoubleFBO(w, h) {
        let fbo1 = this.createFBO(w, h);
        let fbo2 = this.createFBO(w, h);
        return {
          width: w,
          height: h,
          texelSizeX: 1 / w,
          texelSizeY: 1 / h,
          read: () => fbo1,
          write: () => fbo2,
          swap: () => {
            [fbo1, fbo2] = [fbo2, fbo1];
          },
        };
      }

      initFBOs() {
        const w = Math.floor(this.res.w);
        const h = Math.floor(this.res.h);
        this.outputColor = this.createDoubleFBO(w, h);
        this.velocity = this.createDoubleFBO(w, h);
        this.divergence = this.createFBO(w, h);
        this.pressure = this.createDoubleFBO(w, h);
      }

      loadTexture() {
        const gl = this.gl;
        // Optimization: Capped maximum texture dimensions so resizing doesn't stall the GPU
        const texWidth = Math.min(this.canvas.width, 2048);
        const texHeight = Math.min(this.canvas.height, 1024);
        const isDark = this.themeMode === "dark";

        const background = isDark ? "#38bdf8" : "#F6F7F8";
        const textColor = isDark ? "#ffffff" : "#0f172a";
        // // for black and white uncomment below 2-lines + line 1210-1212
        // const background = isDark ? "#08090b" : "#F6F7F8";
        // const textColor = isDark
        //   ? "rgba(200, 200, 200, 0.85)"
        //   : "rgba(0, 0, 0, 0.4)";

        const offscreen = document.createElement("canvas");
        offscreen.width = texWidth;
        offscreen.height = texHeight;
        const ctx = offscreen.getContext("2d");

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, texWidth, texHeight);
        ctx.fillStyle = textColor;

        const fontSize = Math.min(texWidth * 0.18, texHeight * 0.6);
        ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("AAICY", texWidth / 2, texHeight / 2);

        if (this.imageTexture) gl.deleteTexture(this.imageTexture);
        this.imageTexture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, this.imageTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          offscreen,
        );
      }

      setupEvents() {
        this.handleMouseMove = (e) => {
          if (!this.isVisible) return; // Ignore tracking if off-screen
          const rect = this.container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          this.pointer.dx = 6 * (x - this.pointer.x);
          this.pointer.dy = 6 * (y - this.pointer.y);
          this.pointer.x = x;
          this.pointer.y = y;
          this.pointer.moved = true;
        };

        this.handleMouseLeave = () => {
          this.pointer.moved = false;
        };

        let resizeTimeout;
        this.handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            this.resizeCanvas();
            this.initFBOs();
            this.loadTexture();
          }, 250); // Increased debounce to prevent rapid texture re-allocations
        };

        this.container.addEventListener("mousemove", this.handleMouseMove, {
          passive: true,
        });
        this.container.addEventListener("mouseleave", this.handleMouseLeave, {
          passive: true,
        });
        window.addEventListener("resize", this.handleResize, { passive: true });

        this.cleanupEvents = () => {
          window.removeEventListener("resize", this.handleResize);
          this.container.removeEventListener("mousemove", this.handleMouseMove);
          this.container.removeEventListener(
            "mouseleave",
            this.handleMouseLeave,
          );
        };
      }

      blit(target) {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      }

      render() {
        // Core Fix: Stop rendering loop immediately if destroyed or off-screen
        if (!this.isRendering) return;
        if (!this.isVisible) {
          this.animationFrame = null;
          return;
        }

        if (!this.imageTexture) {
          this.animationFrame = requestAnimationFrame(this.render.bind(this));
          return;
        }

        const gl = this.gl;
        const dt = 1 / 60;
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const dpr = this.dpr || 1;
        const cssWidth = canvasWidth / dpr;
        const cssHeight = canvasHeight / dpr;

        if (this.pointer.moved) {
          gl.useProgram(this.splatProgram.program);
          gl.uniform1i(
            this.splatProgram.uniforms.u_input_texture,
            this.velocity.read().attach(1),
          );
          gl.uniform1f(
            this.splatProgram.uniforms.u_ratio,
            canvasWidth / canvasHeight,
          );
          gl.uniform2f(
            this.splatProgram.uniforms.u_point,
            this.pointer.x / cssWidth,
            1 - this.pointer.y / cssHeight,
          );
          gl.uniform3f(
            this.splatProgram.uniforms.u_point_value,
            this.pointer.dx,
            -this.pointer.dy,
            0,
          );
          gl.uniform1f(
            this.splatProgram.uniforms.u_point_size,
            this.params.cursorSize * 0.001,
          );
          this.blit(this.velocity.write());
          this.velocity.swap();

          gl.uniform1i(
            this.splatProgram.uniforms.u_input_texture,
            this.outputColor.read().attach(1),
          );
          gl.uniform3f(
            this.splatProgram.uniforms.u_point_value,
            this.params.cursorPower * 0.001,
            0,
            0,
          );
          this.blit(this.outputColor.write());
          this.outputColor.swap();
        }

        gl.useProgram(this.divergenceProgram.program);
        gl.uniform2f(
          this.divergenceProgram.uniforms.u_texel,
          this.velocity.texelSizeX,
          this.velocity.texelSizeY,
        );
        gl.uniform1i(
          this.divergenceProgram.uniforms.u_velocity_texture,
          this.velocity.read().attach(1),
        );
        this.blit(this.divergence);

        gl.useProgram(this.pressureProgram.program);
        gl.uniform2f(
          this.pressureProgram.uniforms.u_texel,
          this.velocity.texelSizeX,
          this.velocity.texelSizeY,
        );
        gl.uniform1i(
          this.pressureProgram.uniforms.u_divergence_texture,
          this.divergence.attach(1),
        );

        for (let i = 0; i < this.pressureIterations; i++) {
          gl.uniform1i(
            this.pressureProgram.uniforms.u_pressure_texture,
            this.pressure.read().attach(2),
          );
          this.blit(this.pressure.write());
          this.pressure.swap();
        }

        gl.useProgram(this.gradientSubtractProgram.program);
        gl.uniform2f(
          this.gradientSubtractProgram.uniforms.u_texel,
          this.velocity.texelSizeX,
          this.velocity.texelSizeY,
        );
        gl.uniform1i(
          this.gradientSubtractProgram.uniforms.u_pressure_texture,
          this.pressure.read().attach(1),
        );
        gl.uniform1i(
          this.gradientSubtractProgram.uniforms.u_velocity_texture,
          this.velocity.read().attach(2),
        );
        this.blit(this.velocity.write());
        this.velocity.swap();

        gl.useProgram(this.advectionProgram.program);
        gl.uniform2f(
          this.advectionProgram.uniforms.u_texel,
          this.velocity.texelSizeX,
          this.velocity.texelSizeY,
        );
        gl.uniform2f(
          this.advectionProgram.uniforms.u_output_textel,
          this.velocity.texelSizeX,
          this.velocity.texelSizeY,
        );
        gl.uniform1i(
          this.advectionProgram.uniforms.u_velocity_texture,
          this.velocity.read().attach(1),
        );
        gl.uniform1i(
          this.advectionProgram.uniforms.u_input_texture,
          this.velocity.read().attach(1),
        );
        gl.uniform1f(
          this.advectionProgram.uniforms.u_dt,
          dt * this.params.spreadSpeed,
        );
        gl.uniform1f(this.advectionProgram.uniforms.u_dissipation, 0.97);
        this.blit(this.velocity.write());
        this.velocity.swap();

        gl.useProgram(this.advectionProgram.program);
        gl.uniform2f(
          this.advectionProgram.uniforms.u_output_textel,
          this.outputColor.texelSizeX,
          this.outputColor.texelSizeY,
        );
        gl.uniform1i(
          this.advectionProgram.uniforms.u_input_texture,
          this.outputColor.read().attach(2),
        );
        gl.uniform1f(
          this.advectionProgram.uniforms.u_dt,
          8 * dt * this.params.spreadSpeed,
        );
        gl.uniform1f(this.advectionProgram.uniforms.u_dissipation, 0.98);
        this.blit(this.outputColor.write());
        this.outputColor.swap();

        gl.useProgram(this.displayProgram.program);
        gl.uniform1i(
          this.displayProgram.uniforms.u_velocity_texture,
          this.velocity.read().attach(2),
        );
        gl.uniform1f(
          this.displayProgram.uniforms.u_ratio,
          canvasWidth / canvasHeight,
        );
        gl.uniform1f(
          this.displayProgram.uniforms.u_disturb_power,
          this.params.distortionPower,
        );
        gl.uniform1i(
          this.displayProgram.uniforms.u_output_texture,
          this.outputColor.read().attach(1),
        );

        gl.activeTexture(gl.TEXTURE3);
        gl.bindTexture(gl.TEXTURE_2D, this.imageTexture);
        gl.uniform1i(this.displayProgram.uniforms.u_text_texture, 3);

        this.blit(null);
        this.animationFrame = requestAnimationFrame(this.render.bind(this));
      }

      destroy() {
        this.isRendering = false; // Kill loop instantly
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
        if (this.cleanupEvents) this.cleanupEvents();
        if (this.observer) this.observer.disconnect();

        const gl = this.gl;
        if (!gl) return;

        // CRUCIAL: Absolute Garbage Collection of all WebGL assets
        this.glPrograms.forEach((prog) => gl.deleteProgram(prog));
        this.glFBOs.forEach((fbo) => gl.deleteFramebuffer(fbo));
        this.glTextures.forEach((tex) => gl.deleteTexture(tex));

        if (this.vertexBuffer) gl.deleteBuffer(this.vertexBuffer);
        if (this.indexBuffer) gl.deleteBuffer(this.indexBuffer);
        if (this.imageTexture) gl.deleteTexture(this.imageTexture);

        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      }
    }

    // Prevents double instantiation leaks
    if (simRef.current) simRef.current.destroy();
    simRef.current = new FluidSimulation(
      canvasRef.current,
      containerRef.current,
      currentTheme,
    );

    return () => {
      if (simRef.current) {
        simRef.current.destroy();
        simRef.current = null;
      }
    };
  }, [theme, resolvedTheme]);
   // main return of the component
  return (
    <section className="w-full py-8 px-4 md:px-8 flex justify-center items-center">
    <div
      ref={containerRef}
      className="relative 
          w-[92%] max-w-7xl 
          mx-auto 
          h-[60vh] md:h-[70vh] 
          flex flex-col items-center justify-between 
          overflow-hidden 
          rounded-3xl md:rounded-[2.5rem] 
          bg-[#38bdf8] 
          shadow-xl 
          cursor-crosshair"
      // className="relative w-full h-[60vh] md:h-[70vh] flex flex-col items-center overflow-hidden bg-[#F6F7F8] dark:bg-[#08090b] cursor-crosshair border-t border-gray-200 dark:border-gray-800"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full z-0"
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pointer-events-none pt-12 pb-6 px-4">
        <div className="flex flex-col items-center max-w-2xl text-center space-y-4"></div>

        <div className="flex flex-col items-center space-y-6 w-full">
          <div className="flex gap-8 pointer-events-auto">
            <SocialIcon
              href="https://www.linkedin.com/company/aaicy"
              label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://youtube.com/@AiandCodewithYar"
              label="YouTube"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.769-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                  clipRule="evenodd"
                />
              </svg>
            </SocialIcon>

            <SocialIcon href="https://facebook.com" label="Facebook">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://www.instagram.com/aiandcodewithyar/"
              label="Instagram"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </SocialIcon>
          </div>

          <div className="text-xs md:text-sm text-gray-400 font-sans text-center w-full select-none">
            Copyright © 2026 Flowith Technologies Pte. Ltd. All rights reserved.
            Copyright © 2026 Flowith Technologies Pte. Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

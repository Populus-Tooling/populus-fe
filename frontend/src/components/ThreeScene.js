import React, { Component } from "react";
import * as THREE from "three";


const noise = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`;



class Molecule extends THREE.Object3D{
    material;
    geometry;
    mesh;
    radius = 1.5;
    detail = 40;
    particleSizeMin = 0.03;
    particleSizeMax = 0.09;
  
    constructor() {
      super();
      this.build();
    }
  
    build() {
      
      this.dot()
      
      this.geometry = new THREE.IcosahedronBufferGeometry(1, this.detail);
  
      this.material = new THREE.PointsMaterial( {
        map:this.dot(),
        blending: THREE.AdditiveBlending,
        color:"#2c2a324",
        depthTest:false
      } )
  
      this.setupShader(this.material)
  
      this.mesh = new THREE.Points(this.geometry, this.material);
      this.add(this.mesh);
    }
    
    dot(size = 32, color = "#FFFFFF"){
      const sizeH = size * 2;
      
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = size
      
      const ctx = canvas.getContext('2d')
      
      const circle = new Path2D()
      circle.arc(sizeH, sizeH, sizeH, 0, 2 * Math.PI);
      
      ctx.fillStyle = color;
      ctx.fill(circle);
      
    //   debug canvas
    //   canvas.style.position = "fixed"
    //   canvas.style.top = 0
    //   canvas.style.left = 0
    //   document.body.appendChild(canvas)
      
      return new THREE.CanvasTexture(canvas)
    }
  
    setupShader(material){
      material.onBeforeCompile = ( shader ) => {
        shader.uniforms.time = { value: 0 }
        shader.uniforms.radius = { value: this.radius }
        shader.uniforms.particleSizeMin = { value: this.particleSizeMin }
        shader.uniforms.particleSizeMax = { value: this.particleSizeMax }
        shader.vertexShader = 'uniform float particleSizeMax;\n' + shader.vertexShader;
        shader.vertexShader = 'uniform float particleSizeMin;\n' + shader.vertexShader;
        shader.vertexShader = 'uniform float radius;\n' + shader.vertexShader;
        shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
        shader.vertexShader = noise + "\n" + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `
            vec3 p = position;
            float n = snoise( vec3( p.x*.6 + time*0.2, p.y*0.4 + time*0.3, p.z*.2 + time*0.2) );
            p += n *0.4;
  
            // constrain to sphere radius
            float l = radius / length(p);
            p *= l;
            float s = mix(particleSizeMin, particleSizeMax, n);
            vec3 transformed = vec3( p.x, p.y, p.z );
          `
        )
        shader.vertexShader = shader.vertexShader.replace(
          'gl_PointSize = size;',
          'gl_PointSize = s;'
        )
  
        material.userData.shader = shader;
  
      }
    }
  
    animate(time) {
      this.mesh.rotation.set(0, time * 0.2, 0);
      if(this.material.userData.shader)
        this.material.userData.shader.uniforms.time.value = time;
    }
  
  }
//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20201014 (stegu)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//


class SceneThree extends Component {
  constructor(props) {
    super(props);

    //this.onInputMove = this.onInputMove.bind(this);
    this.start = this.start.bind(this);
    // this.lerp = this.lerp.bind(this);
    // this.map = this.map.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //scene set up
    const scene = new THREE.Scene();


    ///////////////////////////////////

    //camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 120);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    ///////////////////////////////////

    camera.position.z = 5;
    // camera.position.x = -1.5;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);

    var molecule = new Molecule()
    scene.add(molecule);
    // renderer.set
    // renderer.setClearColor(0x000000, 0);
    // renderer.setPixelRatio(window.devicePixelRatio);

    // this.lights = lights
    this.scene = scene;
    this.camera = camera;
    this.molecule = molecule;
    this.renderer = renderer;
    this.mount.appendChild(this.renderer.domElement);
    
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {

    if (!this.frameId) {

      this.frameId = requestAnimationFrame(this.animate);
      this.animate()
    }
  }

  stop() {

    cancelAnimationFrame(this.frameId);
  }
  resizeCanvasToDisplaySize() {
    
    const canvas = this.renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    // if(width < 360){
    //   this.stop()
    // }
    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser

      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      // update any render target sizes here
    }
  }

  animate() {

    const time = performance.now() * 0.001;

    this.molecule.animate(time);
    var tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
    var windowHeight = window.innerHeight;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.fov =
      (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
    this.camera.updateProjectionMatrix();
    this.resizeCanvasToDisplaySize();
    // this.renderer.setSize(window.innerWidth - 18, window.innerHeight);
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
        <div
          className="three"
          id="canvas"
          ref={(mount) => {
            this.mount = mount;
          }}
        />
    );
  }
}

export default SceneThree;

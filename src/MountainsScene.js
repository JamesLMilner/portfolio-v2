import * as THREE from 'three';
import Noise from './Noise.js';


class MountainsScene {

  constructor() {

    this.keyDirectionPositive = false;
    this.keySwitch = 1;
    this.mouseX = 0
    this.mouseY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

  }

  initScene(elementId) {

    // Create a basic perspective camera
    // Create a renderer with Antialiasing
    this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById(elementId), 
        antialias:true
    });

    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.y = 20000;
    this.camera.position.z = 3000;
    this.camera.position.x = 3000;

    this.scene = new THREE.Scene();

    const material = new THREE.MeshBasicMaterial( { 
      color: 0x00000, 
      wireframe: true 
    });
    
    const quality = 16
    const step = 1024 / quality;
    const landscapeSize = 1024 * 6;
    const geometry = new THREE.PlaneGeometry( landscapeSize, landscapeSize, quality - 1, quality - 1 );
    const data = this.generateHeight( 1024, 1024 );

    this.applyGeometryTransforms(geometry, quality, data, step);

    const mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );

    this.renderer.setClearColor("#ffffff");
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    document.addEventListener( 'keypress', this.onKeyDown.bind(this), false )
    document.addEventListener( 'mousemove', this.onDocumentMouseMove.bind(this), false );
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

    this.animate();

  }

  applyGeometryTransforms(geometry, quality, data, step) {

      geometry.rotateX( - Math.PI / 2 );

      for ( let i = 0; i < geometry.vertices.length; i++ ) {
        const x = i % quality, y = Math.floor( i / quality );
        const newY = data[ ( x * step ) + ( y * step ) * 1024 ] * 2 - 128;
        geometry.vertices[ i ].y = newY;
      }

    }

    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    generateHeight( width, height ) {

      const data = new Uint8Array( width * height );
      const perlin = new Noise();
      const size = width * height;
      const z = Math.random() * 100;

      let quality = 2;

      for ( let j = 0; j < 4; j ++ ) {

        quality *= 4;

        for ( let i = 0; i < size; i ++ ) {

          let x = i % width, y = ~~ ( i / width );
          let noise = perlin.generate( x / quality, y / quality, z );
          let noiseFactor = noise * 0.3;

          data[i] += Math.abs(noiseFactor) * quality + 10;

        }
      }

      return data;

    }

    onKeyDown(event) {
      
      this.keySwitch += 1;

      if (this.keySwitch % 10 === 0) {
        this.keyDirectionPositive = !this.keyDirectionPositive;
      }

      const movement = 200;
      
      if(this.keyDirectionPositive) {
        this.mouseX = this.mouseX + movement;
      } else {
        this.mouseX = this.mouseX - movement;
      }

    }

    onDocumentMouseMove(event) {
      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    }

    animate() {
      const animation = this.animate.bind(this);
      requestAnimationFrame(animation);
      this.renderScene();
    }
    
    renderScene() {
      this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.20;
      this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * 0.03 + 30;
      this.camera.lookAt( this.scene.position );
      this.renderer.render( this.scene, this.camera );
    }

}

export default MountainsScene;

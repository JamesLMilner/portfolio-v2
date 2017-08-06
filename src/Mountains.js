import React, { Component } from 'react';
import * as THREE from 'three';
import Noise from './Noise.js';
import "./Mountains.css";

class Mountains extends Component {

  componentDidMount() {

    // Create a basic perspective camera
    // Create a renderer with Antialiasing
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("Mountains"), 
        antialias:true
    });

    var mouseX = 0
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );

    camera.position.y = 20000;
    camera.position.z = 3000;
    camera.position.x = 3000;

    const scene = new THREE.Scene();

    const material = new THREE.MeshBasicMaterial( { 
      color: 0x00000, 
      wireframe: true 
    });

    const quality = 16
    const step = 1024 / quality;
    const landscapeSize = 1024 * 6;
    const geometry = new THREE.PlaneGeometry( landscapeSize, landscapeSize, quality - 1, quality - 1 );
    const data = generateHeight( 1024, 1024 );

    applyGeometryTransforms(geometry, quality, data, step);

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer.setClearColor("#ffffff");
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.addEventListener( 'keypress', onKeyDown, false )
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

    animate();

    function applyGeometryTransforms(geometry, quality, data, step) {

      geometry.rotateX( - Math.PI / 2 );

      for ( let i = 0; i < geometry.vertices.length; i++ ) {
        const x = i % quality, y = Math.floor( i / quality );
        const newY = data[ ( x * step ) + ( y * step ) * 1024 ] * 2 - 128;
        geometry.vertices[ i ].y = newY;
      }

    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function generateHeight( width, height ) {

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

    var keyDirectionPositive = false;
    var keySwitch = 1;

    function onKeyDown(event) {
      
      keySwitch += 1;

      if (keySwitch % 10 === 0) {
        keyDirectionPositive = !keyDirectionPositive;
      }

      const movement = 200;
      
      if(keyDirectionPositive) {
        mouseX = mouseX + movement;
      } else {
        mouseX = mouseX - movement;
      }

    }

    function onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    //
    function animate() {
      requestAnimationFrame( animate );
      renderScene();
    }
    
    function renderScene() {
      camera.position.x += ( mouseX - camera.position.x ) * 0.20;
      camera.position.y += ( - mouseY - camera.position.y ) * 0.03 + 30;
      camera.lookAt( scene.position );
      renderer.render( scene, camera );
    }

  }

  render() {
    return (
      <div className="Mountains">
        <canvas id="Mountains" />
      </div>
    )
  }

}

export default Mountains;

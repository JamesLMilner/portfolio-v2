import React, { Component } from 'react';
import * as THREE from 'three';
import Noise from './Noise.js';

class Mountains extends Component {

  componentDidMount() {

    // Create a basic perspective camera
    // Create a renderer with Antialiasing
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("Mountains"), 
        antialias:true
    });

    var camera;
    var scene;
    var mesh;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {

      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.y = 20000;
      camera.position.z = 3000;
      camera.position.x = 3000;
      scene = new THREE.Scene();
      const data = generateHeight( 1024, 1024 );

      const material = new THREE.MeshBasicMaterial( { 
        color: 0x00000, 
        overdraw: 0.5, 
        wireframe: true 
      });

      const quality = 16, step = 1024 / quality;
      const landscapeSize = 1024 * 6;
      const geometry = new THREE.PlaneGeometry( landscapeSize, landscapeSize, quality - 1, quality - 1 );

      geometry.rotateX( - Math.PI / 2 );
      for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
        var x = i % quality, y = Math.floor( i / quality );
        geometry.vertices[ i ].y = data[ ( x * step ) + ( y * step ) * 1024 ] * 2 - 128;
      }
      
      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );
      renderer.setClearColor("#ffffff");
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );

      document.addEventListener( 'mousemove', onDocumentMouseMove, false );
      window.addEventListener( 'resize', onWindowResize, false );

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
          data[ i ] += Math.abs( noise * 0.5 ) * quality + 10;
        }
      }

      return data;

    }

    function onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    //
    function animate() {
      requestAnimationFrame( animate );
      render();
    }
    
    function render() {
      camera.position.x += ( mouseX - camera.position.x ) * 0.20;
      camera.position.y += ( - mouseY - camera.position.y ) * 0.03 + 30;
      camera.lookAt( scene.position );
      renderer.render( scene, camera );
    }

  }


  render() {
    return (
      <div>
        <canvas id="Mountains" />
      </div>
    )
  }

}

export default Mountains;

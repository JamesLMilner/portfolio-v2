import React, { Component } from 'react';
import MountainsScene from './MountainsScene.js';
import "./Mountains.css";

class Mountains extends Component {

  constructor() {
    super();
    this.webGLSupport = this.hasWebGLSupport();
  }

  hasWebGLSupport() {
    
    if (!!window.WebGLRenderingContext) {
        const canvas = document.createElement("canvas");
        const names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
        let context = false;

        for(let i=0; i < names.length; i++) {
            try {
                context = canvas.getContext(names[i]);
                const isFunction = typeof context.getParameter === "function";
                if (context && isFunction) {
                    // WebGL is enabled
                    return true;
                }
            } catch(e) {}
        }

        // WebGL is supported, but disabled
        return false;
    }

    // WebGL not supported
    return false;

  }

  componentDidMount() {

    if (this.webGLSupport) {
      const mountainsScene = new MountainsScene();
      mountainsScene.initScene("Mountains");
    } else {
      // TODO: Image fallback
    }

  }

  render() {
    const webGl = (this.webGLSupport) ? "" : "noWebGL";
    return (
      <div className={"Mountains " + webGl}>
        <canvas id="Mountains" />
      </div>
    )
  }

}

export default Mountains;

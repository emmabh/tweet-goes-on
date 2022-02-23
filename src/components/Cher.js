import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import React from 'react'
import '../App.css';

let audioMap = {
  0: "/audio/iAmARichMan.mp3",
  1: "/audio/iDontGive.mp3",
  2: "/audio/menAreCoolest.mp3",
  3: "/audio/notANun.mp3",
  4: "/audio/snapOutOfIt.mp3"
}

class Cher extends React.Component {
  state = {
    audioCount: 0
  };

  constructor(props) {
    super(props);
    this.startAudio = this.startAudio.bind(this);
  }

  startAudio() {
    let audio = new Audio(audioMap[this.state.audioCount]);
    audio.play();

    this.setState({
      audioCount: (this.state.audioCount + 1) % 5
    });
  }

  componentDidMount() {
      var scene = new THREE.Scene();
      scene.background = null;
      var renderer = new THREE.WebGLRenderer( { alpha: true } );
      if(window.innerWidth < 800) {
        renderer.setSize( window.innerWidth, window.innerHeight );
        var camera = new THREE.PerspectiveCamera( 45, (window.innerWidth) / window.innerHeight, 0.25, 100 );
      } else {
        renderer.setSize( window.innerWidth/2, window.innerHeight );
        var camera = new THREE.PerspectiveCamera( 45, (window.innerWidth)/2 / window.innerHeight, 0.25, 100 );
      }
      this.mount.appendChild( renderer.domElement );
      // instantiate a loader
      const loader = new GLTFLoader();

      loader.load( 'models/cher.glb', function ( gltf ) {
        const model = gltf.scene;
        scene.add( model );  
        camera.position.z = 2;
        camera.position.y = 0.5;
        
        scene.add( new THREE.AmbientLight( 0x666666 ) );
        const light = new THREE.DirectionalLight( 0xdfebff, 3 );
        light.position.set( 0, -10, 50 );
        light.position.multiplyScalar( 1.3 );
        light.castShadow = false;
        scene.add(light);
  
        function animate() {
          requestAnimationFrame( animate );
          model.rotation.y += 0.05;
          renderer.render( scene, camera );
        }
        
        animate();
      }, undefined, function (e) {

        console.error(e);

      });
  }

  render() {
    return (
      <div onClick={this.startAudio} ref={ref => (this.mount = ref)} />
    )
  }
}

export default Cher;

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface GlobeBackgroundProps {
  showControlsHint?: boolean;
  hintDuration?: number;
  enableZoom?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  starDensity?: number;
}

const GlobeBackground: React.FC<GlobeBackgroundProps> = ({
  showControlsHint = true,
  hintDuration = 3000,
  enableZoom = false,
  autoRotate = true,
  autoRotateSpeed = 0.1,
  starDensity = 10000,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(showControlsHint);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create starfield background
    const createStars = () => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starDensity * 3);

      for (let i = 0; i < starDensity; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        sizeAttenuation: true,
      });

      return new THREE.Points(geometry, material);
    };

    const stars = createStars();
    scene.add(stars);

    // Create atmospheric glow
    const createAtmosphere = () => {
      const vertexShader = `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `;

      const geometry = new THREE.SphereGeometry(5.2, 32, 32);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        uniforms: {
          glowColor: { value: new THREE.Color(0x3a86ff) },
        },
      });

      return new THREE.Mesh(geometry, material);
    };

    const atmosphere = createAtmosphere();
    scene.add(atmosphere);

    // Create wireframe globe
    const wireframeGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(5, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x3a86ff,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })
    );
    scene.add(wireframeGlobe);

    // Create solid globe (initially hidden)
    const solidGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(4.9, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x1a237e,
        transparent: true,
        opacity: 0,
      })
    );
    scene.add(solidGlobe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 10;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = enableZoom;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;

    // Color transitions
    const colors = [
      new THREE.Color(0x3a86ff), // Blue
      new THREE.Color(0x8338ec), // Purple
      new THREE.Color(0xff006e), // Pink
      new THREE.Color(0xfb5607), // Orange
      new THREE.Color(0xffbe0b), // Yellow
    ];

    let colorIndex = 0;
    let nextColorIndex = 1;
    let colorT = 0;
    const colorTransitionSpeed = 0.005;

    const lerpColor = (a: THREE.Color, b: THREE.Color, t: number) => {
      const color = new THREE.Color();
      color.r = a.r + (b.r - a.r) * t;
      color.g = a.g + (b.g - a.g) * t;
      color.b = a.b + (b.b - a.b) * t;
      return color;
    };

    // Animation loop
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update color transition
      colorT += colorTransitionSpeed;
      if (colorT >= 1) {
        colorT = 0;
        colorIndex = nextColorIndex;
        nextColorIndex = (nextColorIndex + 1) % colors.length;
      }

      const currentColor = lerpColor(colors[colorIndex], colors[nextColorIndex], colorT);

      // Apply color to materials
      if (wireframeGlobe.material instanceof THREE.MeshBasicMaterial) {
        wireframeGlobe.material.color = currentColor;
      }

      if (solidGlobe.material instanceof THREE.MeshPhongMaterial) {
        solidGlobe.material.color = currentColor;
      }

      if (atmosphere.material instanceof THREE.ShaderMaterial) {
        atmosphere.material.uniforms.glowColor.value = currentColor;
      }

      // Rotate elements
      wireframeGlobe.rotation.y += 0.001;
      solidGlobe.rotation.y += 0.001;
      atmosphere.rotation.y += 0.0005;
      stars.rotation.y += 0.0001;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Load high-resolution textures
    const textureLoader = new THREE.TextureLoader();

    Promise.all([
      textureLoader.loadAsync("/earth-texture-compressed.jpg"),
      textureLoader.loadAsync("/earth-bump-compressed.jpg"),
      textureLoader.loadAsync("/earth-specular-compressed.jpg"),
    ]).then(([texture, bumpMap, specularMap]) => {
      const highResMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: bumpMap,
        bumpScale: 0.05,
        specularMap: specularMap,
        specular: new THREE.Color("grey"),
      });

      // Transition to high-res globe
      const transitionDuration = 1; // seconds
      const startTime = Date.now();

      const transitionToHighRes = () => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsedTime / transitionDuration, 1);

        solidGlobe.material = highResMaterial;
        solidGlobe.material.opacity = progress;
        if (wireframeGlobe.material instanceof THREE.MeshBasicMaterial) {
          wireframeGlobe.material.opacity = 0.5 * (1 - progress);
        }

        if (progress < 1) {
          requestAnimationFrame(transitionToHighRes);
        } else {
          setIsLoaded(true);
          scene.remove(wireframeGlobe);
        }

        renderer.render(scene, camera);
      };

      transitionToHighRes();
    });

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Hide hint after delay
    const hintTimer = setTimeout(() => {
      setShowHint(false);
    }, hintDuration);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
      controls.dispose();
      clearTimeout(hintTimer);
    };
  }, [enableZoom, autoRotate, autoRotateSpeed, starDensity, hintDuration, showControlsHint]);

  return (
    <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none">
      {showControlsHint && showHint && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-30 text-white text-sm px-3 py-1 rounded-full transition-opacity duration-1000 opacity-80 hover:opacity-100 pointer-events-auto">
          Drag to explore
        </div>
      )}
    </div>
  );
};

export default GlobeBackground;
"use client";

import { useEffect, useRef } from "react";
import {
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

/* 3D DNA helix for the hero — parallel "rung" lines rotating to reveal the
 * twist, a light-background take on the blueprint look. Client-only (WebGL),
 * scoped to its container, tinted from CSS tokens, and static under
 * prefers-reduced-motion. Everything is disposed on unmount. */
const SEGMENTS = 30;

export function DnaHelix3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const styles = getComputedStyle(container);
    const accent = styles.getPropertyValue("--accent").trim() || "#0B6E61";
    const dim = styles.getPropertyValue("--border-strong").trim() || "#B4B9C1";

    const size = () => ({
      w: container.clientWidth || 320,
      h: container.clientHeight || 360,
    });
    let { w, h } = size();

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    const group = new Group();
    scene.add(group);

    const geometries: BufferGeometry[] = [];
    const materials: LineBasicMaterial[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const y = (i - SEGMENTS / 2) * 0.8;
      const angle = i * 0.3;
      const geometry = new BufferGeometry().setFromPoints([
        new Vector3(Math.cos(angle) * 3, y, Math.sin(angle) * 3),
        new Vector3(-Math.cos(angle) * 3, y, -Math.sin(angle) * 3),
      ]);
      const material = new LineBasicMaterial({
        color: i % 2 === 0 ? accent : dim,
        transparent: true,
        opacity: 0.65,
      });
      geometries.push(geometry);
      materials.push(material);
      group.add(new Line(geometry, material));
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const render = () => renderer.render(scene, camera);
    const animate = () => {
      group.rotation.y += 0.005;
      group.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
      render();
      frame = requestAnimationFrame(animate);
    };

    if (reduceMotion) {
      group.rotation.y = 0.6;
      render();
    } else {
      frame = requestAnimationFrame(animate);
    }

    const resize = new ResizeObserver(() => {
      ({ w, h } = size());
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      render();
    });
    resize.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="motif motif--dna3d" aria-hidden="true" />;
}

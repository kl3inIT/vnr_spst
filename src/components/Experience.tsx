"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { ARTIFACTS, ROOMS, type ArtifactData } from "@/data/museumData";
import { useStore } from "@/store/useStore";

function CameraRig() {
  const activeRoomId = useStore((state) => state.activeRoomId);
  const room = ROOMS.find((item) => item.id === activeRoomId) ?? ROOMS[0];
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(...room.cameraPosition), [room.cameraPosition]);

  useFrame((_, delta) => {
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.8));
    camera.lookAt(0, 0.8, 0);
  });
  return null;
}

function RiceRows({ color }: { color: string }) {
  return (
    <group position={[0, 0.07, 0.5]}>
      {Array.from({ length: 11 }, (_, row) =>
        Array.from({ length: 9 }, (__, column) => (
          <group key={`${row}-${column}`} position={[(column - 4) * 0.62, 0, (row - 5) * 0.48]}>
            <mesh rotation={[0, 0, (column % 2 ? 1 : -1) * 0.08]}>
              <cylinderGeometry args={[0.018, 0.027, 0.42 + (row % 3) * 0.05, 5]} />
              <meshStandardMaterial color={color} roughness={0.9} />
            </mesh>
            <mesh position={[0.04, 0.18, 0]} rotation={[0, 0, -0.6]}>
              <sphereGeometry args={[0.045, 5, 4]} />
              <meshStandardMaterial color="#d4a72c" roughness={1} />
            </mesh>
          </group>
        )),
      )}
    </group>
  );
}

function DocumentSculpture({ color }: { color: string }) {
  return (
    <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.12}>
      <group rotation={[-0.08, -0.12, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.25, 2.9, 0.13]} />
          <meshStandardMaterial color="#f8f0db" roughness={0.82} />
        </mesh>
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[1.75, 2.35]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
        {Array.from({ length: 7 }, (_, index) => (
          <mesh key={index} position={[-0.18, 0.83 - index * 0.27, 0.085]}>
            <planeGeometry args={[1.05 + (index % 3) * 0.16, 0.035]} />
            <meshBasicMaterial color="#fff7e6" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function CentralSymbol({ roomId, color }: { roomId: string; color: string }) {
  if (roomId === "room-origin") return <DocumentSculpture color={color} />;
  if (roomId === "room-turning-point") {
    return (
      <group>
        <mesh position={[-1.15, 1.15, 0]} castShadow>
          <boxGeometry args={[1.8, 2.3, 0.35]} />
          <meshStandardMaterial color="#eab308" roughness={0.7} />
        </mesh>
        <mesh position={[1.15, 1.15, 0]} castShadow>
          <boxGeometry args={[1.8, 2.3, 0.35]} />
          <meshStandardMaterial color="#991b1b" roughness={0.75} />
        </mesh>
        <mesh position={[0, 1.15, 0.28]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.18, 1.5, 0.16]} />
          <meshStandardMaterial color="#f8f0db" />
        </mesh>
      </group>
    );
  }
  if (roomId === "room-policy") {
    return (
      <group>
        {[0, 1, 2, 3, 4, 5].map((step) => (
          <mesh key={step} position={[(step - 2.5) * 0.75, 0.32 + step * 0.23, 0]} castShadow>
            <boxGeometry args={[0.58, 0.58, 0.58]} />
            <meshStandardMaterial color={step < 2 ? "#9a3412" : color} roughness={0.65} />
          </mesh>
        ))}
      </group>
    );
  }
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.16, 0]} receiveShadow>
        <cylinderGeometry args={[2.7, 3.2, 0.28, 8]} />
        <meshStandardMaterial color="#c7a66a" roughness={0.88} />
      </mesh>
      <RiceRows color="#4d7c0f" />
    </group>
  );
}

function ArtifactMarker({ artifact }: { artifact: ArtifactData }) {
  const setActiveArtifact = useStore((state) => state.setActiveArtifact);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered]);

  return (
    <group position={artifact.position}>
      <mesh
        castShadow
        scale={hovered ? 1.08 : 1}
        onClick={(event) => {
          event.stopPropagation();
          setActiveArtifact(artifact.id);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {artifact.kind === "document" ? (
          <boxGeometry args={[1.15, 1.5, 0.18]} />
        ) : artifact.kind === "portrait" ? (
          <cylinderGeometry args={[0.72, 0.84, 1.45, 10]} />
        ) : artifact.kind === "data" ? (
          <dodecahedronGeometry args={[0.88, 0]} />
        ) : (
          <boxGeometry args={[1.22, 1.22, 1.22]} />
        )}
        <meshStandardMaterial color={artifact.color} roughness={0.65} metalness={0.04} />
      </mesh>
      <mesh position={[0, -0.92, 0]} receiveShadow>
        <cylinderGeometry args={[0.66, 0.82, 0.3, 12]} />
        <meshStandardMaterial color="#d6c8aa" roughness={0.95} />
      </mesh>
      <Html center position={[0, -1.35, 0]} distanceFactor={8} transform occlude="blending">
        <button className="scene-label" onClick={() => setActiveArtifact(artifact.id)}>
          <span>{artifact.date}</span>
          {artifact.title}
        </button>
      </Html>
    </group>
  );
}

function MuseumScene() {
  const activeRoomId = useStore((state) => state.activeRoomId);
  const setActiveArtifact = useStore((state) => state.setActiveArtifact);
  const room = ROOMS.find((item) => item.id === activeRoomId) ?? ROOMS[0];
  const artifacts = ARTIFACTS.filter((item) => item.roomId === activeRoomId);

  return (
    <>
      <color attach="background" args={["#e8dfca"]} />
      <fog attach="fog" args={["#e8dfca", 12, 25]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 9, 5]} intensity={2.4} castShadow shadow-mapSize={[1024, 1024]} />
      <hemisphereLight args={["#fff7e6", "#7a684b", 1.1]} />
      <CameraRig />

      <group onClick={() => setActiveArtifact(null)}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[24, 20]} />
          <meshStandardMaterial color="#ddd0b4" roughness={1} />
        </mesh>
        <mesh position={[0, 3.7, -4.2]} receiveShadow>
          <boxGeometry args={[15, 7.4, 0.25]} />
          <meshStandardMaterial color="#efe7d4" roughness={0.96} />
        </mesh>
        <mesh position={[-7.4, 3.5, 0]} receiveShadow>
          <boxGeometry args={[0.22, 7, 8.5]} />
          <meshStandardMaterial color="#e5dac2" />
        </mesh>
        <mesh position={[7.4, 3.5, 0]} receiveShadow>
          <boxGeometry args={[0.22, 7, 8.5]} />
          <meshStandardMaterial color="#e5dac2" />
        </mesh>
        <group position={[0, 0.15, -0.65]}>
          <CentralSymbol roomId={activeRoomId} color={room.color} />
        </group>
        {artifacts.map((artifact) => (
          <ArtifactMarker artifact={artifact} key={artifact.id} />
        ))}
      </group>
    </>
  );
}

export default function Experience() {
  return (
    <div className="canvas-layer" aria-label="Không gian bảo tàng 3D tương tác">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 4.8, 11], fov: 48, near: 0.1, far: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        fallback={
          <div className="webgl-fallback">
            Trình duyệt không hỗ trợ WebGL. Bạn vẫn có thể dùng thanh điều hướng để đọc toàn bộ nội dung bảo tàng.
          </div>
        }
      >
        <MuseumScene />
      </Canvas>
    </div>
  );
}

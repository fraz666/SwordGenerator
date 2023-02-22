import { BoxGeometry, BufferAttribute, BufferGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

let scene: Scene;
let sword: Group;

export const initThreejsApp = (canvasId: string): void => {

    const canvasRef = document.getElementById(canvasId);
    if (canvasRef == null) {
        throw Error(`Invalid canvas id: ${canvasId}`);
    }

    scene = new Scene();
    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new WebGLRenderer({ canvas: canvasRef });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    sword = getSword();
    scene.add(sword);

    camera.position.z = 35;

    function rotate(g: Group): void {
        if (g != null) {
            g.rotation.x += 0.01;
            g.rotation.y += 0.01;
        }
    }

    function animate() {
        
        rotate(sword);

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }

    animate();
}

export const regenerateSword = (): void => {
    scene.remove(sword);
    sword = getSword();
    scene.add(sword);
}


const getRandInt2 = (base: number, multiplier: number): number => {
    return base + Math.floor(Math.random() * multiplier);
}

const getSword = (): Group => {

    // meshes
    const sw = getRandInt2(1, 2);

    const hh = getRandInt2(3, 5);
    const hgeometry = new BoxGeometry(sw, hh, sw);
    const hmaterial = new MeshBasicMaterial({ color: 0x00ff00 });
    const handle = new Mesh(hgeometry, hmaterial);

    const gh = getRandInt2(1, 2);
    const gd = getRandInt2(2, 5);
    const ggeometry = new BoxGeometry(sw, gh, gd);
    const gmaterial = new MeshBasicMaterial({ color: 0xff0000 });
    const guard = new Mesh(ggeometry, gmaterial);

    const bh = getRandInt2(3, 10);
    const bd = getRandInt2(1, 2);
    const geometry = new BoxGeometry(sw, bh, bd);
    const material = new MeshBasicMaterial({ color: 0x0000ff });
    const blade = new Mesh(geometry, material);

    // positioning
    const handleHeight = handle.geometry.parameters.height;
    
    const guardHeight = guard.geometry.parameters.height;
    guard.position.y = handleHeight / 2 + guardHeight / 2;
    
    const bladeHeight = blade.geometry.parameters.height;
    blade.position.y = guard.position.y + guardHeight / 2 + bladeHeight / 2;

    const group = new Group();
    group.add(handle);
    group.add(guard);
    group.add(blade);
    return group;
}
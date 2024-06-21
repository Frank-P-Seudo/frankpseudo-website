import * as THREE from "three";
import React from "react";
import { ComponentProps } from "../common/interfaces";

export default function Home({translator}:ComponentProps) {
    const [width, setWidth] = React.useState(window.innerWidth);
    let bookTexture: THREE.Texture;

    // only run once
    React.useEffect(() => {
        bookTexture = new THREE.TextureLoader().load("bookcover_front.png");        
        window.addEventListener('resize', () => {            
            setWidth(window.innerWidth);
        });
    });
    
    // update the animation's background texture when language or screen width is changed
    React.useEffect(() => {
        const GOLDEN_RATIO = 1.6;
        const BOOK_STAT = {
            origin: [-3,-3,0],
            radius: 3,
            position: [0,-3,0],
            size: [7,7,7]
        };

        const canvas = document.getElementById("bg");
        const scene = new THREE.Scene();
        const backgroundPath = translator.i18n.language === "zh" || translator.i18n.language === "ja" ? `three_js_background_${translator.i18n.language}.png` : "three_js_background_en.png";
        const backgroundTexture = new THREE.TextureLoader().load(backgroundPath);
        scene.background = backgroundTexture;
        const camera = new THREE.PerspectiveCamera(75, GOLDEN_RATIO , 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas as HTMLCanvasElement
        });    

        renderer.setPixelRatio(GOLDEN_RATIO);
        const renderWidth: number = canvas?.offsetWidth ?? (width * 0.8);
        const renderHeight: number = renderWidth / GOLDEN_RATIO ;
        renderer.setSize(renderWidth, renderHeight);
        camera.position.setZ(30);

        renderer.render(scene, camera);
        bookTexture ??= new THREE.TextureLoader().load("bookcover_front.png");
        const book = new THREE.Mesh(
            new THREE.BoxGeometry(BOOK_STAT.size[0], BOOK_STAT.size[1], BOOK_STAT.size[2]),
            new THREE.MeshBasicMaterial({map: bookTexture})
        );
        book.position.set(BOOK_STAT.position[0], BOOK_STAT.position[1], BOOK_STAT.position[2]);
        scene.add(book);

        const ambientLight = new THREE.AmbientLight(0x000000);
        scene.add(ambientLight);

        let raiseRadian = true;

        function animate() {
            requestAnimationFrame(animate);
            book.rotation.x += 0.01;
            book.rotation.y += 0.005;
            book.rotation.z += 0.01;

            let angle = Math.acos((book.position.x - BOOK_STAT.origin[0]) / BOOK_STAT.radius);
            if (angle >= Math.PI || angle <= 0) {
                raiseRadian = !raiseRadian;
            } 
            angle += raiseRadian ? Math.PI / 180 :  - Math.PI / 180;
            book.position.x = BOOK_STAT.origin[0] + Math.cos(angle) * BOOK_STAT.radius;
            book.position.y = BOOK_STAT.origin[1] + Math.sin(angle) * BOOK_STAT.radius;
            book.position.z += raiseRadian ? 0.1 : -0.1;

            renderer.render(scene, camera);
        }

        animate();
    }, [translator.i18n.language, width])

    return (
        <section id="section-home">
            <div className="container mx-auto px-0">
                <canvas className="w-75 surrounded" id="bg"></canvas>
            </div>
        </section>
    );
}
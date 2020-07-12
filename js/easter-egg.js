// Three.js swamp homepage
let d = new Date();
let time = d.getTime();
let easterEgg;
let direction = true; //true is right, false is left (negative and positive)

let water;

let position = 0;
let header = document.querySelector("#top").offsetHeight;
let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000 );
// let listener = new THREE.AudioListener();
// camera.add(listener);
camera.position.z = 6;

//WORDS
{
	let loader = new THREE.FontLoader();
	loader.load('fonts/Open_Sans_Regular.json', function (font) {

		let geometry = new THREE.TextGeometry('Just Testing', {
			font: font,
			size: 5,
			height: 10,
			curveSegments: 12,
			bevelEnabled: false,
			bevelThickness: 10,
			bevelSize: 8,
			bevelOffset: 0,
			bevelSegments: 3
		});
		let textMaterial = new THREE.MeshBasicMaterial(
			{color: 0x008000}
		);

		let mesh = new THREE.Mesh(geometry, textMaterial);

		mesh.position.set(0, 0, -300);

		scene.add(mesh);
	});
}

//WATER

let material = new THREE.ShaderMaterial( {
	uniforms: {
		time: { value: 0 },
		resolution: { value: new THREE.Vector2() }
	},

	vertexShader: document.getElementById("vertex-shader").textContent,

	fragmentShader: document.getElementById("fragment-shader").textContent
} );
//material.normalMap = new THREE.TextureLoader().load("./models/waterNormal.jpg");
let geometry = new THREE.PlaneBufferGeometry( 20, 20 );
geometry.rotateX(90 * (2 * ((Math.PI))/360));
// let material = new THREE.MeshStandardMaterial( {color: 0x3399ff, side: THREE.DoubleSide} );
// material.normalMap = new THREE.TextureLoader().load("./models/waterNormal.jpg");
let plane = new THREE.Mesh( geometry, material );
scene.add( plane );


//SHREK
let objectLoader = new THREE.ObjectLoader();
objectLoader.load(
	"./models/shrek.json",

	function(object) {
		let themeSong = new THREE.PositionalAudio(listener);
		shrek = object;

		let audioLoader = new THREE.AudioLoader();
		audioLoader.load("./sounds/All_Star.mp3", buffer => {
			themeSong.setBuffer(buffer);
			themeSong.setRefDistance(20);
			themeSong.play();
		});
		scene.add(object);
		object.add(themeSong);
	}
);

//LIGHTS
{
	let ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( ambientLight );


	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(1000, 1000, 1000000);
	scene.add(light);
}

let ambient = new THREE.AmbientLight( 0x444444 );
scene.add( ambient );

document.onwheel = (event) => {
	position += (event.deltaY / 10);
	if(position >= 20) {
		position = 20;
	} else if(position <= -20) {
		position = -20;
	}
	camera.position.set( 0, position, 6);
};

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, (window.innerHeight - header));
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

function animate() {
	requestAnimationFrame( animate );

	//shrek.position.x += 2;
	renderer.render( scene, camera );
	material.uniforms.time.value = time/1000;
}
animate();

function shrekMove(distance) {
	if (easterEgg.position.x >= -10 && easterEgg.position.x <= 10) {
		if (direction) {
			easterEgg.position.x += distance;
		} else {
			easterEgg.position.x -= distance;
		}
	} else {
		direction = !direction;
		if(easterEgg.position.x >= 10) {
			easterEgg.position.x = 10;
		} else {
			easterEgg.position.x = -10;
		}
	}
}
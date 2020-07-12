uniform float time;

void main() {
	vec3 transformer = vec3(position);
	float freq = 3.0;
	float amp = 0.1;
	float angle = (time + position.x)*freq;
	transformer.y += sin(angle)*amp;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, transformer.y, position.z, 1.0);
}


void main() {
	gl_FragColor = vec4(0.0, 0.58, 0.86, 1.0);
}
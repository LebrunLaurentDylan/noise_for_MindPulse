export const gradientVertexShader = `varying vec2 vUv;
uniform vec2 uMouse;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    //vUv = vec2(uv.x+(uMouse.x*0.5),uv.y+(uMouse.y*0.5));
    vUv = uv;
}`;
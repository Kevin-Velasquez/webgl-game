/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   */
  constructor(size, centerX, centerY, centerZ, index) {
    super();
    this.animating.push(0);
    this.objectIndex = index;
    this.generateCubeVertices(size, centerX, centerY);
    this.generateCubeNormals();
    this.vertices.push(cubeVertices);
    this.normals.push(cubeNormals);
    this.x.push(centerX);
    this.y.push(centerY);
    this.z.push(centerZ);
    this.collisionRadius = 0.08;
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices(size, centerX, centerY) {
    cubeVertices = new Float32Array([
      // Vertex coordinates and color
      centerX-size,  centerY+size,  size,      centerX-size, centerY-size,  size,       centerX+size, centerY-size,  size,    //t0 +Z facing
      centerX-size,  centerY+size,  size,      centerX+size,  centerY+size,  size,      centerX+size, centerY-size,  size,    //t1 +Z facing

      centerX+size,  centerY+size,  size,      centerX+size, centerY-size,  size,       centerX+size, centerY-size, -size,    //t2 +X facing
      centerX+size,  centerY+size,  size,      centerX+size, centerY-size, -size,    centerX+size,  centerY+size, -size,      //t3 +X facing

      centerX+size,  centerY+size, -size,   centerX+size, centerY-size, -size,    centerX-size, centerY-size, -size,          //t4 -Z facing
      centerX+size,  centerY+size, -size,   centerX-size, centerY-size, -size,    centerX-size,  centerY+size, -size,         //t5 -Z facing
        
      centerX-size,  centerY+size, -size,   centerX-size, centerY-size, -size,    centerX-size, centerY-size,  size,          //t6 -X facing
      centerX-size,  centerY+size, -size,   centerX-size, centerY-size,  size,       centerX-size,  centerY+size,  size,      //t7 -X facing
       
      centerX-size,  centerY+size, -size,   centerX-size,  centerY+size,  size,      centerX+size,  centerY+size,  size,      //t8 +Y facing
      centerX-size,  centerY+size, -size,   centerX+size,  centerY+size,  size,      centerX+size,  centerY+size, -size,      //t9 +Y facing

      centerX-size, centerY-size,  size,       centerX-size, centerY-size, -size,    centerX+size, centerY-size, -size,       //t10 -Y facing
      centerX-size, centerY-size,  size,       centerX+size, centerY-size, -size,    centerX+size, centerY-size,  size        //t11 -Y facing
    ]);
  }
  generateCubeNormals() {
    cubeNormals = new Float32Array([
      0.0, 0.0, 1.0,    0.0, 0.0, 1.0,     0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,    0.0, 0.0, 1.0,     0.0, 0.0, 1.0,

      1.0, 0.0, 0.0,    1.0, 0.0, 0.0,     1.0, 0.0, 0.0, 
      1.0, 0.0, 0.0,    1.0, 0.0, 0.0,     1.0, 0.0, 0.0, 

      0.0, 0.0, -1.0,    0.0, 0.0, -1.0,     0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,    0.0, 0.0, -1.0,     0.0, 0.0, -1.0,

      -1.0, 0.0, 0.0,    -1.0, 0.0, 0.0,     -1.0, 0.0, 0.0, 
      -1.0, 0.0, 0.0,    -1.0, 0.0, 0.0,     -1.0, 0.0, 0.0,
      
      0.0, 1.0, 0.0,    0.0, 1.0, 0.0,     0.0, 1.0, 0.0, 
      0.0, 1.0, 0.0,    0.0, 1.0, 0.0,     0.0, 1.0, 0.0, 

      0.0, -1.0, 0.0,    0.0, -1.0, 0.0,     0.0, -1.0, 0.0, 
      0.0, -1.0, 0.0,    0.0, -1.0, 0.0,     0.0, -1.0, 0.0
    ]);
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
    //this.modelMatrix.setLookAt(0, -1, 0, 0, 0, 0, 0, 0, 1);
    //this.modelMatrix.setLookAt(0, -1, 1, 0, 0, 0, 0, 0, 1.903);
    /*var translateToOrigin = new Matrix4 ();
    var rotateInPlace = new Matrix4 ();
    var translateBack  = new Matrix4 ();

    translateToOrigin.setTranslate(-this.x[0], -this.y[0], 0);
    rotateInPlace.setRotate(2, 0, 1, 0);
    translateBack.setTranslate(this.x[0], this.y[0], 0);

    this.modelMatrix = translateToOrigin.multiply(this.modelMatrix);
    this.modelMatrix = rotateInPlace.multiply(this.modelMatrix);
    this.modelMatrix = translateBack.multiply(this.modelMatrix);*/
  }
  render() {
    gl.enable(gl.DEPTH_TEST);
    super.render(36, gl.TRIANGLES, 3);
    gl.disable(gl.DEPTH_TEST);
  }

  renderRed() {
    sendUniformMatToGLSL(this.modelMatrix.elements, u_ModelMatrix);  
    var vertexBuffer = gl.createBuffer();
    sendAttributeBufferToGLSL(this.vertices[0], 3, a_Position, vertexBuffer);
    var normalBuffer = gl.createBuffer();
    sendAttributeBufferToGLSL(this.normals[0], 3, a_Normal, normalBuffer);
    var vertexColorBuffer = gl.createBuffer();
    sendAttributeBufferToGLSL(this.clickedColor, 3, a_Color, vertexColorBuffer);
    tellGLSLToDrawCurrentBuffer(gl.TRIANGLES, 36);
  }
}

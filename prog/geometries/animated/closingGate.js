/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {ClosingGate}
 */
class ClosingGate extends Geometry {
  /**
   * Constructor for ClosingGate.
   */
  constructor(size, centerX, centerY, top) {
    super();
    this.generateGateVertices(size, centerX, centerY);
    this.vertices.push(gateVertices);
    this.x.push(centerX);
    this.y.push(centerY);
    this.goingUpward = true;
    this.height = top;
    this.wait = 0;
  }

  /**
   * Generates the vertices of ClosingGate. Just a regular cube.
   *
   * @private
   */
  generateGateVertices(size, centerX, centerY) {
    gateVertices = new Float32Array([
      // Vertex coordinates and color
      centerX-size,  centerY+size,  size,      centerX-size, centerY-size,  size,       centerX+size, centerY-size,  size,    //t0
      centerX-size,  centerY+size,  size,      centerX+size,  centerY+size,  size,      centerX+size, centerY-size,  size,    //t1

      centerX+size,  centerY+size,  size,      centerX+size, centerY-size,  size,       centerX+size, centerY-size, -size,    //t2
      centerX+size,  centerY+size,  size,      centerX+size, centerY-size, -size,    centerX+size,  centerY+size, -size,      //t3

      centerX+size,  centerY+size, -size,   centerX+size, centerY-size, -size,    centerX-size, centerY-size, -size,          //t4
      centerX+size,  centerY+size, -size,   centerX-size, centerY-size, -size,    centerX-size,  centerY+size, -size,         //t5
        
      centerX-size,  centerY+size, -size,   centerX-size, centerY-size, -size,    centerX-size, centerY-size,  size,          //t6
      centerX-size,  centerY+size, -size,   centerX-size, centerY-size,  size,       centerX-size,  centerY+size,  size,      //t7
       
      centerX-size,  centerY+size, -size,   centerX-size,  centerY+size,  size,      centerX+size,  centerY+size,  size,      //t8
      centerX-size,  centerY+size, -size,   centerX+size,  centerY+size,  size,      centerX+size,  centerY+size, -size,      //t9

      centerX-size, centerY-size,  size,       centerX-size, centerY-size, -size,    centerX+size, centerY-size, -size,       //t10
      centerX-size, centerY-size,  size,       centerX+size, centerY-size, -size,    centerX+size, centerY-size,  size        //t11
    ]);
  }

  /**
   * Updates the animation of the ClosingGate. Should make it rotate.
   */
  updateAnimation() {
    var translateUpward = new Matrix4();
    var translateDownward = new Matrix4(); 
    if(this.wait == 0){
      if(this.height < 0.8 && this.goingUpward) {
        translateUpward.setTranslate(0, 0, 0.05);
        this.modelMatrix = translateUpward.multiply(this.modelMatrix);
        this.height = this.height+0.05;
        return;
      } else if(this.goingUpward){
        this.goingUpward = false;
        this.wait = 100;
        return;
      }
      if(this.height > 0.4 && this.goingUpward == false && this.wait == 0) {
        translateDownward.setTranslate(0, 0, -0.05);
        this.modelMatrix = translateDownward.multiply(this.modelMatrix);
        this.height = this.height-0.05;
      } else if(this.goingUpward == false){
        this.goingUpward = true;
      }
    } else {
      this.wait -= 1;
    }
  }
  render() {
    gl.enable(gl.DEPTH_TEST);
    super.render(36, gl.TRIANGLES, 3);
    gl.disable(gl.DEPTH_TEST);
  }
}
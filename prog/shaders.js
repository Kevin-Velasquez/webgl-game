// Basic Vertex Shader that receives position and size for each vertex (point).
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +

  'varying vec4 v_Color;\n' +

  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +

  'void main() {\n' +
  '  v_Color = a_Color;\n' +
  '  gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  '}\n';

  var FSHADER_SOURCE = 
  'precision mediump float;\n' +

  'varying vec4 v_Color;\n' +

  'uniform float u_FSwitch;\n' +

  'void main() {\n' +
  '  if (u_FSwitch == 1.0) {\n' +
  '    gl_FragColor = v_Color;\n' +
  '  }\n' +
  '}\n';

  /*var FSHADER_SOURCE = 
  'precision mediump float;\n' +
  'varying vec4 v_Color;\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'uniform float u_FSwitch;\n' +
  'void main() {\n' +
  '  if (u_FSwitch == 1.0) {\n' +
  '    gl_FragColor = v_Color;\n' +
  '  }\n' +
  '  if (u_FSwitch == 0.0) {\n' +
  '    gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '  }\n' +
  '}\n';
  
  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec2 a_TexCoord;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +

  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'uniform float u_VSwitch;\n' +
  
  'void main() {\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '  v_Color = a_Color;\n' +
  '  gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
  '}\n';*/


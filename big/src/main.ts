import './style.css'
import { el, mount,setAttr } from "redom";
import { } from 'blocky';
//blockly stuff
const toolbox = {
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "controls_if"
    },
    {
      "kind": "block",
      "type": "controls_repeat_ext"
    },
    {
      "kind": "block",
      "type": "logic_compare"
    },
    {
      "kind": "block",
      "type": "math_number"
    },
    {
      "kind": "block",
      "type": "math_arithmetic"
    },
    {
      "kind": "block",
      "type": "text"
    },
    {
      "kind": "block",
      "type": "text_print"
    },
  ]
}


const html_page = `<body>
<div class="demo">
  <p>This is a simple demo of injecting Blockly into a fixed-sized 'div' element.</p>
  <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
</div>
</body>
</html>`
document.body.innerHTML = html_page;



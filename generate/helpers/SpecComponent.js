const Component = require("./Component");

class SpecComponent extends Component {
  constructor(
    componentRoute,
    component,
    content,
    rootLocationExtension = "test"
  ) {
    super(componentRoute, component, content, rootLocationExtension);
    this.setWithSpecExtension(true);
  }
}

module.exports = SpecComponent;

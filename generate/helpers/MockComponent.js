const Component = require("./Component");

class MockComponent extends Component {
  constructor(
    componentRoute,
    component,
    content,
    rootLocationExtension = "test"
  ) {
    super(componentRoute, component, content, rootLocationExtension);
    this.setWithMockExtension(true);
  }
}

module.exports = MockComponent;

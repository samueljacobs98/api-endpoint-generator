class SpecComponent extends Component {
  constructor(
    componentRoute,
    component,
    content,
    rootLocationExtension = "test"
  ) {
    this.rootLocationExtension = rootLocationExtension;
    this.componentRoute = componentRoute;
    this.component = component;
    this.content = content;
    this.withSpecExtension = true;
  }
}

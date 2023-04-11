class Component {
  constructor(
    componentRoute,
    component,
    content,
    rootLocationExtension = "app"
  ) {
    this.componentRoute = componentRoute;
    this.component = component;
    this.content = content;
    this.rootLocationExtension = rootLocationExtension;
    this.withSpecExtension = false;
  }
}

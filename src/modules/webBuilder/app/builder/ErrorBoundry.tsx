import React from "react";
import { PropsWithChildren } from "react";

export class ErrorBountry extends React.Component<
  PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">Ups, something went wrong</div>;
    }

    return this.props.children;
  }
}

// Generated with util/create-component.js
  import React from "react";
  import D3TreeLinks from './_D3TreeLinks';
  // import D3TreeLinks from './D3TreeLinks';
  import "./TreeLinks.scss";

  // export const TreeLinks = ({ foo }) => (
  //     <div data-testid="TreeLinks" className="foo-bar">{foo}</div>
  // );

  class TreeLinks extends React.Component {
    static propTypes = {}
    componentDidMount() {
      this._chart = D3TreeLinks.create(
        this._rootNode,
        this.props.data,
        // this.props.config
      )
    }
    componentDidUpdate() {
      D3TreeLinks.update(
        this._rootNode,
        this.props.data,
        this.props.config,
        this._chart
      )
    }
    componentWillUnmount() {
      D3TreeLinks.destroy(this._rootNode);
    }

    render() {
      return <div className="d3-chart" ref={ chartRef => this._rootNode = chartRef } />
    }
  }

  export default TreeLinks;
  
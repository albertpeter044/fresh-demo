import * as React from 'preact';

function ControlPanel(props: any) {
  const polygonArea = 10;

  return (
    <div className="control-panel">
      <h3>Draw Polygon</h3>
      {polygonArea > 0 && (
        <p>
          {Math.round(polygonArea * 100) / 100} <br />
          square meters
        </p>
      )}
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/draw-polygon"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default ControlPanel;
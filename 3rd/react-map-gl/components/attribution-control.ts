import type {CSSProperties} from 'preact/compat';
import {memo} from 'preact/compat';
import {useEffect, } from 'preact/hooks';
import {applyReactStyle} from '../utils/apply-react-style.ts';
import useControl from './use-control.ts';

import type {ControlPosition, AttributionControlInstance} from '../types/index.ts';

export type AttributionControlProps<OptionsT> = OptionsT & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: CSSProperties;
};

function AttributionControl<AttributionControlOptions, ControlT extends AttributionControlInstance>(
  props: AttributionControlProps<AttributionControlOptions>
): null {
  const ctrl = useControl<ControlT>(
    ({mapLib}) => new mapLib.AttributionControl(props) as ControlT,
    {
      position: props.position
    }
  );

  useEffect(() => {
    applyReactStyle(ctrl._container!, props.style!);
  }, [props.style]);

  return null;
}

export default memo(AttributionControl);

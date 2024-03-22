import * as React from 'preact';
import {useEffect, memo, CSSProperties} from 'preact/compat';
import {applyReactStyle} from '../utils/apply-react-style.ts';
import useControl from './use-control.ts';

import type {ControlPosition, NavigationControlInstance} from '../types/index.ts';

export type NavigationControlProps<OptionsT> = OptionsT & {
  /** Placement of the control relative to the map. */
  position?: ControlPosition;
  /** CSS style override, applied to the control's container */
  style?: CSSProperties;
};

function NavigationControl<NavigationControlOptions, ControlT extends NavigationControlInstance>(
  props: NavigationControlProps<NavigationControlOptions>
): null {
  const ctrl = useControl<ControlT>(({mapLib}) => new mapLib.NavigationControl(props) as ControlT, {
    position: props.position
  });

  useEffect(() => {
    applyReactStyle(ctrl._container!, props.style!);
  }, [props.style]);

  return null;
}

export default memo(NavigationControl);

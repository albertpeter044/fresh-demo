import MapboxDraw from 'npm:@mapbox/mapbox-gl-draw';
import { useControl } from '@/3rd/react-map-gl/index.ts';

// const MapboxDraw = class GFG { 
//   constructor(name: string, course: string) { 
//       this.name = name; 
//       this.course = course; 
//   } 
//   name: string; 
//   course: string; 
// } 


import type { ControlPosition } from '@/3rd/react-map-gl/index.ts';

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: { features: any[]; }) => void;
  onUpdate?: (evt: { features: any[]; action: string; }) => void;
  onDelete?: (evt: { features: any[]; }) => void;
};

function MyCom(){
  return <div></div>
}
export default function DrawControl(props: DrawControlProps) {
  const a = <MyCom/>
  
  // useControl<MapboxDraw>(
  //   () => new MapboxDraw(props),
  //   ({ map }) => {
  //     map.on('draw.create', props.onCreate!);
  //     map.on('draw.update', props.onUpdate!);
  //     map.on('draw.delete', props.onDelete!);
  //   },
  //   ({ map }) => {
  //     map.off('draw.create', props.onCreate);
  //     map.off('draw.update', props.onUpdate);
  //     map.off('draw.delete', props.onDelete);
  //   },
  //   {
  //     position: props.position
  //   }
  // );

  return null;
}

DrawControl.defaultProps = {
  onCreate: () => { },
  onUpdate: () => { },
  onDelete: () => { }
};
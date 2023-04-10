const ANGLE_NAMES: (keyof AnglesType)[] = ["pt", "mt", "tl"];
export default function getMaxCobbAngle(anglesObject: AnglesType) {
  const angles = [
    anglesObject.pt.angle,
    anglesObject.mt.angle,
    anglesObject.tl.angle,
  ];
  const maxVal = Math.max(...angles);
  const index = angles.indexOf(maxVal);

  return {
    max: ANGLE_NAMES[index],
    value: maxVal,
  };
}

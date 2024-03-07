type GetCurvedPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  centerXOffset: number;
  centerYOffset: number;
};

export const getCurvedPath = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  centerXOffset,
  centerYOffset,
}: GetCurvedPathParams) => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return `M ${sourceX} ${sourceY} Q ${centerX + centerXOffset} ${
    centerY + centerYOffset
  } ${targetX} ${targetY}`;
};

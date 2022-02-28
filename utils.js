const calDistance = (a, b) => {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

const angle = (cx, cy, ex, ey) => {
  const dy = ey - cy;
  const dx = ex - cx;
  const theta = Math.atan2(dy, dx);
  return theta;
};

const getRelativePoint = (x, y, theta, r) => {
  const a = Math.cos(theta) * r + x;
  const b = Math.sin(theta) * r + y;
  return { a, b };
};

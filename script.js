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

const moveEye = (eye, midEye, e) => {
  const mouse = {
    x: e.clientX,
    y: e.clientY,
  };

  const {
    height: eyeHeight,
    width: eyeWidth,
    x: eyeX,
    y: eyeY,
  } = eye.getBoundingClientRect();

  const { width: midEyeWidth } = midEye.getBoundingClientRect();

  const r = eyeWidth / 2;

  const eyeCenterPos = {
    x: eyeX + eyeWidth / 2,
    y: eyeY + eyeHeight / 2,
  };

  const theta = angle(eyeCenterPos.x, eyeCenterPos.y, mouse.x, mouse.y);

  // cal vector dif between center and radius
  const finalR = r - midEyeWidth / 2;
  const { a: finalX, b: finalY } = getRelativePoint(
    eyeCenterPos.x,
    eyeCenterPos.y,
    theta,
    finalR
  );
  let eyeTrans;
  if (
    calDistance(eyeCenterPos, mouse) >
    calDistance(eyeCenterPos, { x: finalX, y: finalY })
  ) {
    eyeTrans = {
      x: finalX - eyeCenterPos.x,
      y: finalY - eyeCenterPos.y,
    };
  } else {
    eyeTrans = {
      x: mouse.x - eyeCenterPos.x,
      y: mouse.y - eyeCenterPos.y,
    };
  }
  midEye.style.transform = `translate(calc(-50% + ${eyeTrans.x}px), calc(-50% + ${eyeTrans.y}px))`;
};

document.addEventListener("mousemove", (e) => {
  const eye = document.querySelector(".outer-eye.left");
  const midEye = document.querySelector(".outer-eye.left .mid-eye");
  const eyeRight = document.querySelector(".outer-eye.right");
  const midEyeRight = document.querySelector(".outer-eye.right .mid-eye");

  moveEye(eye, midEye, e);
  moveEye(eyeRight, midEyeRight, e);
});

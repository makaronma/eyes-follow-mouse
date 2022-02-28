const moveEye = (eye, midEye, eyeRight, midEyeRight, e) => {
  const mouse = {
    x: e.clientX,
    y: e.clientY,
  };

  const { width: eyeWidth, x: eyeX, y: eyeY } = eye.getBoundingClientRect();
  const { x: eyeRightX, y: eyeRightY } = eyeRight.getBoundingClientRect();

  const { width: midEyeWidth } = midEye.getBoundingClientRect();

  const r = eyeWidth / 2;

  const eyeCenterPos = {
    x: eyeX + eyeWidth / 2,
    y: eyeY + eyeWidth / 2,
  };
  const eyeRightCenterPos = {
    x: eyeRightX + eyeWidth / 2,
    y: eyeRightY + eyeWidth / 2,
  };

  const thetaLeft = angle(eyeCenterPos.x, eyeCenterPos.y, mouse.x, mouse.y);
  const thetaRight = angle(
    eyeRightCenterPos.x,
    eyeRightCenterPos.y,
    mouse.x,
    mouse.y
  );
  const theta = (thetaLeft + thetaRight) / 2;

  // cal vector dif between center and radius
  const finalR = r - midEyeWidth / 2;
  const { a: finalX, b: finalY } = getRelativePoint(
    eyeCenterPos.x,
    eyeCenterPos.y,
    theta,
    finalR
  );

  const eyeTrans = { x: finalX - eyeCenterPos.x, y: finalY - eyeCenterPos.y };
  // const eyeTrans =
  //   calDistance(eyeCenterPos, mouse) >
  //   calDistance(eyeCenterPos, { x: finalX, y: finalY })
  //     ? {
  //         x: finalX - eyeCenterPos.x,
  //         y: finalY - eyeCenterPos.y,
  //       }
  //     : {
  //         x: mouse.x - eyeCenterPos.x,
  //         y: mouse.y - eyeCenterPos.y,
  //       };

  midEye.style.transform = `translate(calc(-50% + ${eyeTrans.x}px), calc(-50% + ${eyeTrans.y}px))`;
  midEyeRight.style.transform = `translate(calc(-50% + ${eyeTrans.x}px), calc(-50% + ${eyeTrans.y}px))`;
};

document.addEventListener("mousemove", (e) => {
  const eye = document.querySelector(".outer-eye.left");
  const midEye = document.querySelector(".outer-eye.left .mid-eye");
  const eyeRight = document.querySelector(".outer-eye.right");
  const midEyeRight = document.querySelector(".outer-eye.right .mid-eye");

  moveEye(eye, midEye, eyeRight, midEyeRight, e);
  // moveEye(eyeRight, midEyeRight, e);
});

function getCanvas(image: any) {
  const canvas = document.createElement("canvas");
  // canvas.style.position = "fixed";
  // canvas.style.left = "0";
  // canvas.style.top = "0";

  const img_width = image.width;
  const img_height = image.height;
  canvas.width = img_width / 4;
  canvas.height = img_height / 4;
  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(
    image,
    (-img_width * 3) / 8,
    (-img_height * 3) / 8,
    img_width,
    img_height,
  );
  const imageData = ctx.getImageData(0, 0, img_width, img_height);
  // const BodyElm: any = document.getElementsByTagName("body")[0];
  // BodyElm.appendChild(canvas);
  return imageData;
}

const getRGB = (imageData: any) => {
  const arrbox = [];
  const length = imageData.data.length;
  const img_width = imageData.width;
  const img_height = imageData.height;
  let r_all = 0;
  let g_all = 0;
  let b_all = 0;
  for (let i = 0; i < length; i++) {
    if (i % 4 === 0) {
      // const x = ((i / 4) % img_width) + 1; // 横坐标
      // const y = Math.floor(i / 4 / img_width) + 1; // 纵坐标
      // const alpha = Math.round((imageData.data[i + 3] / 255) * 100) / 100; // alpha 值
      if (imageData.data[i + 3] === 255) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        r_all += r;
        g_all += g;
        b_all += b;
        arrbox.push({
          r,
          g,
          b,
          color: `rgb(${r}, ${g}, ${b})`,
        });
      }
    }
  }
  const r_average = Math.round(r_all / arrbox.length);
  const g_average = Math.round(g_all / arrbox.length);
  const b_average = Math.round(b_all / arrbox.length);
  return `rgb(${r_average}, ${g_average}, ${b_average})`;
  //计算平均值
};

function getImgData2(url: string, callback: Function) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = url;
  image.onload = () => {
    const imgData = getCanvas(image);
    const rgb = getRGB(imgData);
    callback(rgb);
  };
}

export const getImgColor = (imgUrl: string) => {
  return new Promise((resolve, reject) => {
    getImgData2(
      imgUrl || "http://file.hedan.art/FkCEmjlIXG2wWo9SKqdjAgvBOtMq",
      (rgb: string) => {
        resolve(rgb);
      },
    );
  });
};

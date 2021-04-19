export type TImageHashResult = {
  href: string;
  revoke: () => void;
};

export type TImageHash =  (id: string) => Promise<TImageHashResult>;

const imageHash: TImageHash = (id) => new Promise((resolve) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const fontSize = 30;
  const fontFamily = 'arial';
  const wh = 200;
  canvas.width = wh;
  canvas.height = wh;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, wh, wh);
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'black';
  const symbols = id.split('');
  let k = 0;
  const parts = symbols.reduce<string[][]>((result, symbol) => {
    if (result[k]?.length > 8) {
      k+=1;
    }
    if (Array.isArray(result[k])) {
      result[k].push(symbol);
    } else {
      result[k] = [symbol];
    }
    return result;
  }, []);
  parts.forEach((part, index) => {
    ctx.fillText(part.join(''), wh / 2, fontSize * index + ((wh - fontSize * parts.length) / 2));
  });
  canvas.toBlob((blob) => {
    const href = URL.createObjectURL(blob)
    resolve({
      href,
      revoke: () => URL.revokeObjectURL(href),
    });
  });
});

export default imageHash;

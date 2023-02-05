const generateMagnet = (hash: string, name: string, trackers: string[]) => {
  const magnet = `magnet:?xt=urn:btih:${hash}&dn=${name}&tr=${trackers.join(
    "&tr="
  )}`;
  return magnet;
};

export default generateMagnet;

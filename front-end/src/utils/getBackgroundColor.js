const interpolateColor = (value, min, max, colorStart, colorEnd) => {
  const ratio = (value - min) / (max - min);
  const r1 = parseInt(colorStart.slice(1, 3), 16);
  const g1 = parseInt(colorStart.slice(3, 5), 16);
  const b1 = parseInt(colorStart.slice(5, 7), 16);
  const r2 = parseInt(colorEnd.slice(1, 3), 16);
  const g2 = parseInt(colorEnd.slice(3, 5), 16);
  const b2 = parseInt(colorEnd.slice(5, 7), 16);

  const r = Math.round(r1 + ratio * (r2 - r1));
  const g = Math.round(g1 + ratio * (g2 - g1));
  const b = Math.round(b1 + ratio * (b2 - b1));

  return `rgb(${r}, ${g}, ${b})`;
};

const getBackgroundColor = (value, type) => {
  if (type === "temperature") {
    return interpolateColor(value, 0, 50, "#FFB6B6", "#FF6F6F");
  } else if (type === "light") {
    return interpolateColor(value, 0, 1000, "#f8c20a", "#d3d3d3");
  } else if (type === "humidity") {
    return interpolateColor(value, 0, 100, "#a2c2eb", "#36A2EB");
  } else if (type === "wind") {
    return interpolateColor(value, 0, 100, "#b5eeb5", "#8df18d");
  }
  return "#e0e0e0";
};

export default getBackgroundColor;

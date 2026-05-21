export function renderGraph(ctx, nodes, links, options) {
  const { selectedId, scale, offsetX, offsetY, width, height } = options;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(offsetX + width / 2, offsetY + height / 2);
  ctx.scale(scale, scale);

  // Edges
  for (const link of links) {
    const source = nodes.find((n) => n.id === link.source);
    const target = nodes.find((n) => n.id === link.target);
    if (!source || !target) continue;

    ctx.beginPath();
    ctx.moveTo(source.x - width / 2, source.y - height / 2);
    ctx.lineTo(target.x - width / 2, target.y - height / 2);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1 / scale;
    ctx.stroke();
  }

  // Nodes
  for (const node of nodes) {
    const x = node.x - width / 2;
    const y = node.y - height / 2;
    const r = (node.id === selectedId ? 14 : 9) / scale;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle =
      node.id === selectedId
        ? "rgba(186, 230, 253, 0.9)"
        : "rgba(129, 140, 248, 0.72)";
    ctx.fill();

    if (node.id === selectedId) {
      ctx.shadowColor = "rgba(186, 230, 253, 0.5)";
      ctx.shadowBlur = 20 / scale;
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    }

    // Label
    const label = (node.label || node.title || "").slice(0, 30);
    if (label && scale > 0.4) {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = `${Math.max(10, 13 / scale)}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(label, x, y - r - 6 / scale);
    }
  }

  ctx.restore();
}

export function hitTest(node, mx, my, scale, offsetX, offsetY, width, height) {
  const x = (node.x - width / 2) * scale + offsetX + width / 2;
  const y = (node.y - height / 2) * scale + offsetY + height / 2;
  const r = (node.id ? 14 : 9) * scale;
  const dx = mx - x;
  const dy = my - y;
  return Math.hypot(dx, dy) < r + 6;
}

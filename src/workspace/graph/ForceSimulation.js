export default class ForceSimulation {
  constructor(nodes, links, { width, height }) {
    this.nodes = nodes.map((n) => ({ ...n, vx: 0, vy: 0 }));
    this.links = links;
    this.width = width;
    this.height = height;
    this.alpha = 1;
    this.alphaTarget = 0;
    this.alphaMin = 0.001;
    this.alphaDecay = 0.0228;
    this.velocityDecay = 0.4;
    this.centerX = width / 2;
    this.centerY = height / 2;
  }

  tick() {
    this.alpha += (this.alphaTarget - this.alpha) * this.alphaDecay;
    if (this.alpha < this.alphaMin) return false;

    // Repulsion
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[j].x - this.nodes[i].x;
        const dy = this.nodes[j].y - this.nodes[i].y;
        const dist = Math.max(Math.hypot(dx, dy), 1);
        const force = (600 * this.alpha) / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        this.nodes[i].vx -= fx;
        this.nodes[i].vy -= fy;
        this.nodes[j].vx += fx;
        this.nodes[j].vy += fy;
      }
    }

    // Attraction along edges
    for (const link of this.links) {
      const source = this.nodes.find((n) => n.id === link.source);
      const target = this.nodes.find((n) => n.id === link.target);
      if (!source || !target) continue;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.hypot(dx, dy) || 1;
      const force = (dist - (link.distance || 140)) * 0.02 * this.alpha;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      source.vx += fx;
      source.vy += fy;
      target.vx -= fx;
      target.vy -= fy;
    }

    // Centering
    for (const node of this.nodes) {
      node.vx += (this.centerX - node.x) * 0.002 * this.alpha;
      node.vy += (this.centerY - node.y) * 0.002 * this.alpha;
    }

    // Apply velocity
    for (const node of this.nodes) {
      node.x += node.vx;
      node.y += node.vy;
      node.vx *= this.velocityDecay;
      node.vy *= this.velocityDecay;
    }

    return true;
  }

  reheat() {
    this.alpha = 0.3;
  }
}

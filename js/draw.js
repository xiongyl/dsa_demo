function Node(value) {
	this.left = null;
	this.right = null;
	this.father = null;
	this.value = value;
	this.element = null;
	this.hlignl = null;
	this.hlignr = null;
};
Node.prototype = {
	appendleft: function(childNode) {
		this.left = childNode;
		childNode.father = this;
	},
	appendright: function(childNode) {
		this.right = childNode;
		childNode.father = this;
	},
	height: function() {
		var h = 0;
		if (this.left != null) {
			h = Math.max(h, this.left.height() + 1);
		}
		if (this.right != null) {
			h = Math.max(h, this.right.height() + 1);
		}
		return h;
	},
	isLeft: function() {
		return this.father != null && this.father.left == this;
	},
	isRight: function() {
		return this.father != null && this.father.right == this;
	},
	isLeaf: function() {
		return this.left == null && this.right == null;
	},
	draw: function(svg, x, y, scale) {
		if (isNaN(parseInt(scale))) {
			scale = 1;
		}
		this.getHlign();
		if (this.element == null) {
			var baseInterval = 30 * 2 * scale;
			var vlign = 40 * scale;
			if (this.left != null) {
				var leftInterval = this.left.hlignr * baseInterval;
				this.left.draw(svg, x + leftInterval * (0 - 0.5), y + vlign, scale);
			}
			if (this.right != null) {
				var rightInterval = this.right.hlignl * baseInterval;
				this.right.draw(svg, x + rightInterval * (1 - 0.5), y + vlign, scale);
			}
			this.element = svg.append("g");
			var lineStroke = "#1b1d1e";
			var lineStrokeWidth = 5 * scale + "px";
			var vlignOffset = 2.5 * scale;
			this.element.append("line")
					.attr("x1", 0).attr("y1", 0)
					.attr("x2", 0)
					.attr("y2", - (vlign + vlignOffset))
					.attr("stroke", lineStroke)
					.attr("stroke-width", lineStrokeWidth);
			if (this.isLeft()) {
				var interval = this.hlignr * baseInterval;
				this.element.append("line")
					.attr("x1", 0).attr("y1", -vlign)
					.attr("x2", -interval * (0 - 0.5))
					.attr("y2", -vlign)
					.attr("stroke", lineStroke)
					.attr("stroke-width", lineStrokeWidth);
			}else if(this.isRight()) {
				var interval = this.hlignl * baseInterval;
				this.element.append("line")
					.attr("x1", 0).attr("y1", -vlign)
					.attr("x2", -interval * (1 - 0.5))
					.attr("y2", -vlign)
					.attr("stroke", lineStroke)
					.attr("stroke-width", lineStrokeWidth);
			}
			this.element
				.attr("transform", "translate(" + x + "," + y + ")")
				.transition()
				.duration(1000)
				.delay(0)
				.attr("transform", "translate(" + x + "," + (y + 30) + ")");
			this.element.append("circle")
						.attr("r", 18 * scale)
						.style("stroke", "#ccc")
						.style("stroke-width", 3 * scale + "px")
						.style("fill", "#1b1d1e");
			txt = this.element.append("text")
				.attr("dy", 0.25 * scale + "em")
				.style("stroke", "#fff")
				.style("text-weight", "bold")
				.style("font-family", "Consolas")
				.style("font-size", 20 * scale + "px")
				.style("text-anchor", "middle")
				.style("fill", "#fff")
				.text(this.value);
		}
	},
	remove: function() {
		if (this.element != null) {
			this.element.remove();
		}
		if (this.left != null) {
			this.left.remove();
		}
		if (this.right != null) {
			this.right.remove();
		}
	},
	getHlign: function() {
		if (this.hlignl != null) return;
		if (this.left != null) {
			this.left.getHlign();
			this.hlignl = this.left.hlignl + this.left.hlignr;
		}else {
			this.hlignl = 1;
		}
		if (this.right != null) {
			this.right.getHlign();
			this.hlignr = this.right.hlignl + this.right.hlignr;
		}else {
			this.hlignr = 1;
		}
	}
};

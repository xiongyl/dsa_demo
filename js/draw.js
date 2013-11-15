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
	draw: function(svg, x, y) {
		this.getHlign();
		if (this.element == null) {
			var baseInterval = 30 * 2;
			var vlign = 40;
			if (this.left != null) {
				var leftInterval = this.left.hlignr * baseInterval;
				this.left.draw(svg, x + leftInterval * (0 - 0.5), y + vlign);
			}
			if (this.right != null) {
				var rightInterval = this.right.hlignl * baseInterval;
				this.right.draw(svg, x + rightInterval * (1 - 0.5), y + vlign);
			}
			this.element = svg.append("g");
			if (this.father == null) {
				this.element.append("line")
					.attr("x1", 0).attr("y1", 0)
					.attr("x2", 0)
					.attr("y2", -vlign)
					.attr("stroke-width", 2)
					.attr("stroke", "black");
			}else {
				if (this.isLeft()) {
					var interval = this.hlignr * baseInterval;
					this.element.append("line")
						.attr("x1", 0).attr("y1", 0)
						.attr("x2", -interval * (0 - 0.5))
						.attr("y2", -vlign)
						.attr("stroke-width", 2)
						.attr("stroke", "black");
				}else{
					var interval = this.hlignl * baseInterval;
					this.element.append("line")
						.attr("x1", 0).attr("y1", 0)
						.attr("x2", -interval * (1 - 0.5))
						.attr("y2", -vlign)
						.attr("stroke-width", 2)
						.attr("stroke", "black");
				}
			}
			this.element
				.attr("transform", "translate(" + x + "," + y + ")")
				.transition()
				.duration(1000)
				.delay(0)
				.attr("transform", "translate(" + x + "," + (y + 50) + ")");
			this.element.append("circle")
						.attr("r", 18)
						.style("fill", "#CCC")
			txt = this.element.append("text")
				.text(this.value);
			txt.style("fill", "black");
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

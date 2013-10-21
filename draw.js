function Node(value) {
	this.left = null;
	this.right = null;
	this.value = value;
	this.element = null;
};
Node.prototype = {
	appendleft: function(childNode) {
		this.left = {
			node: childNode,
			line: null,
		};
	},
	appendright: function(childNode) {
		this.right = {
			node: childNode,
			line: null,
		};
	},
	height: function() {
		var h = 0;
		if (this.left != null) {
			h = Math.max(h, this.left.node.height() + 1);
		}
		if (this.right != null) {
			h = Math.max(h, this.right.node.height() + 1);
		}
		return h;
	},
	draw: function(svg, x, y) {
		if (this.element == null) {
			this.element = svg.append("g");
			var interval = Math.pow(2, this.height()) * 30;
			if (this.left != null) {
				this.left.line = this.element.append("line")
					.attr("x1", 0).attr("y1", 0)
					.attr("x2", interval * (0 - 0.5))
					.attr("y2", 40)
					.attr("stroke-width", 2)
					.attr("stroke", "black");
				this.left.node.draw(svg, x + interval * (0 - 0.5), y + 40);
			}
			if (this.right != null) {
				this.right.line = this.element.append("line")
					.attr("x1", 0).attr("y1", 0)
					.attr("x2", interval * (1 - 0.5))
					.attr("y2", 40)
					.attr("stroke-width", 2)
					.attr("stroke", "black");
				this.right.node.draw(svg, x + interval * (1 - 0.5), y + 40);
			}
			
			this.element
				.attr("transform", "translate(" + x + "," + y + ")")
				.transition()
				.duration(1000)
				.delay(1000)
				.attr("transform", "translate(" + x + "," + (y + 50) + ")");
			this.element.append("circle")
						.attr("r", 20)
						.style("fill", "#CCC")
			this.element.append("text")
				.text(this.value)
				.style("fill", "black");
		}
	},
	remove: function() {
		if (this.element != null) {
			this.element.remove();
		}
		if (this.left != null) {
			this.left.node.remove();
		}
		if (this.right != null) {
			this.right.node.remove();
		}
	}
};

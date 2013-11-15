function TreeNode(value, id) {
	var my = new Object();
	my.value = value;
	my.id = id;
	my.left = null;
	my.right = null;
	my.father = null;
	my.height = 0;
	my.size = 1;

	my.update = function() {
		my.size = 1;
		my.height = 0;
		if (my.left != null) {
			my.size += my.left.size;
			my.height = Math.max(my.height, my.left.height + 1);
		}
		if (my.right != null) {
			my.size += my.right.size;
			my.height = Math.max(my.height, my.right.height + 1);
		}
	}

	my.isLeft = function() {
		if (my.father == null) return false;
		return my.father.left == my;
	}

	my.isRight = function() {
		if (my.father == null) return false;
		return my.father.right == my;
	}

	my.zig = function() {
		if (my.left == null) return;
		
		var u = my.left;
		if (my.isLeft()) my.father.left = u;
		else if (my.isRight()) my.father.right = u;
		u.father = my.father;
		
		my.left = u.right;
		u.right = my;
		
		my.father = u;
		if (my.left != null) my.left.father = my;

		my.update();
		u.update();
	}

	my.zag = function() {
		if (my.right == null) return;

		var u = my.right;
		if (my.isLeft()) my.father.left = u;
		else if (my.isRight()) my.father.right = u;
		u.father = my.father;
		
		my.right = u.left;
		u.left = my;
		
		my.father = u;
		if (my.right != null) my.right.father = my;

		my.update();
		u.update();
	}

	my.checkBalance = function() {
		var l = -1, r = -1;
		if (my.left != null) l = my.left.height;
		if (my.right != null) r= my.right.height;
		return Math.abs(l - r) <= 1;
	}

	my.isLeaf = function() {
		return my.left == null && my.right == null;
	}
	
	my.getHigher = function() {
		if (my.left == null) return my.right;
		if (my.right == null) return my.left;
		return my.left.height > my.right.height ?
				my.left : my.right;
	}
	
	my.reBalance = function() {
		u = my;
		v = u.getHigher();
		if (v == null) return;
		w = v.getHigher();
		if (w == null) return;
		if (u.left == v) {
			if (v.left == w) {
				u.zig();
				return "Single rotation: [" + u.value + "] right. ";
			}else {
				v.zag();
				u.zig();
				return "Double rotation: [" + v.value + "] left. [" + u.value + "] right. ";
			}
		}else {
			if (v.left == w) {
				v.zig();
				u.zag();
				return "Double rotation: [" + v.value + "] right. [" + u.value + "] left. ";
			}else {
				u.zag();
				return "Single rotation: [" + u.value + "] left. ";
			}
		}
	}
	
	my.splay = function() {
		var u = my;
		var ret = "";
		var value = u.value;
		while (true) {
			var v = u.father;
			if (v == null) {
				ret += "[" + value + "] splayed. ";
				return ret;
			}
			var w = v.father;
			if (w == null) {
				if (u.isLeft()) {
					v.zig();
					ret += "[" + v.value + "] zig. ";
				}
				else {
					v.zag();
					ret += "[" + v.value + "] zag. ";
				}
				ret += "[" + value + "] splayed. ";
				return ret;
			}
			if (w.left == v) {
				if (v.left == u) {
					w.zig();
					v.zig();
					ret += "[" + w.value + "] zig. ";
					ret += "[" + v.value + "] zig. ";
				}else {
					v.zag();
					w.zig();
					ret += "[" + v.value + "] zag. ";
					ret += "[" + w.value + "] zig. ";
				}
			}else {
				if (v.left == u) {
					v.zig();
					w.zag();
					ret += "[" + v.value + "] zig. ";
					ret += "[" + w.value + "] zag. ";
				}else {
					w.zag();
					v.zag();
					ret += "[" + w.value + "] zag. ";
					ret += "[" + v.value + "] zag. ";
				}
			}
		}
	}
	return my;
}

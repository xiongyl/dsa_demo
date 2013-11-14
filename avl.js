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
	return my;
}

function Avl() {
	var my = new Object();
	my.count = 0;
	my.root = null;
	my.process = "";

	my.size = function() {
		if (my.root == null) return 0;
		return my.root.size;
	}

	my.height = function() {
		if (my.root == null) return -1;
		return my.root.height;
	}

	my.insert = function (value) {
		if (my.root == null) {
			my.root = TreeNode(value, my.count ++);
			my.process = "New root [" + value + "] created. ";
		} else {
			my.process = "Inserting [" + value + "]. ";
			var u = my.root, v = null, w = null;
			while (u != null) {
				v = u;
				if (value == u.value) {
					my.process += "[" + value + "] = [" + u.value + "]. ";
					my.process += "[" + value + "] already exists. ";
					return;
				}
				if (value < u.value) {
					my.process += "[" + value + "] < [" + u.value + "]. ";
					u = u.left;
				}else{
					my.process += "[" + value + "] > [" + u.value + "]. "
					u = u.right;
				}
			}
			var node = TreeNode(value, my.count ++);
			if (v.value > value) v.left = node;
			else v.right = node;
			node.father = v;
			my.process += "[" + value + "] inserted. ";

			u = v;
			v = node;
			while (u != null) {
				u.update();
				if (u.checkBalance()) {
					v = u;
					u = u.father;
				}else {
					my.process += u.reBalance();
					u = v;
				}
			}
			my.root = v;
		}
	}

	my.remove = function(value) {
		my.process = "Deleting [" + value + "]. ";
		if (my.root == null) {
			my.process += "[" + value + "] not found. ";
			return;
		}
		var u = my.root, v = null, w = null;
		while (u != null) {
			if (value == u.value) {
				my.process += "[" + value + "] = [" + u.value + "]. ";
				break;
			}
			if (value < u.value) {
				my.process += "[" + value + "] < [" + u.value + "]. ";
				u = u.left;
			}else{
				my.process += "[" + value + "] > [" + u.value + "]. "
				u = u.right;
			}
		}
		if (u == null) {
			my.process += "[" + value + "] not found. ";
			return;
		}
		
		if (!u.isLeaf()) {//swaping
			if (u.left == null) {
				v = u.right;
				u.value = v.value;
				u.id = v.id;
				my.process += "Swaping with [" + v.value + "]. ";
			}else {
				w = u.left;
				v = w;
				while (w != null) {
					v = w;
					w = w.right;
				}
				u.value = v.value;
				u.id = v.id;
				my.process += "Swaping with [" + v.value + "]. ";
				if (v.left != null) {
					w = v;
					v = v.left;
					w.value = v.value;
					w.id = v.id;
					my.process += "Swaping with [" + v.value + "]. ";
				}
			}
		}else {
			v = u;
		}
		
		//delete leaf node v
		if (v.father == null) {
			my.root = null;
			my.process += "[" + value + "] deleted. ";
			return;
		}
		if (v.isLeft()) {
			v.father.left = null;
		}else {
			v.father.right = null;
		}
		my.process += "[" + value + "] deleted. ";
		
		//backtrack
		u = v.father;
		while (u != null) {
			u.update();
			if (u.checkBalance()) {
				v = u;
				u = u.father;
			}else {
				my.process += u.reBalance();
				u = v;
			}
		}
		my.root = v;

	}
	
	my.find = function(value) {
		my.process = "Finding [" + value + "]. ";
		var u = my.root;
		while (u != null) {
			if (value == u.value) {
				my.process += "[" + value + "] = [" + u.value + "]. ";
				my.process += "[" + value + "] found. ";
				return;
			}
			if (value < u.value) {
				my.process += "[" + value + "] < [" + u.value + "]. ";
				u = u.left;
			}else{
				my.process += "[" + value + "] > [" + u.value + "]. "
				u = u.right;
			}
		}
		my.process += "[" + value + "] not found. ";
	}

	return my;
}

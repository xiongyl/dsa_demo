function Splay() {
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
	
	my.insert = function(value, bbst) {
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
			if (bbst == false) {
				if (u != null) {
					return;
				}
				var node = TreeNode(value, my.count ++);
				if (v.value > value) v.left = node;
				else v.right = node;
				node.father = v;
				my.process += "[" + value + "] inserted. ";
				return;
			}
			my.process += v.splay();
			my.root = v;
			if (v.value == value) return;
			var node = TreeNode(value, my.count ++);
			v.father = node;
			if (v.value > value) {
				node.right = v;
				node.left = v.left;
				if (v.left != null) {
					v.left.father = node;
				}
				v.left = null;
			}
			else {
				node.left = v;
				node.right = v.right;
				if (v.right != null) {
					v.right.father = node;
				}
				v.right = null;
			}
			my.root = node;
			my.process += "Split at [" + value + "]. ";
			my.process += "[" + value + "] inserted. ";
		}
	}
	
	my.remove = function(value, swap, bbst) {
		if (swap == "rand") {
			if (Math.random() > 0.5) {
				swap = "succ";
			}else {
				swap = "pred";
			}
		}
		if (swap != "succ" && swap != "pred") {
			swap = "pred";
		}
		my.process = "Removing [" + value + "]. ";
		if (my.root == null) {
			my.process += "[" + value + "] not found. ";
			return;
		}
		var u = my.root, v = null, w = null;
		while (u != null) {
			v = u;
			if (value == u.value) {
				my.process += "[" + value + "] = [" + u.value + "]. ";
				my.process += "[" + value + "] found. ";
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
		}
		if (bbst == false) {
			if (u == null) return;
			if (!u.isLeaf()) {//swaping
				if (swap == "pred") {
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
					if (u.right == null) {
						v = u.left;
						u.value = v.value;
						u.id = v.id;
						my.process += "Swaping with [" + v.value + "]. ";
					}else {
						w = u.right;
						v = w;
						while (w != null) {
							v = w;
							w = w.left;
						}
						u.value = v.value;
						u.id = v.id;
						my.process += "Swaping with [" + v.value + "]. ";
						if (v.right != null) {
							w = v;
							v = v.right;
							w.value = v.value;
							w.id = v.id;
							my.process += "Swaping with [" + v.value + "]. ";
						}
					}
				}
			}else {
				v = u;
			}
			//delete leaf node v
			if (v.father == null) {
				my.root = null;
				my.process += "[" + value + "] removed. ";
				return;
			}
			if (v.isLeft()) {
				v.father.left = null;
			}else {
				v.father.right = null;
			}
			my.process += "[" + value + "] removed. ";
			
			return;
		}//bst
		my.process += v.splay();
		my.root = v;
		if (u == null) {
			return;
		}
		if (swap == "succ") {
			if (u.right != null) {
				v = u.right;
				while (v != null) {
					w = v;
					v = v.left;
				}
				my.process += w.splay();
				my.root = w;
				w.left = u.left;
				if (u.left != null) {
					u.left.father = w;
					my.process += "[" + w.value + "]-[" + u.left.value + "] joined. ";
				}
			}else {
				my.root = u.left;
				if (u.left != null) {
					u.left.father = null;
				}
			}
		}else {
			if (u.left != null) {
				v = u.left;
				while (v != null) {
					w = v;
					v = v.right;
				}
				my.process += w.splay();
				my.root = w;
				w.right = u.right;
				if (u.right != null) {
					u.right.father = w;
					my.process += "[" + w.value + "]-[" + u.right.value + "] joined. ";
				}
			}else {
				my.root = u.right;
				if (u.right != null) {
					u.right.father = null;
				}
			}
		}
		my.process += "[" + value + "] removed. ";
	}
	
	my.search = function(value, bbst) {
		my.process = "Searching [" + value + "]. ";
		var u = my.root;
		var v = null;
		while (u != null) {
			v = u;
			if (value == u.value) {
				my.process += "[" + value + "] = [" + u.value + "]. ";
				my.process += "[" + value + "] found. ";
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
		}
		if (v != null && bbst == true) {
			my.process += v.splay();
			my.root = v;			
		}
	}
	
	my.removeAll = function() {
		my.process = "Removing tree leaves in post-order. ";
		if (my.root != null) {
			my.process += my.root.post();
			my.root = null;
		}
		my.process += "All nodes have been removed. ";
	}
	
	my.clone = function() {
		var newtree = Splay();
		newtree.count = my.count;
		newtree.process = my.process;
		if (my.root != null) {
			newtree.root = my.root.clone();
		}
		return newtree;
	}
	return my;
}
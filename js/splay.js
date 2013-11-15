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
	
	my.insert = function(value) {
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
	
	my.remove = function(value) {
		my.process = "Deleting [" + value + "]. ";
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
		my.process += v.splay();
		my.root = v;
		if (u == null) {
			return;
		}
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
		my.process += "[" + value + "] deleted. ";
	}
	
	my.find = function(value) {
		my.process = "Finding [" + value + "]. ";
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
		if (v != null) {
			my.process += v.splay();
			my.root = v;			
		}
	}
	
	my.deleteAll = function() {
		my.process = "Deleting tree leaves in post-order. ";
		post = function(node) {
			ret = "";
			if (node == null) return ret;
			if (node.left != null) {
				ret +=  post(node.left);
			}
			if (node.right != null) {
				ret += post(node.right);
			}
			ret += "[" + node.value + "]. "
			return ret;
		}
		my.process += post(my.root);
		my.root = null;
		my.process += "All nodes have been deleted. ";
	}
	return my;
}
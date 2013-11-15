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
					my.process += u.splay();
					my.root = u;
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

			my.process += node.splay();
			my.root = node;
		}
	}
	
	my.remove = function(value) {}
	
	my.find = function(value) {
		my.process = "Finding [" + value + "]. ";
		var u = my.root;
		while (u != null) {
			if (value == u.value) {
				my.process += "[" + value + "] = [" + u.value + "]. ";
				my.process += "[" + value + "] found. ";
				my.process += u.splay();
				my.root = u;
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
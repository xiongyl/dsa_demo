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
	
	my.search = function(value) {
		my.process = "Searching [" + value + "]. ";
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
	
	my.removeAll = function() {
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

/*
 * avl.js
 * Copyright (C) 2013 mlckq <moon5ckq@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

function Avl() {
	var my = {
		root : null,
		count : 0,
		nullptr : {
			left : null,
			right : null,
			father : null,
			value : null,
			height : -1,
			size : 0,
			index : -1
		}
	};

	my.TreeNode = function(value) {
		var node = {
			left : my.nullptr,
			right : my.nullptr,
			father : my.nullptr,
			value : value,
			height : 0,
			size : 1,
			index : my.count ++
		};

		node.update = function() {
			node.size = 1 + node.left.size + node.right.size;
			node.height = 1 + Math.max(node.left.height, node.right.height);
		}

		node.isLeft = function() {
			return node.father.left == node;
		}

		node.isRight = function() {
			return node.father.right == node;
		}

		node.zig = function() {
			if (node.left == my.nullptr) return node;

			var u = node.left;
			node.left = u.right;
			u.right = node;
			
			if (node.isLeft()) node.father.left = u;
			else if (node.isRight()) node.father.right = u;
			u.father = node.father;
			node.father = u;
			if (node.left == my.nullptr) node.left.father = node;

			node.update();
			u.update();

			return u;
		}

		node.zag = function() {
			if (node.right == my.nullptr) return node;

			var u = node.right;
			node.right = u.left;
			u.left = node;

			if (node.isLeft()) node.father.left = u;
			else if (node.isRight()) node.father.right = u;
			u.father = node.father;
			node.father = u;
			if (node.right == my.nullptr) node.right.father = node;

			node.update();
			u.update();

			return u;
		}

		node.checkBalance = function() {
			return Math.abs(node.left.height - node.right.height) <= 1;
		}

		node.isLeaf = function() {
			return node.left == my.nullptr && node.right == my.nullptr;
		}

		node.getHigher = function() {
			return node.left.height > node.right.height ?
				node.left : node.right;
		}

		node.reBalance = function(v, w) {
			u = node;
			if (v == null) v = u.getHigher();
			if (w == null) w = v.getHigher();

			if (u.left == v)
				if (v.left == w) 
					return u.zig();
				else
					return v.zag().zig();
			else
				if (v.left == w)
					return v.zig().zag();
				else
					return u.zag();
		}
		
		return node;
	}

	my.insert = function (value) {
		if (my.root == null) {
			my.root = my.TreeNode(value);
			return my.root.index;
		} else {
			var u = my.root, v = null;
			while (u != my.nullptr) {
				v = u;
				if (u.value == value) return false;
				if (u.value > value) u = u.left;
				else u = u.right;
			}
			var node = my.TreeNode(value);
			if (v.value > value) v.left = node;
			else v.right = node;
			node.father = v;

			u = v;
			while (u != my.nullptr) {
				v = u;
				u.update();
				if (u.checkBalance())
					u = u.father;
				else
					u = u.reBalance();
			}

			my.root = v;
			return node.index;
		}
	}

	my.remove = function (value) {
		if (my.root == null) return false;
		var u = my.root, v = null, w = null;
		while (u != my.nullptr) {
			if (u.value == value) break;
			if (u.value > value) u = u.left;
			else u = u.right;
		}
		if (u == my.nullptr) return false;
		var index = u.index;
		
		while (u.right != my.nullptr) {
			v = u.right;
			while (v.left != my.nullptr)
				v = v.left;
			u.value = v.value;
			u.index = v.index;
			u = v;
		}
		if (my.root.size == 1) {
			my.root = null;
			return index;
		}
		if (u.left != my.nullptr) {
			u.left.father = u.father;
			if (u == my.root) {
				my.root = u.left;
				return index;
			}
		}
		if (u.isLeft()) u.father.left = u.left;
		else u.father.right = u.left;
		u = u.father;
		while (u != my.nullptr) {
			v = u;
			u.update();
			if (u.checkBalance())
				u = u.father;
			else
				u = u.reBalance();
		}
		return index;
	}
	
	return my;
}

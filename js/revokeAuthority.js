/* 创建人：张汉荣
 * 创建时间：2014/11/17 10:00
 * 
 * update:黄本豪  
 * date:2015/02/04
 * */

var zNodes_1;
var setting_1 = {
	check : {
		enable : true
	},
	data : {
		key : {
			name : "userName"
		},
		simpleData : {
			enable : true,
			idKey : "userAccount"
		}
	},
	view : {
		showIcon : false,
		addHoverDom : addHoverDomUser,
		removeHoverDom : removeHoverDomUser
	},
	callback : {
		onDblClick : zTree_OnDblClick
	}
};
var setting_2 = {
	check : {
		enable : true
	},
	data : {
		key : {
			name : "roleName",
		},
		simpleData : {
			enable : true,
			idKey : "roleCode",
			pIdKey : "applicationId"
		}
	},
	view : {
		showIcon : false,
		addHoverDom : addHoverDomRole,
		removeHoverDom : removeHoverDomRole
	},
	callback : {
		onDblClick : zTreeOnDblClick
	}
};
var setting_3 = {
	check : {
		enable : true
	},
	data : {
		key : {
			name : "roleName"
		},
		simpleData : {
			enable : true,
			idKey : "roleCode",
			pIdKey : "applicationId",
			rootPId : "0001"
		}
	},
	view : {
		showIcon : false,
		addHoverDom : addHoverDomRole,
		removeHoverDom : removeHoverDomRole
	},
	callback : {
		onDblClick : zTree_2OnDblClick
	}
};
var setting_4 = {
	check : {
		enable : true
	},
	data : {
		key : {
			name : "userName"
		},
		simpleData : {
			enable : true,
			idKey : "userAccount"
		}
	},
	view : {
		showIcon : false,
		addHoverDom : addHoverDomUser,
		removeHoverDom : removeHoverDomUser
	},
	callback : {
		onDblClick : zTree_4OnDblClick
	}
};
function loadUser() {
	$.ajax({
		type : "POST",
		contentType : "application/json",
		url : projectAllName + "/Admin/Users/listForImpower",
		dataType : 'json',
		async : false,
		data : {
			"jsons" : "{'userStatus':'Active'}"
		},
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		success : function(result) {
			if (result.result == 1) {
				var zNodes = result.datas.table.row;
				$.fn.zTree.init($("#treeOne"), setting_1, zNodes);
				// initTree(zNodes);
			}
		},
		error : function(result) {
			parent.$.messager.alert('错误提示', "获取数据失败！", 'error');
		}
	});
	ajaxLoadEnd();
}
function loadData(params, url) {
	ajaxLoading();
	if (parent.location.href.indexOf("manauth") > 1) {
		$
				.ajax({
					type : "POST",
					contentType : "application/json",
					url : projectAllName
							+ "/manauth/manauth_queryRoleByUser.shtml",
					dataType : 'json',
					async : false,
					data : {
						"jsons" : params
					},
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
					success : function(result) {
						var zNodes = result.datas.table.row.table.row;
						var arrayObj = new Array();
						for ( var item in zNodes) {
							var tempNodes1 = {};
							tempNodes1["roleCode"] = zNodes[item]["roleCode"];
							tempNodes1["roleName"] = zNodes[item]["roleName"];
							tempNodes1["applicationId"] = zNodes[item]["applicationId"];
							arrayObj.push(tempNodes1);
							var tempNodes2 = {};
							tempNodes2["roleCode"] = zNodes[item]["applicationId"];
							tempNodes2["roleName"] = zNodes[item]["application"];
							var flag2 = 1;
							for ( var item in arrayObj) { // 试了$.inArray
															// 居然对JSON对象无效
								if (arrayObj[item]["roleCode"] == tempNodes2["roleCode"]) {
									flag2 = 0;
								}
							}
							if (flag2 == 1) {
								arrayObj.push(tempNodes2);
							}
						}
						zNodes_1 = arrayObj;
						$.fn.zTree.init($("#treeTwo"), setting_2, zNodes_1);
					},
					error : function(result) {
						parent.$.messager.alert('错误提示', "获取数据失败！", 'error');
					}
				});
	} else {
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : url,
			dataType : 'json',
			async : false,
			data : {
				"jsons" : params
			},
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				var zNodes = result.datas.table.row;
				zNodes_1 = zNodes;

				$.fn.zTree.init($("#treeTwo"), setting_2, zNodes_1);
			},
			error : function(result) {
				parent.$.messager.alert('错误提示', "获取数据失败！", 'error');
			}
		});
	}
	ajaxLoadEnd();
}

// 双击节点事件, 双击某个节点，如该节点是子节点则将该节点添加到右边的树中，如该节点是父节点则将改父节点的所有子节点且子节点非父节点添加到右边树中-- >
function zTreeOnDblClick(event, treeId, treeNode) {
	var zTree_2 = $.fn.zTree.getZTreeObj("treeThree");
	if (treeNode.isParent) {
		var nodes = treeNode.children;
		get_Children(nodes, zTree_2);
	}
	// else if (isRoleType(treeNode)) {
	// return false;
	// }
	else {
		isRepeat(treeNode, zTree_2);
	}

};

// 判断节点是否为角色类型
function isRoleType(treeNode) {
	if (treeNode.roleType == null && treeNode.roleType != "04") {
		alert("角色类型不能添加！");
		return true;
	} else {
		return false;
	}
}
// 双击节点事件，双击某个节点将该节点从树中删除
function zTree_2OnDblClick(event, treeId, treeNode) {
	var zTree_2 = $.fn.zTree.getZTreeObj("treeThree");
	zTree_2.removeNode(treeNode);
	initUsers(zTree_2);
};
// 根据角色重新加载用户并重新初始化树
function initUsers(ztree) {
	// 重新初始化已选用户树
	$.fn.zTree.init($("#treeOne"), setting_4);
	// 根据所选角色加载用户
	var nodes = ztree.getNodes();
	for ( var item in nodes) {
		roleMatchingUsers(nodes[item]);
	}
}
// 添加选中节点
/*
 * 将甲树选中非父节点的子节点添加到乙树 参数： 例如： treeIdOne 甲树的id(不能有/) treeIdTwo 乙树的id(不能有/)
 * treeIds 命名方式为：甲乙两棵树id组合起来（甲树的id/乙树的id）
 */
function add_Nodes(treeIds) {
	var tree_Ids = treeIds.split("/");
	var zTree = $.fn.zTree.getZTreeObj(tree_Ids[0]);
	var zTree_2 = $.fn.zTree.getZTreeObj(tree_Ids[1]);
	nodes = zTree.getCheckedNodes(true);// 获取选中节点集合
	for ( var item in nodes) {
		if (!nodes[item].isParent) {
			isRepeat(nodes[item], zTree_2);
		}
	}
}
// 添加全部节点
/*
 * 将甲树全部非父节点的子节点添加到乙树 参数： 例如： treeIdOne 甲树的id(不能有/) treeIdTwo 乙树的id(不能有/)
 * treeIds 命名方式为：甲乙两棵树id组合起来（甲树的id/乙树的id）
 */
function add_AllNodes(treeIds) {
	var tree_Ids = treeIds.split("/");
	var zTree = $.fn.zTree.getZTreeObj(tree_Ids[0]);
	var zTree_2 = $.fn.zTree.getZTreeObj(tree_Ids[1]);
	nodes = zTree.getNodes();
	get_Children(nodes, zTree_2);
}
// 获取选中节点的子节点
/*
 * 参数： treeNodes 节点集合 zTree_2 节点集合所在树的ztree树对象
 */
function get_Children(treeNodes, zTree_2) {
	for ( var item in treeNodes) {
		if (treeNodes[item].isParent) {
			var children = treeNodes[item].children;// 获取该节点的子节点集合
			get_Children(children, zTree_2);
		} else {
			isRepeat(treeNodes[item], zTree_2);
		}
	}
}
// 删除选中节点
/*
 * 参数： treeId 删除节点的树id
 */
function delete_Nodes_2(treeId) {
	var zTree_2 = $.fn.zTree.getZTreeObj(treeId);
	var nodes = zTree_2.getCheckedNodes(true);// 获取选中节点集合
	for ( var item in nodes) {
		if (!nodes[item].isParent) {
			zTree_2.removeNode(nodes[item]);
		}
	}
	// initUsers(zTree_2);
}
function delete_Nodes(treeId) {
	var zTree_2 = $.fn.zTree.getZTreeObj(treeId);
	var nodes = zTree_2.getCheckedNodes(true);// 获取选中节点集合
	for ( var item in nodes) {
		if (!nodes[item].isParent) {
			zTree_2.removeNode(nodes[item]);
		}
	}
	initUsers(zTree_2);
}
// 删除全部节点
function delete_AllNodes() {
	var zTreeNodes = [];
	// 重新初始化树即删掉全部节点
	$.fn.zTree.init($("#treeThree"), setting_3, zTreeNodes);
	// 清空待选用户
	$.fn.zTree.init($("#treeOne"), setting_1);
}
// 搜索节点
function query_Nodes() {
	var nodeName = $("#node").val();
	// 去掉字符串内空格
	nodeName = $.trim(nodeName);
	if ((nodeName == "" && nodeName.length == 0) || nodeName == "请输入搜索条件") {
		// 重新初始化树
		$.fn.zTree.init($("#treeTwo"), setting_2, zNodes_1);
	} else {
		// 重新初始化树
		$.fn.zTree.init($("#treeTwo"), setting_2, zNodes_1);
		var zTree = $.fn.zTree.getZTreeObj("treeTwo");
		var treeNode = zTree.getNodesByParamFuzzy("roleName", nodeName, null);
		if (treeNode.length == 0) {
			alert(nodeName + "不存在!");
		} else {
			// 将搜索到的节点重新建立一棵树
			var zTreeNodes = [];
			$.fn.zTree.init($("#treeTwo"), setting_2, zTreeNodes);

			for ( var item in treeNode) {
				if (treeNode[item].isParent) {
					zTree.addNodes(null, treeNode[item]);
				} else {
					zTree.addNodes(null, {
						roleName : treeNode[item].roleName,
						roleCode : treeNode[item].roleCode
					});
				}
			}
		}
	}
	forbiddenNodes();
}
// 禁用已添加的节点
function forbiddenNodes() {
	var zTree = $.fn.zTree.getZTreeObj("treeTwo");
	var zTree_2 = $.fn.zTree.getZTreeObj("treeThree");
	var treeNodes = zTree_2.getNodes();
	var flage = "";
	for ( var item in treeNodes) {
		flage = zTree.getNodesByParam("roleName", treeNodes[item].roleName,
				null);
		if (flage.length != 0) {
			flage[0].checked = true;
			zTree.setChkDisabled(flage[0], true);
		}
	}
}
// 检查所添加的节点是否已存在
function isRepeat(treeNode, zTree) {
	// 如果该节点是角色类型直接跳出，不添加
	// if (isRoleType(treeNode)) {
	// return false;
	// }
	var flage = zTree.getNodeByParam("roleCode", treeNode.roleCode, null);
	if (flage == null) {
		zTree.addNodes(null, {
			roleName : treeNode.roleName,
			roleCode : treeNode.roleCode,
			roleType : treeNode.roleType,
			checked : true
		});
		// roleMatchingUsers(treeNode);
	} else {
		return false;
	}
}
// 显示用户自定义控件
function addHoverDomRole(treeId, treeNode) {

	if (treeNode.applicationId != null) {
		var aObj = $("#" + treeNode.tId + "_a");
		if ($("#diyBtn_" + treeNode.roleCode).length > 0)
			return;
		var editStr = "<span id='diyBtn_space_" + treeNode.roleCode
				+ "' ><\/span>"
				+ "<input type='image' src='../image/see.png' id='diyBtn_"
				+ treeNode.roleCode + "' title='" + treeNode.roleName
				+ "' onfocus='this.blur();'\/>";
		aObj.append(editStr);
		var btn = $("#diyBtn_" + treeNode.roleCode);
		if (btn)
			btn.bind("click", function() {
				var url = projectAllName + "/role/view.shtml?typeId=3&keyId="
						+ treeNode.roleCode;
				parent.parent.showWin(url, "角色详细", "info", "", "role");
			});
	}
};

function removeHoverDomRole(treeId, treeNode) {
	$("#diyBtn_" + treeNode.roleCode).unbind().remove();
	$("#diyBtn_space_" + treeNode.roleCode).unbind().remove();
};
// 显示用户自定义控件
function addHoverDomUser(treeId, treeNode) {
	var aObj = $("#" + treeNode.tId + "_a");
	if ($("#diyBtn_" + treeNode.userId).length > 0)
		return;
	var editStr = "<span id='diyBtn_space_" + treeNode.userId + "' ><\/span>"
			+ "<input type='image' src='../image/see.png' id='diyBtn_"
			+ treeNode.userId + "' title='" + treeNode.userName
			+ "' onfocus='this.blur();'\/>";
	aObj.append(editStr);
	var btn = $("#diyBtn_" + treeNode.userId);
	if (btn)
		btn.bind("click", function() {
            var url= projectAllName + "/user/info.shtml?path=/user/user_info&userId="+treeNode.userId;

			parent.parent.showWin(url, "用户详细", "info", "", "user");// projectAllName
		});
};

function removeHoverDomUser(treeId, treeNode) {
	$("#diyBtn_" + treeNode.userId).unbind().remove();
	$("#diyBtn_space_" + treeNode.userId).unbind().remove();
};

function expand_Nodes(treeNode, ztree) {
	var parentNode = treeNode.getParentNode();
	if (parentNode != null) {
		ztree.expandNode(parentNode, true, true, true);
	}
}

function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("treeTwo"), type = {
		"Y" : py + sy,
		"N" : pn + sn
	};
	zTree.setting.check.chkboxType = type;
}

// 初始化树
function initTree() {
	// $.fn.zTree.init($("#treeOne"), setting_1);
	$.fn.zTree.init($("#treeTwo"), setting_2);
	$.fn.zTree.init($("#treeThree"), setting_3);
	$.fn.zTree.init($("#treeFour"), setting_4);
	getSelectedUsers("treeFour");
}
/*
 * 
 * 待选用户和已选用户树事件
 * 
 */
// 搜索用户
function queryUsers() {
	var condition = $("#condition").val();
	var type = "2";
	if (parent.location.href.indexOf("users/list") > 1) {
		type = "1";
	}
	if (parent.location.href.indexOf("deptadmin/list") > 1) {
		type = "2";
	}
	if (parent.location.href.indexOf("orgadmin/list") > 1) {
		type = "3";
	}
	if (condition == "用户Id/用户账号/用户名称") {
		alert("请输入搜索条件！");
		return false;
	}
	$.ajax({
		type : "POST",
		contentType : "application/json",
		async : false,
		url : projectAllName + "/Admin/Component/queryUsers",
		dataType : "json",
		data : {
			"jsons" : condition,
			"type" : type
		},
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		success : function(datas) {
			if (datas.row.length == 0) {
				alert("没有找到匹配的用户！");
			} else {
				$.fn.zTree.init($("#treeOne"), setting_1, datas.row);
				forbiddenNodes_2();
			}
		},
		error : function(result) {
			alert("查询失败！");
		}
	});

}
// 检查所添加的节点是否已存在
function isRepeat_2(treeNode, zTree, source) {
	var flage = zTree.getNodeByParam("userId", treeNode.userId, null);
	if (flage == null) {
		zTree.addNodes(null, {
			userName : treeNode.userName,
			userAccount : treeNode.userAccount,
			userId : treeNode.userId,
			checked : true
		});
	} else {
		return false;
	}
}

// 禁用已添加的节点
function forbiddenNodes_2() {
	var zTree = $.fn.zTree.getZTreeObj("treeOne");
	var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
	var treeNodes = zTree_2.getNodes();
	var tree = zTree.getNodes();
	var flage = "";
	for ( var item in treeNodes) {
		flage = zTree.getNodesByParam("userId", treeNodes[item].userId, null);
		if (flage.length != 0) {
			flage[0].checked = true;
			zTree.setChkDisabled(flage[0], true);
		}
	}
}

function zTree_OnDblClick(event, treeId, treeNode) {
	var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
	if (treeNode.isParent) {
		var nodes = treeNode.children;
		get_Children_2(nodes, zTree_2);
	} else {
		isRepeat_2(treeNode, zTree_2);
	}
}

function zTree_4OnDblClick(event, treeId, treeNode) {
	var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
	zTree_2.removeNode(treeNode);
}
// 获取选中节点的子节点
/*
 * 参数： treeNodes 节点集合 zTree_2 节点集合所在树的ztree树对象
 */
function get_Children_2(treeNodes, zTree_2) {
	for ( var item in treeNodes) {
		if (treeNodes[item].isParent) {
			var children = treeNodes[item].children;// 获取该节点的子节点集合
			get_Children_2(children, zTree_2);
		} else {
			isRepeat_2(treeNodes[item], zTree_2);
		}
	}
}
// 添加选中节点
/*
 * 将甲树选中非父节点的子节点添加到乙树 参数： 例如： treeIdOne 甲树的id(不能有/) treeIdTwo 乙树的id(不能有/)
 * treeIds 命名方式为：甲乙两棵树id组合起来（甲树的id/乙树的id）
 */
function add_Nodes_2(treeIds) {
	var tree_Ids = treeIds.split("/");
	var zTree = $.fn.zTree.getZTreeObj(tree_Ids[0]);
	var zTree_2 = $.fn.zTree.getZTreeObj(tree_Ids[1]);
	var nodes = zTree.getCheckedNodes(true);// 获取选中节点集合
	for ( var item in nodes) {
		if (!nodes[item].isParent) {
			isRepeat_2(nodes[item], zTree_2);
		}
	}
}
// 添加全部节点
/*
 * 将甲树全部非父节点的子节点添加到乙树 参数： 例如： treeIdOne 甲树的id(不能有/) treeIdTwo 乙树的id(不能有/)
 * treeIds 命名方式为：甲乙两棵树id组合起来（甲树的id/乙树的id）
 */
function add_AllNodes_2(treeIds) {
	var tree_Ids = treeIds.split("/");
	var zTree = $.fn.zTree.getZTreeObj(tree_Ids[0]);
	var zTree_2 = $.fn.zTree.getZTreeObj(tree_Ids[1]);
	var nodes = zTree.getNodes();
	get_Children_2(nodes, zTree_2);
}
// 删除全部节点
function delete_AllNodes_2() {
	var zTreeNodes = [];
	// 重新初始化树即删掉全部节点
	$.fn.zTree.init($("#treeFour"), setting_4, zTreeNodes);
}
// 获取选中用户信息
function getSelectedUsers(treeId) {
	var nodes;
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var checkedItems = parent.getCheck();
	$.each(checkedItems, function(index, item) {
		// 将选中用户添加到树中
		var newNode = {
			userId : item.userId,
			userAccount : item.userAccount,
			userName : item.userName,
			organizations : item.organizations,
			organizationsName : item.organizationsName,
			checked : true
		};
		newNode = treeObj.addNodes(null, newNode);
		nodes = newNode;
	});

	var params = JSON.stringify({
		"isPush" : "1",
		"manageAuthedUserId" : uid,
		"userId" : nodes[0].userId
	});


    var params = JSON.stringify({"userId":nodes[0].userId});
   
    loadData(params, projectAllName + "/user/user_dept_role.shtml");
}

// 提交数据
function submit() {
	var zTree = $.fn.zTree.getZTreeObj("treeFour");
	var zTree_2 = $.fn.zTree.getZTreeObj("treeThree");
	var treeNodes = zTree.getCheckedNodes(true);// 获取选中节点集合
	var treeNodes_2 = zTree_2.getCheckedNodes(true);
	if (treeNodes_2.length == 0) {
		$.messager.alert("提示", "请选择角色！");
		return false;
	}
	if (treeNodes.length == 0) {
		$.messager.alert("提示", "请选择用户！");
		return false;
	}
	var jsonData = []
	for ( var item1 in treeNodes) {
		for ( var item in treeNodes_2) {
			var roleUser = {};
			roleUser.userId = treeNodes[item1].userId;
			roleUser.userName = treeNodes[item1].userName;
			roleUser.organizations = treeNodes[item1].organizations;
			roleUser.organizationsName = treeNodes[item1].organizationsName;
			roleUser.roleId = treeNodes_2[item].roleCode;
			roleUser.roleName = treeNodes_2[item].roleName;
			roleUser.empowerType = empowerType;
			jsonData.push(roleUser);
		}
	}

	ajaxLoading("正在处理，处理过程时间有点长，请耐心等候...");// --遮罩--
	if (parent.location.href.indexOf("manauth") > 1) {
		manauthSubmit();
	} else {
		$.ajax({
			type : "POST",
			url : projectAllName + "/impower/userRevokeAuthority.shtml",
			data : JSON.stringify(jsonData),
			contentType : "application/json",
			dataType : 'json',
			timeout : 10000000,
			success : function(jsonDatas) {
				parent.showRevokeAuthorityResult(jsonDatas.row);
				ajaxLoadEnd();// --移除遮罩--
			},
			error : function(jsonDatas) {
				ajaxLoadEnd();// --移除遮罩--
				$.messager.alert("错误提示", jsonDatas.info);
			}
		});
	}
}
// 机构授权回收提交
function manauthSubmit() {
	var zTree = $.fn.zTree.getZTreeObj("treeFour");
	var zTree_2 = $.fn.zTree.getZTreeObj("treeThree");
	var treeNodes = zTree.getNodes();
	var treeNodes_2 = zTree_2.getNodes();
	var usersId = "";
	var usersName = "";
	var rolesId = "";
	var rolesName = "";
	var organizations = "";
	var organizationsName = "";
	for ( var item in treeNodes_2) {
		rolesId = rolesId + treeNodes_2[item].roleCode + "⊙";
		rolesName = rolesName + treeNodes_2[item].roleName + "⊙";
	}
	if (rolesId == "") {
		$.messager.alert("提示", "请选择角色！");
		return false;
	} else {
		rolesId = rolesId.substring(0, rolesId.length - 1);
		rolesName = rolesName.substring(0, rolesName.length - 1);
	}
	for ( var item in treeNodes) {
		usersId = usersId + treeNodes[item].userId + "⊙";
		usersName = usersName + treeNodes[item].userName + "⊙";
		organizations = organizations + treeNodes[item].organizations + "⊙";
		organizationsName = organizationsName+ treeNodes[item].organizationsName + "⊙";
	}
	if (usersId == "") {
		$.messager.alert("提示", "请选择用户！");
		return false;
	} else {
		usersId = usersId.substring(0, usersId.length - 1);
		usersName = usersName.substring(0, usersName.length - 1);
		organizations = organizations.substring(0, organizations.length - 1);
		organizationsName = organizationsName.substring(0,organizationsName.length - 1);
	}
	ajaxLoading("正在处理，处理过程时间有点长，请耐心等候...");// --遮罩--
	var jarolecode = [];
	for (var rolecodeindex = 0; rolecodeindex < rolesId.split("⊙").length; rolecodeindex++) {
		var rolecode = rolesId.split("⊙")[rolecodeindex];
		jarolecode.push(rolecode);
	}
	var jauserid = [];
	for (var userindex = 0; userindex < usersId.split("⊙").length; userindex++) {
		var userid = usersId.split("⊙")[userindex];
		jauserid.push(userid);
	}
	var paramForManRevoke = {rowRoles : jarolecode,rowUsers : jauserid};
	$.ajax({
		type : "POST",
		url : projectAllName + "/manauth/manauthRevoke.shtml",
		data : {
			"jsons" : JSON.stringify(paramForManRevoke)
		},
		dataType : "JSON",
		timeout : 10000000,
		success : function(result) {
			ajaxLoadEnd();// --移除遮罩--
			$.messager.confirm('提示:', result.info, function(r) {
				if (r) {
					parent.closeRevokeAuthority();
				}
			});
		},
		error : function(result) {// --url获取数据失败处理--
			ajaxLoadEnd();// --移除遮罩--
			$.messager.confirm('提示:', '保存出现异常！', function(r) {
				if (r) {
					parent.closeRevokeAuthority();
				}
			});
		}
	});
}

// 根据角色查找用户
function roleMatchingUsers(treeNode) {
	var roleCode = treeNode.roleCode;
	var roleType = treeNode.roleType;
	// alert(roleCode+roleType);
	// 提交表单

	$.ajax({
		type : "POST",
		contentType : "application/json",
		async : false,
		url : projectAllName + "/Admin/Component/roleMatchingUsers",
		dataType : "json",
		data : {
			"roleCode" : roleCode,
			"roleType" : roleType
		},
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		success : function(datas) {
			if (datas.result == "1") {
				var users = datas.datas.table.row;
				var zTree = $.fn.zTree.getZTreeObj("treeOne");
				for ( var item in users) {
					isRepeat_2(users[item], zTree);
				}
				for ( var item in users) {
					var node = zTree.getNodeByParam("userId",
							users[item].userId, null);
					zTree.checkNode(node, false, false);
				}
			} else if (datas.result == "2") {
				alert("拥有" + treeNode.roleName + "角色的用户加载失败！");
			}
		},
		error : function(datas) {
			$.messager.alert("错误提示", "获取数据异常，请联系管理员！");
		}
	});
}
$(document).ready(function() {
	// var params = "searchRoleType";
	/*
	 * if(parent.location.href.indexOf("users/list")>1){ loadUser(); }
	 */
	// loadData(params, projectAllName + "/Admin/Component/loadRole");
	initTree();
});
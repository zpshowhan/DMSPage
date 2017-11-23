 
 var zNodes ={  
    "total":11,  
    "page":1,  
    "records":11,  
    "rows":[  
        {"appId":"001","roleName":"4A系统","roleId":"001"},  
        {"applicationId":"001","roleName":"系统管理员","roleId":"1"},
        {"applicationId":"001","roleName":"机构管理员","roleId":"2"},
        {"applicationId":"001","roleName":"部门管理员","roleId":"3"},
        {"appId":"002","roleName":"船员系统","roleId":"002"},  
        {"applicationId":"002","roleName":"船员管理员","roleId":"4"},
        {"applicationId":"002","roleName":"船员","roleId":"5"},
        {"applicationId":"002","roleName":"船员管理员","roleId":"6"},
        {"applicationId":"002","roleName":"船员","roleId":"7"},
        {"applicationId":"002","roleName":"船员管理员","roleId":"8"},
        {"applicationId":"002","roleName":"船员","roleId":"9"},
        {"applicationId":"002","roleName":"船员管理员","roleId":"10"},
        {"applicationId":"002","roleName":"船员","roleId":"11"},
        {"applicationId":"002","roleName":"船员管理员","roleId":"12"},
        {"applicationId":"002","roleName":"船员","roleId":"13"},

    ]  
}


var users ={  
    "total":11,  
    "page":1,  
    "records":11,  
    "rows":[  
        {'orgId':'00','userNameNew':'交通部海事局',"userAccount":"00"},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'00','orgName':'交通部海事局'},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'00','orgName':'交通部海事局'},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'00','orgName':'交通部海事局'},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'00','orgName':'交通部海事局'},
         {'orgCode':'00','userNameNew':'上海海事局',"userAccount":"01"},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'01','orgName':'上海海事局'},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'01','orgName':'上海海事局'},
        {'orgCode':'00','userNameNew':'天津海事局',"userAccount":"02"},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'02','orgName':'天津海事局'},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'02','orgName':'天津海事局'},
        {"userAccount":"211223199007010831","userNameNew":"测试","userName":"测试",'orgCode':'02','orgName':'天津海事局'},
         
       
    ]  
}


 var projectAllName="";
var zNodes_1;
var setting_1 = {
    check :  {
        enable : true
    },
    data :  {
        key :  {
            name : "userNameNew"
        },
         simpleData :  {
            enable : true, idKey : "userAccount", pIdKey : "orgCode"
        }
    },
    view :  {
        showIcon : false, addHoverDom : addHoverDomUser1, removeHoverDom : removeHoverDomUser1
    },
    callback :  {
        onDblClick : zTreeOnDblClick_1
    }
};

var setting_3 = {
    check :  {
        enable : true
    },
    data :  {
        key :  {
            name : "roleName"
        },
        simpleData :  {
            enable : true, idKey : "roleId", pIdKey : "applicationId"
        }
    },
    view :  {
        showIcon : false, addHoverDom : addHoverDomRole3, removeHoverDom : removeHoverDomRole3
    },
    callback :  {
        onDblClick : zTreeOnDblClick_3
    }
};

var setting_2 = {
    check :  {
        enable : true
    },
    data :  {
        key :  {

            name : "userName"
        },
        simpleData :  {
            enable : true, idKey : "userAccount"
        }
    },
    view :  {
        showIcon : false, addHoverDom : addHoverDomUser2, removeHoverDom : removeHoverDomUser2
    },
    callback :  {
        onDblClick : zTreeOnDblClick_2
    }
};

var setting_4 = {
    check :  {
        enable : true
    },
    data :  {
        key :  {
            name : "roleName"
        },
        simpleData :  {
            enable : true, idKey : "roleId", pIdKey : "applicationId"
        }
    },
    view :  {
        showIcon : false, addHoverDom : addHoverDomRole4, removeHoverDom : removeHoverDomRole4
    },
    callback :  {
        onDblClick : zTreeOnDblClick_4
    }
};

function loadData(params, url) {
    ajaxLoading();
    $.ajax( {
        type : "POST", contentType : "application/json", url : url, dataType : 'json', async : false, data :  {
            "params" : params
        },
        contentType : "application/x-www-form-urlencoded; charset=utf-8", success : function (result) {
            if(result.result == 1){
                //var zNodes = result.datas.table.row;
                zNodes_1 = zNodes;
                //查询到角色再初始化树
                initTree(zNodes);
            }
        },
        error : function (result) {
            parent.$.messager.alert('错误提示', "获取数据失败！", 'error');
        }
    });
    ajaxLoadEnd();
}
function loadUser() {
	var u = getUrlParam('userId');
    $.ajax( {
        type : "POST", contentType : "application/json", 
        url :  projectAllName + "/Admin/Users/listForImpower", 
        dataType : 'json',
        async : false,
        data :  {
            "jsons" : "{'userStatus':'Active','orgCode':'"+orgCode+"','deptCode':'"+deptCode+"','userId':'"+u+"'}"
        },
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        success : function (result) {
            if(result.result == 1){
                var zNodes = result.datas.table.row;
                $.fn.zTree.init($("#treeOne"), setting_1,zNodes);     
                  
                //initTree(zNodes);
            }
        },
        error : function (result) {
            parent.$.messager.alert('错误提示', "获取数据失败！", 'error');
        }
    });
    ajaxLoadEnd();
}
//双击节点事件, 双击某个节点，如该节点是子节点则将该节点添加到右边的树中，如该节点是父节点则将改父节点的所有子节点且子节点非父节点添加到右边树中-- > 
function zTreeOnDblClick_3(event, treeId, treeNode) {
    var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
    if (treeNode.isParent) {
        var nodes = treeNode.children;
        get_Children(nodes, zTree_2);
    }
    //    else if (isRoleType(treeNode)) {
    //        return false;
    //    }
    else {
        isRepeat(treeNode, zTree_2);
    }

};
//双击节点事件，双击某个节点将该节点从树中删除
function zTreeOnDblClick_4(event, treeId, treeNode) {
    var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
    zTree_2.removeNode(treeNode);
};
//  < !--添加选中节点-- > 
function add_Nodes() {
    var zTree = $.fn.zTree.getZTreeObj("treeThree");
    var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
    var nodes = zTree.getCheckedNodes(true);//获取选中节点集合
    for (var item in nodes) {
        if (!nodes[item].isParent) {
            isRepeat(nodes[item], zTree_2);
        }
    }
}
//添加全部节点 
function add_AllNodes() {
    var zTree = $.fn.zTree.getZTreeObj("treeThree");
    var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
    var nodes = zTree.getNodes();
    get_Children(nodes, zTree_2);
}
//获取选中节点的子节点
function get_Children(treeNode, zTree_2) {
    for (var item in treeNode) {
        if (treeNode[item].isParent) {
            var children = treeNode[item].children;//获取该节点的子节点集合
            get_Children(children, zTree_2);
        }
        else {
            isRepeat(treeNode[item], zTree_2);
        }
    }
}
//删除选中节点
function delete_Nodes() {
    var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
    var nodes = zTree_2.getCheckedNodes(true);//获取选中节点集合
    for (var item in nodes) {
        if (!nodes[item].isParent) {
            zTree_2.removeNode(nodes[item]);
        }
    }
}
//删除全部节点
function delete_AllNodes() {
    var zTreeNodes = [];
    //重新初始化树即删掉全部节点
    $.fn.zTree.init($("#treeFour"), setting_4, zTreeNodes);
}
//搜索节点
function query_Nodes() {
    var nodeName = $("#node").val();
    //去掉字符串内空格
    nodeName = $.trim(nodeName);
    if ((nodeName == "" && nodeName.length == 0) || nodeName == "请输入搜索条件") {
        //重新初始化树
        $.fn.zTree.init($("#treeThree"), setting_3, zNodes_1);
    }
    else {
        //重新初始化树
        $.fn.zTree.init($("#treeThree"), setting_3, zNodes_1);
        var zTree = $.fn.zTree.getZTreeObj("treeThree");
        var treeNode = zTree.getNodesByParamFuzzy("roleName", nodeName, null);
        if (treeNode.length == 0) {
//            alert(nodeName + "不存在!");
            $.messager.alert("错误提示", nodeName + "不存在!");
        }
        else {
            //将搜索到的节点重新建立一棵树				
            var zTreeNodes = [];
            $.fn.zTree.init($("#treeThree"), setting_3, zTreeNodes);
            for (var item in treeNode) {
                if (treeNode[item].isParent) {
                    zTree.addNodes(null, treeNode[item]);
                }
                else {
                    zTree.addNodes(null, 
                    {
                        roleName : treeNode[item].roleName, roleId : treeNode[item].roleId
                    });
                }
            }
        }
    }

    forbiddenNodes();

}
//禁用已添加的节点
function forbiddenNodes() {
    var zTree = $.fn.zTree.getZTreeObj("treeThree");
    var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
    var treeNodes = zTree_2.getNodes();
    var flage = "";
    for (var item in treeNodes) {
        flage = zTree.getNodesByParam("roleId", treeNodes[item].roleId, null);
        if (flage.length != 0) {
            flage[0].checked = true;
            zTree.setChkDisabled(flage[0], true);
        }
    }
}
//检查所添加的节点是否已存在 
function isRepeat(treeNode, zTree) {
    //如果该节点是角色类型直接跳出，不添加
    //    if (isRoleType(treeNode)) {
    //        return false;
    //    }
    var flage = zTree.getNodeByParam("roleId", treeNode.roleId, null);
    if (flage == null) {
        zTree.addNodes(null, 
        {
            roleName : treeNode.roleName, roleId : treeNode.roleId, checked : true
        });
        // checkNode("roleId",treeNode,zTree);
    }
    else {
        return false;
    }
}

//判断节点是否为角色类型
function isRoleType(treeNode) {
    if (treeNode.roleType == null && treeNode.roleId != "04") {
//        alert("角色类型不能添加！");
            $.messager.alert("错误提示", "角色类型不能添加！");
        return true;
    }
    else {
        return false;
    }
}
//显示用户自定义控件
function addHoverDomUser1(treeId, treeNode) {
    var aObj = $("#" + treeNode.tId + "_a");
    if(typeof($("#diyBtn1_" + treeNode.userId).attr("id")) =="undefined"){
        var editStr = "<span id='diyBtn_space1_" + treeNode.userId + "' ><\/span>" + "<input type='image' src='../../ua/img/see.png' id='diyBtn1_" + treeNode.userId + "' title='" + treeNode.userName + "' onfocus='this.blur();'\/>";
        aObj.append(editStr);
        var btn = $("#diyBtn1_" + treeNode.userId);
        if (btn)
            btn.bind("click", function () {
                var url= projectAllName + "/Admin/Users/info.action?userId=" + treeNode.userId + "&actionType=info";
                parent.parent.showWin(url, "用户详细", "info", "","user");//projectAllName
            });
    }
};

function removeHoverDomUser1(treeId, treeNode) {
    $("#diyBtn1_" + treeNode.userId).unbind().remove();
    $("#diyBtn_space1_" + treeNode.userId).unbind().remove();
};

//显示用户自定义控件
function addHoverDomUser2(treeId, treeNode) {
    var aObj = $("#" + treeNode.tId + "_a");
    if(typeof($("#diyBtn2_" + treeNode.userId).attr("id")) =="undefined"){
        var editStr = "<span id='diyBtn_space2_" + treeNode.userId + "' ><\/span>" + "<input type='image' src='../../ua/img/see.png' id='diyBtn2_" + treeNode.userId + "' title='" + treeNode.userName + "' onfocus='this.blur();'\/>";
        aObj.append(editStr);
        
        var btn = $("#diyBtn2_" + treeNode.userId);
        if (btn)
            btn.bind("click", function () {
                var url= projectAllName + "/Admin/Users/info.action?userId=" + treeNode.userId + "&actionType=info";
                parent.parent.showWin(url, "用户详细", "info", "","user");//projectAllName
            });
    }
};

function removeHoverDomUser2(treeId, treeNode) {
    $("#diyBtn2_" + treeNode.userId).unbind().remove();
    $("#diyBtn_space2_" + treeNode.userId).unbind().remove();
};


//显示用户自定义控件
function addHoverDomRole3(treeId, treeNode) {
    var aObj = $("#" + treeNode.tId + "_a");
    if ($("#diyBtn_" + treeNode.roleId).length > 0)
        return;
    var editStr = "<span id='diyBtn_space_" + treeNode.roleId + "' ><\/span>" + "<input type='image' src='../../ua/img/see.png' id='diyBtn_" + treeNode.roleId + "' title='" + treeNode.roleName + "' onfocus='this.blur();'\/>";
    aObj.append(editStr);
    var btn = $("#diyBtn_" + treeNode.roleId);
    if (btn)
        btn.bind("click", function () {
            parent.parent.showWin("role/info.jsp?roleCode=" + treeNode.roleId, "角色详细", "info", "","role");
        });
};

function removeHoverDomRole3(treeId, treeNode) {
    $("#diyBtn_" + treeNode.roleId).unbind().remove();
    $("#diyBtn_space_" + treeNode.roleId).unbind().remove();
};
//显示用户自定义控件
function addHoverDomRole4(treeId, treeNode) {
    var aObj = $("#" + treeNode.tId + "_a");
    if(typeof($("#diyBtn4_" + treeNode.roleId).attr("id")) =="undefined"){
        var editStr = "<span id='diyBtn_space4_" + treeNode.roleId + "' ><\/span>" + "<input type='image' src='../../ua/img/see.png' id='diyBtn4_" + treeNode.roleId + "' title='" + treeNode.roleName + "' onfocus='this.blur();'\/>";
        aObj.append(editStr);
        
        var btn = $("#diyBtn4_" + treeNode.roleId);
        if (btn)
            btn.bind("click", function () {
                parent.parent.showWin("role/info.jsp?roleCode=" + treeNode.roleId, "角色详细", "info", "","role");
            });
    }
};

function removeHoverDomRole4(treeId, treeNode) {
    $("#diyBtn4_" + treeNode.roleId).unbind().remove();
    $("#diyBtn_space4_" + treeNode.roleId).unbind().remove();
};

function expand_Nodes(treeNode, ztree) {
    var parentNode = treeNode.getParentNode();
    if (parentNode != null) {
        ztree.expandNode(parentNode, true, true, true);
    }
}
//获取选中用户信息
function getSelectedUsers(treeId) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var checkedItems = [];
    if(tt == "")
        checkedItems = parent.getCheck();
    for(var item in checkedItems){
    	var newNode = {
    	        userId : checkedItems[item].userId, userAccount : checkedItems[item].userAccount, userName : checkedItems[item].userName, organizations : checkedItems[item].organizations, organizationsName : checkedItems[item].organizationsName, checked : true
    	};
    	  newNode = treeObj.addNodes(null, newNode);
    }
}

function setCheck() {
    var zTree = $.fn.zTree.getZTreeObj("treeThree"), type = {
        "Y" : py + sy, "N" : pn + sn
    };
    zTree.setting.check.chkboxType = type;
}

function initTree(zNodes) {
 //   $.fn.zTree.init($("#treeOne"), setting_1);
    $.fn.zTree.init($("#treeTwo"), setting_2);
    $.fn.zTree.init($("#treeThree"), setting_3, zNodes);
    $.fn.zTree.init($("#treeFour"), setting_4);
    getSelectedUsers("treeTwo");
}
//--窗口遮罩--
function ajaxLoading() {
    $("<div class=\"datagrid-mask\"></div>").css( {
        display : "block", width : "100%", height : $(window).height()
    }).appendTo("body");
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理, 请稍候...").appendTo("body").css( {
        display : "block", left : ($(document.body).outerWidth(true) - 139) / 2, top : ($(window).height() - 45) / 2
    });
}
//--窗口遮罩--
function ajaxLoading(text) {
    $("<div class=\"datagrid-mask\"></div>").css( {
        display : "block", width : "100%", height : $(window).height()
    }).appendTo("body");
    $("<div class=\"datagrid-mask-msg\"></div>").html(text).appendTo("body").css( {
        display : "block", left : ($(document.body).outerWidth(true) - 139) / 2, top : ($(window).height() - 45) / 2
    });
}
//--移掉窗口遮罩--
function ajaxLoadEnd() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}
//提交数据
function submit() {
    var zTree = $.fn.zTree.getZTreeObj("treeTwo");
    var zTree_2 = $.fn.zTree.getZTreeObj("treeFour");
    var treeNodes = zTree.getNodes();
    var treeNodes_2 = zTree_2.getNodes();
    var usersId = "";
    var usersName = "";
    var rolesId = "";
    var rolesName = "";
    var organizations = "";
    var organizationsName = "";
    for (var item in treeNodes_2) {
    	var checked_2 = treeNodes_2[item].checked;
        if(checked_2==false){
         continue;
        }
    	
        rolesId = rolesId + treeNodes_2[item].roleId + "⊙";
        rolesName = rolesName + treeNodes_2[item].roleName + "⊙";
    }
    if (rolesId == "") {
        $.messager.alert("提示", "请选择角色！");
        return false;
    }
    else {
        rolesId = rolesId.substring(0, rolesId.length - 1);
        rolesName = rolesName.substring(0, rolesName.length - 1);
    }
    var count=treeNodes.length;
    for (var item in treeNodes) {
    	var checked = treeNodes[item].checked;
        if(checked ==false){
         count=treeNodes.length-1;
         continue;
        }
        if(treeNodes[item].userId==uid&&count>1){
            $.messager.alert("提示", "部门管理员不可以与其他用户一起授权");
            return false;
       }
        usersId = usersId + treeNodes[item].userId + "⊙";
        usersName = usersName + treeNodes[item].userName + "⊙";
        organizations = organizations + treeNodes[item].organizations + "⊙";
        organizationsName = organizationsName + treeNodes[item].organizationsName + "⊙";
    }
    if (usersId == "") {
        $.messager.alert("提示", "请选择用户！");
        return false;
    }
    else {
        usersId = usersId.substring(0, usersId.length - 1);
        usersName = usersName.substring(0, usersName.length - 1);
        organizations = organizations.substring(0, organizations.length - 1);
        organizationsName = organizationsName.substring(0, organizationsName.length - 1);
    }
    $("#usersId").val(usersId);
    $("#usersName").val(usersName);
    $("#rolesId").val(rolesId);
    $("#rolesName").val(rolesName);
    $("#organizations").val(organizations);
    $("#organizationsName").val(organizationsName);
    $("#empowerType").val(empowerType);
    var jsonD="";
    ajaxLoading("正在处理，处理过程时间有点长，请耐心等候...");//--遮罩--
    //提交表单
    $.ajax( {
        type : "POST", url : projectAllName + "/Admin/Component/userImpower.action", data : $("#userImpower").serialize(), dataType : "JSON", 
        timeout :10000000,
        success : function (jsonDatas) {
            if(jsonDatas.result==0)
            {
                $.messager.alert('提示信息', "<div style='text-align:center;'>"+jsonDatas.info+"<\/div>");
                ajaxLoadEnd();//--移除遮罩--   
               return
            }   
             if(jsonDatas.result==2)
            {
                $.messager.alert('提示信息', "<div style='text-align:center;'>"+jsonDatas.info+"<\/div>");
                ajaxLoadEnd();//--移除遮罩--   
               return
            }
             
             if(jsonDatas.result==4)
             {
                 $.messager.alert('提示信息', "<div style='text-align:center;'>"+jsonDatas.info+"<\/div>");
                 ajaxLoadEnd();//--移除遮罩--   
                return
             }    
             
            parent.showUserImpowerRsult(jsonDatas.row);
            jsonD=jsonDatas;
            if(jsonDatas.row[0].result.indexOf("互斥")<0){
                if(tt == "2"){        
                var user = parent.getCheck();
                  $("#usersId").val(user[0].userId);
                  $("#usersName").val(user[0].userName);
                  $("#rolesId").val(rolesId);
                  $("#rolesName").val(rolesName);
                  $("#organizations").val(user[0].organizations);
                  $("#organizationsName").val(user[0].orgName);
                  $("#userIdNew").val(userIdNew);       
                  $("#userNameNew").val(userNameNew); 
                  //提交表单
                  $.ajax( {
                      type : "POST",
                      url : projectAllName + "/Admin/Component/revokeAuthority.action", 
                      data : $("#userImpower").serialize(), dataType : "JSON", 
                      success : function (jsonDatas) {
                          
                      },
                      error : function (jsonDatas) {
                      }
                  });
              }
            }
            ajaxLoadEnd();//--移除遮罩--   
        },
        error : function (jsonDatas) {        
            ajaxLoadEnd();//--移除遮罩--
            $.messager.alert("错误提示", jsonDatas.info);
        }
    });
    
}
/*
 * 
 * 待选用户和已选用户树事件
 * 
 * */
//搜索用户
function queryUsers() {
    var condition = $("#condition").val();
    var type="2";
    if(parent.location.href.indexOf("users/list")>1){
        type="1";
    }
    if(parent.location.href.indexOf("deptadmin/list")>1){
        type="2";
    }
    if(parent.location.href.indexOf("orgadmin/list")>1){
        type="3";
    }
    if (condition == "用户Id/用户账号/用户名称") {
//        alert("请输入搜索条件！");
            $.messager.alert("错误提示", "请输入搜索条件！");
        return false;
    }
    $.ajax( {
        type : "POST", contentType : "application/json", url : projectAllName + "/Admin/Component/queryUsers", dataType : "json", data :  {
            "jsons" : condition , "type":type
        },
        contentType : "application/x-www-form-urlencoded; charset=utf-8", success : function (datas) {
            if (datas.row.length == 0) {
                $.messager.alert("错误提示", "没有找到匹配的用户！");
            }
            else {
                $.fn.zTree.init($("#treeOne"), setting_1, datas.row);
                forbiddenNodes_2();
            }
        },
        error : function (result) {
//            alert("查询失败！");
            $.messager.alert("错误提示", "查询失败！");
        }
    });

}
//检查所添加的节点是否已存在 
function isRepeat_2(treeNode, zTree) {
    
    var flage = zTree.getNodeByParam("userAccount", treeNode.userAccount, null);
    userIdNew = treeNode.userAccount;
    userNameNew = treeNode.userName;
    if (flage == null) {
        zTree.addNodes(null, 
        {
            userName : treeNode.userName, userAccount : treeNode.userAccount, userId : treeNode.userId, checked : true
        });
    }
    else {
        return false;
    }
}

//禁用已添加的节点
function forbiddenNodes_2() {
    var zTree = $.fn.zTree.getZTreeObj("treeOne");
    var zTree_2 = $.fn.zTree.getZTreeObj("treeTwo");
    var treeNodes = zTree_2.getNodes();
    var tree = zTree.getNodes();
    var flage = "";
    for (var item in treeNodes) {
        flage = zTree.getNodesByParam("userId", treeNodes[item].userId, null);
        if (flage.length != 0) {
            flage[0].checked = true;
            zTree.setChkDisabled(flage[0], true);
        }
    }
}

function zTreeOnDblClick_1(event, treeId, treeNode) {
    var zTree_2 = $.fn.zTree.getZTreeObj("treeTwo");
    if (treeNode.isParent) {
        var nodes = treeNode.children;
    
        get_Children_2(nodes, zTree_2);
    }
    else {
    	
        
        var nodes = [];
        nodes.push(treeNode);
        
        for (var item in nodes) {
        	var userId=	nodes[item].userId;
        	   if(userId.length>19){
        		   $.messager.alert('提示', "账户非法，不能设置管理员权限");
        		   return;
        	   }
        }
        
        for (var item in nodes) {
        	var userId=	nodes[item].userId;
        	   if(userId==uid){
        		   $.messager.alert('提示', "该用户已是管理员，不可在添加管理员权限。");
        		   return;
        	   }
        }
        
        
        
        if((type == "CMPLEVEL" || type == "CMPDEPT") && tt == "1" && checkUsers(nodes, type)){  
            if(type == "CMPLEVEL")
                $.messager.alert('提示', "同一机构不能添加多个机构层级管理员！", 'info');
            else
                $.messager.alert('提示', "同一部门不能添加多个部门层级管理员！", 'info');
                    
            return;
        }
        
        isRepeat_2(treeNode, zTree_2);
    }
}

function zTreeOnDblClick_2(event, treeId, treeNode) {
    var zTree_2 = $.fn.zTree.getZTreeObj("treeTwo");
    zTree_2.removeNode(treeNode);
}
//获取选中节点的子节点
/*参数：
 * treeNodes 节点集合
 * zTree_2   节点集合所在树的ztree树对象
 * */
function get_Children_2(treeNodes, zTree_2) {
    for (var item in treeNodes) {
        if (treeNodes[item].isParent) {
            var children = treeNodes[item].children;//获取该节点的子节点集合            
    
            get_Children_2(children, zTree_2);
        }
        else {
            
            isRepeat_2(treeNodes[item], zTree_2);
        }
    }
}
 
function SearchDatas(url,type) {
	$.ajax( {
        type : "POST",
        contentType : "application/json",
        url : url, 
        dataType : 'json',
        async : false,
        data :  {
            "orgCode" : orgCode,
            "type":type
        },
        contentType : "application/x-www-form-urlencoded; charset=utf-8", 
        success : function (result) {
            if(result.result == 1){
                 rows = result.row;
            }
        },
	});
}
//添加选中节点
/*将甲树选中非父节点的子节点添加到乙树
 * 参数：
 * 例如：
 * treeIdOne  甲树的id(不能有/)
 * treeIdTwo  乙树的id(不能有/)
 * treeIds    命名方式为：甲乙两棵树id组合起来（甲树的id/乙树的id）
 * */
function add_Nodes_2(treeIds) {
    var tree_Ids = treeIds.split("/");
    var zTree = $.fn.zTree.getZTreeObj(tree_Ids[0]);
    var zTree_2 = $.fn.zTree.getZTreeObj(tree_Ids[1]);
    var nodes = zTree.getCheckedNodes(true);//获取选中节点集合
    
     
    for (var item in nodes) {
    	 
        if (!nodes[item].isParent) {
            isRepeat_2(nodes[item], zTree_2);
        }
    }
}
function checkUsers(nodes, type,rows){
    var result =false;
    if(getUrlParam('jspType')!=null){
        for(var ir in rows){
            for(var ino in nodes){      
                if(type == "CMPLEVEL" && rows[ir].orgCode == nodes[ino].orgnazations){
                    result = true;
                    break;
                }              
                else if(type == "CMPDEPT" && rows[ir].departments == nodes[ino].departments){
                    result = true;
                    break;
                }
            }
            
            if(result)
                break;
        }
    }else{
    	 var rows = parent.getAllUser();
    	    for(var ir in rows){
    	        for(var ino in nodes){      
    	            if(type == "CMPLEVEL" && rows[ir].orgCode == nodes[ino].orgnazations){
    	                result = true;
    	                break;
    	            }              
    	            else if(type == "CMPDEPT" && rows[ir].departments == nodes[ino].departments){
    	                result = true;
    	                break;
    	            }
    	        }
    	        
    	        if(result)
    	            break;
    	    }
    	
    }
   
    return result;
}

function getUrlParam(usreId){
    return "";

}
//添加全部节点 
/*将甲树全部非父节点的子节点添加到乙树
 * 参数：
 * 例如：
 * treeIdOne  甲树的id(不能有/)
 * treeIdTwo  乙树的id(不能有/)
 * treeIds    命名方式为：甲乙两棵树id组合起来（甲树的id/乙树的id）
 * */
function add_AllNodes_2(treeIds) {
    var tree_Ids = treeIds.split("/");
    var zTree = $.fn.zTree.getZTreeObj(tree_Ids[0]);
    var zTree_2 = $.fn.zTree.getZTreeObj(tree_Ids[1]);
    var nodes = zTree.getNodes();
    get_Children(nodes, zTree_2);
    //   for (var item in nodes) {
    //     isRepeat_2(nodes[item], zTree_2);
    //   }
}
//删除全部节点
function delete_AllNodes_2() {
    var zTreeNodes = [];
    //重新初始化树即删掉全部节点
    $.fn.zTree.init($("#treeTwo"), setting_2, zTreeNodes);
}
var rows = "";
var type= "";
var tt= "";
var userIdNew="";
var userNameNew="";
$(document).ready(function () {
    $.fn.zTree.init($("#treeOne"), setting_1,users.rows);
    
    initTree(zNodes.rows);

         
		//取消
		$('#canelBtn').on('click', function(){
		    parent.window.location.reload();
            var index = parent.layer.getFrameIndex(window.name); 
            parent.layer.close(index);
		})  
	    //刷新
		$('#refresh').on('click', function(){
               	  $("#table_list_org").trigger("reloadGrid");  
		});	
    
});
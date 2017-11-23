/*这个控件从后台取出数据（json）然后根据传回来的数据构建成一棵树。
 * 用户选中控件树中某个节点时将该节点的部分信息返回到输入框。该控件适用
 * 海事机构选择等。
 * 参数：
 *  input_Id        返回节点数据的输入框id
 *  pId_Key         父节点id
 *  root_PId        根节点id
 *  id_Key          节点id
 *  url             接口url
 *  jsons           接口参数json
 *  nodeName        节点名称
 *  treeId          树的id
 *  
 *  创建人:张汉荣
 *  创建时间：2014/11/07  14:00
 * */

var inputId;
var rootPId_1;
var pIdKey_1;
var idKey_1;
var node_Name;
//调用接口查询数据
function loadData(url, treeId) {
    var params = "{\"table\":{\"row\":{\"orgClass\":\"Branch\"}}}";
    //加载海事机构数据
    $.ajax( {
        type : "POST", contentType : "application/json", url : url,async : true, dataType : 'json', data :  {
            "params" : params
        },
        contentType : "application/x-www-form-urlencoded; charset=utf-8", success : function (result) {
            //alert(result);
            var zNodes = result.datas.table.row;
            // alert(zNodes[0].ORGCODE);
            initTree(zNodes, treeId);
        },
        error : function (result) {
        }
    })
    //    var data = {"datas":{"table":{"tableName":"JC_HSJG","row":[{"SJHSJGDM":"000000","ZWQC":"中华人民共和国深圳海事局","ZWJC":"深圳海事局","HSJGDM":"140000"},{"SJHSJGDM":"140000","ZWQC":"中华人民共和国大亚湾海事处","ZWJC":"大亚湾海事局","HSJGDM":"140100"},{"SJHSJGDM":"140000","ZWQC":"中华人民共和国蛇口海事处","ZWJC":"蛇口海事局","HSJGDM":"140200"},{"SJHSJGDM":"140000","ZWQC":"中华人民共和国盐田海事处","ZWJC":"盐田海事局","HSJGDM":"140300"},{"SJHSJGDM":"140000","ZWQC":"中华人民共和国宝安海事处","ZWJC":"宝安海事局","HSJGDM":"140400"},{"SJHSJGDM":"140000","ZWQC":"中华人民共和国南山海事处","ZWJC":"南山海事局","HSJGDM":"140500"},{"SJHSJGDM":"140000","ZWQC":"中华人民共和国大铲海事处","ZWJC":"大铲海事局","HSJGDM":"140600"}]}},"result":"1","info":"查询成功"} ; 
    //    var zNodes= data.datas.table.row;
}
//初始化树
function initTree(zNodes, treeId) {
    var setting = {
        view :  {
            dblClickExpand : true
        },
        data :  {
            key :  {
                name : node_Name
            },
            simpleData :  {
                enable : true, idKey : idKey_1, pIdKey : pIdKey_1, rootPId : rootPId_1
            }
        },
        callback :  {
            onClick : onClick
        }
    };
    $.fn.zTree.init($("#" + treeId), setting, zNodes);
    expand_Nodes(treeId);
}

function loadOrg(input_Id, nodeName, root_PId, pId_Key, id_Key, treeId, url) {
    inputId = input_Id;
    rootPId_1 = root_PId;
    pIdKey_1 = pId_Key;
    idKey_1 = id_Key;
    node_Name = nodeName;
        $("#" + inputId).after('<button class="ztreeButton" name="' + inputId + '" style="margin-left:0px" onclick="showMenu(this);return false;"><span class="caret ztreeSpan"><\/span><\/button><div  class="menuContent" style="display:none; position: absolute;min-width:148px;max-height:500px;overflow:scroll;z-index:200000"><ul id="' + treeId + '" class="ztree" style="margin-top:0;position:relative;"><\/ul><\/div>');
    loadData(url, treeId);
}
//取出选中节点的数据
function onClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId), nodes = zTree.getSelectedNodes(), v = "", dm = "";
    nodes.sort(function compare(a, b) {
        return a.id - b.id;
    });
    if (nodes.length) {
        $("#" + inputId).attr("value", nodes[0][node_Name]);
        $("#" + inputId).attr("data", nodes[0][idKey_1]);
        if($("#" + inputId).hasClass("requiredChange")){
            checkRequired($("#" + inputId));
        }
    }
    hideMenu();
    //机构树查询时 onClickZtreeToQuery() 方法自定义
    if (typeof onClickZtreeToQuery === 'function' && nodes.length) {
        onClickZtreeToQuery();
    }
}
//显示树形菜单
function showMenu(objId){
    //取出输入框的id或按钮的name
    if (objId.id != "") {
        inputId = objId.id;
    }
    else {
        inputId = objId.name;
    }
    $("#" + inputId).parent().find('[class="menuContent"]').toggle();
    $("body").bind("mouseup", onBodyDown);
}

//隐藏树形菜单
function hideMenu() {
    $("[class='menuContent']").fadeOut("fast");
    $("body").unbind("mouseup", onBodyDown);
}
//展开根节点
function expand_Nodes(treeId) {
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var nodes = treeObj.getNodes();
    for (var item in nodes) {
        treeObj.expandNode(nodes[item], true, false, false);
    }
}

function onBodyDown(event) {
    if (!(event.target.nodeName == "LI" || event.target.nodeName == "SPAN" || event.target.nodeName == "UL")) {
        hideMenu();
    }
}
/* 海事机构多选控件 
 * 创建人：张汉荣
 * 创建时间：2014/11/12
 * 参数：
 * input_Id 返回输入框id(id中不能有_)
 * treeId   下拉框树的id(命名方式：input_Id的名称后面加_treeId)
 * idKey    节点id
 * pIdKey   父节点id
 * nodeName 节点名称
 * */
var id_Key_2;
//var pId_Key_2;
var node_Name_2;
var input_Id_2;
function loadMultiple(input_Id,treeId,idKey,nodeName,url) {
    id_Key_2 = idKey;
//    pId_Key_2 = pIdKey;
    node_Name_2 = nodeName;
    input_Id_2 = input_Id;
    var setting_2 = {
        view :  {
            dblClickExpand : false
        },
        data :  {
            key :  {
                name : node_Name_2
            },
            simpleData :  {
                enable : true, idKey : id_Key_2   
            }
        },
        callback :  {
            beforeClick : beforeClick_1, onCheck : onCheck_1, onClick : onCheck_1, beforeCheck : beforeCheck_1
        },
        check :  {
            enable : true, chkStyle : "checkbox", autoCheckTrigger : true
        },
        view :  {
            showLine : false, showIcon : false
        }
    };
   $.ajax( {
        type : "POST", contentType : "application/json", url : url,async : false, dataType : 'json', 
        contentType : "application/x-www-form-urlencoded; charset=utf-8", success : function (result) {
            $("#" + input_Id).after('<button class="ztreeButton" name="' + input_Id + '" style="margin-left:0px" onclick="showMenu(this);return false;"><span class="caret ztreeSpan"><\/span><\/button><div  class="menuContent" style="display:none; position: absolute;min-width:198px"><ul id="' + treeId + '" class="ztree" style="margin-top:0;position:relative;"><\/ul><\/div>');
            $.fn.zTree.init($("#"+treeId), setting_2, result.datas.table.row);
        },
        error : function (result) {
        }
    })
    
   
}
function beforeClick_1(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return true;
}

function beforeCheck_1(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    return true;
};
//获取选中的节点
function onCheck_1(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId), nodes = zTree.getCheckedNodes(true), v = "", dm = "";
    for (var i = 0, l = nodes.length;i < l;i++) {
        v += nodes[i][node_Name_2] + ",";
        dm += nodes[i][id_Key_2] + ",";
    }
    if (v.length > 0) {
        v = v.substring(0, v.length - 1);
        dm = dm.substring(0, dm.length - 1);
    }
    var item = "";
    if (typeof (treeId.split("_")[1]) != "undefined") {
        item = "_" + treeId.split("_")[1];
        treeId = treeId.split("_")[0]
    }
    var input_Id = treeId.split("_");
    var inputIdObj = $("#"+input_Id[0]);
    inputIdObj.attr("value", v);
    inputIdObj.attr("title", v);
    inputIdObj.attr("data", dm);
    if(inputIdObj.hasClass("requiredChange")){
            checkRequired(inputIdObj);
    }
}
//获取节点的位置
/*
 * 参数说明
 * treeId 树的ID
 * idKey  节点属性名
 * keyValue  节点属性值
 * 
 * */
function setCheck(treeId,idKey,keyValue){
    var treeObj =  $.fn.zTree.getZTreeObj(treeId);
    //根据属性值找到节点
    keyValue = keyValue.split(",");
    for(var item in keyValue){
        var nodes = treeObj.getNodesByParam(idKey, keyValue[item], null);
        treeObj.checkNode(nodes[0], true, true);
    }
}
function getNodePosition(treeId,idKey,keyValue){
    var treeObj =  $.fn.zTree.getZTreeObj(treeId);
    //根据属性值找到节点
    var nodes = treeObj.getNodesByParam(idKey, keyValue, null);
    //展开到节点位置
    treeObj.expandNode(nodes,false,true,false);
}

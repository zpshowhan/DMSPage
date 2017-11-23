/**
 * BotGrid
 * rwy
 * 2017-6-24
 */
 function createGrid(gridId,options){ 
    

   $("#"+gridId).jqGrid({
				data : mydata,
				datatype : "local",
				height : 450,
				autowidth : true,
				shrinkToFit : true,
				rowNum : 20,
				rowList : [ 10, 20, 30 ],
				colNames : [ "序号", "日期", "客户", "金额", "运费", "总额", "备注" ],
				colModel : [ {
					name : "id",
					index : "id",
					editable : true,
					width : 60,
					sorttype : "int",
					search : true,
					formatter:showName
				}, {
					name : "invdate",
					index : "invdate",
					editable : true,
					width : 90,
					sorttype : "date",
					formatter : "date"
				}, {
					name : "name",
					index : "name",
					editable : true,
					width : 100
				}, {
					name : "amount",
					index : "amount",
					editable : true,
					width : 80,
					align : "right",
					sorttype : "float",
					formatter : "number"
				}, {
					name : "tax",
					index : "tax",
					editable : true,
					width : 80,
					align : "right",
					sorttype : "float"
				}, {
					name : "total",
					index : "total",
					editable : true,
					width : 80,
					align : "right",
					sorttype : "float"
				}, {
					name : "note",
					index : "note",
					editable : true,
					width : 100,
					sortable : false
				} ],
				pager : "#pager_list_2",
				viewrecords : true,
				//caption : "jqGrid 示例2",
				multiselect: true,
// 				add : true,
// 				edit : true, 
// 				addtext : "Add",
// 				edittext : "Edit",
				hidegrid : true
			}); 
 }
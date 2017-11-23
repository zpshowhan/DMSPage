$(function(){
	var y=echarts.init(document.getElementById("echarts-force-chart")),
		p={title:{text:"权限关系：统一身份认证系统",subtext:"数据来自人立方",x:"right",y:"bottom"},
		tooltip:{trigger:"item",formatter:"{a} : {b}"},toolbox:{show:!0,feature:{restore:{show:!0},
		magicType:{show:!0,type:["force","chord"]},
		saveAsImage:{show:!0}}},legend:{x:"left",data:["权限","角色"]},
		series:[{type:"force",name:"权限关系",ribbonType:!1,
			categories:[{name:"人物"},{name:"权限"},{name:"角色"}],
			itemStyle:{normal:{label:{show:!0,textStyle:{color:"#333"}},
			nodeStyle:{brushType:"both",borderColor:"rgba(255,215,0,0.4)",borderWidth:1},
			linkStyle:{type:"curve"}},emphasis:{label:{show:!1},nodeStyle:{},linkStyle:{}}},
			useWorker:!1,minRadius:15,maxRadius:25,gravity:1.1,scaling:1.1,roam:"move",
			nodes:[{category:0,name:"统一身份认证系统",value:10},
				{category:1,name:"组织机构管理",value:7},
				{category:1,name:"部门管理",value:7},
				{category:1,name:"用户管理",value:7},
				{category:1,name:"权限管理",value:7},
				{category:2,name:"超级管理员",value:5},
				{category:2,name:"（CMP）管理员",value:8},
				{category:2,name:"（CSP）管理员",value:9},
				{category:2,name:"机构层级管理员",value:4},
				{category:2,name:"部门层级管理员",value:4},
				{category:2,name:"船员管理员",value:1},
				{category:1,name:"增加",value:4},
				{category:1,name:"修改",value:4},
				{category:1,name:"删除",value:4},
				{category:1,name:"详情",value:4}
				],
		links:[
			{source:"组织机构管理",target:"统一身份认证系统",weight:1,name:"女儿"},
			{source:"部门管理",target:"统一身份认证系统",weight:2,name:"父亲"},
			{source:"用户管理",target:"统一身份认证系统",weight:1,name:"母亲"},
			{source:"权限管理",target:"统一身份认证系统",weight:2},
			{source:"超级管理员",target:"统一身份认证系统",weight:3,name:"合伙人"},
			{source:"（CMP）管理员",target:"统一身份认证系统",weight:1},
			{source:"（CSP）管理员",target:"统一身份认证系统",weight:6,name:"竞争对手"},
			{source:"机构层级管理员",target:"统一身份认证系统",weight:1,name:"爱将"},
			{source:"部门层级管理员",target:"统一身份认证系统",weight:1},
			{source:"船员管理员",target:"统一身份认证系统",weight:1},
			{source:"用户管理",target:"部门管理",weight:1},
			{source:"（CMP）管理员",target:"部门管理",weight:1},
			{source:"（CMP）管理员",target:"用户管理",weight:1},
			{source:"（CMP）管理员",target:"权限管理",weight:1},
			{source:"（CMP）管理员",target:"超级管理员",weight:1},
			{source:"（CSP）管理员",target:"（CMP）管理员",weight:6},
			{source:"（CSP）管理员",target:"用户管理",weight:1},
			{source:"部门层级管理员",target:"（CMP）管理员",weight:1},
			{source:"增加",target:"用户管理",weight:1},
			{source:"修改",target:"用户管理",weight:1},
			{source:"删除",target:"部门管理",weight:1},
			{source:"增加",target:"部门管理",weight:1},
			{source:"详情",target:"权限管理",weight:1}
			]
		}]};
		y.setOption(p),$(window).resize(y.resize);
            
     });

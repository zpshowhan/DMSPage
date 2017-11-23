
/**
 * 计算从昨天开始往前days天数的日期数组，用于echart的x轴坐标
 * @param {*} days  天数
 */
	 function makeDate(days) {
		var oneDay = 24 * 3600 * 1000;
		var now = new Date();
		 var date=[];
		 for ( var i = days; i >=0; i-- ) {
			 now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
			 if(i!=days) {
				 //当天不统计
    		 	date.splice(0,0,now);
			 }
			 now = new Date(+new Date(now) - oneDay);
		 }
		 return date;
	 }
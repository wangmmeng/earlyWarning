// 时间栅格化
export function DateGrid(date, type){
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minute = date.getMinutes();
	var secend = date.getSeconds();
	var week = date.getDay();

	var grid = function (num){
		if(parseInt(num) > 9){
			return num;
		}else{
			return "0" + num;
		}
	}

	var getWeek = function (num){
		switch(num){
			case 0:
			return "周日";
			case 1:
			return "周一";
			case 2:
			return "周二";
			case 3:
			return "周三";
			case 4:
			return "周四";
			case 5:
			return "周五";
			case 6:
			return "周六";
		}
	}

	type = type.replace("yyyy", year);
	type = type.replace("MM", grid(month));
	type = type.replace("dd", grid(day));
	type = type.replace("HH", grid(hours));
	type = type.replace("mm", grid(minute));
	type = type.replace("ss", grid(secend));
	type = type.replace("ww", getWeek(week));

	type = type.replace("M", month);
	type = type.replace("d", day);
	type = type.replace("H", hours);
	type = type.replace("m", minute);
	type = type.replace("s", secend);
	type = type.replace("w", week);

	return type
}
//获取月份天数
export function GetMonthDayCount(year,month){
	switch(month)
	{
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			{
				return 31;
			}
		case 4:
		case 6:
		case 9:
		case 11:
			{
				return 30;
			}
		case 2:
			{
				if(year%4)
				{
					return 28;
				}
				else
				{
					if(year%100)
					{
						return 29;
					}
					else
					{
						if(year%400)
						{
							return 28;
						}
						else
						{
							return 29;
						}
					}
				}
			}
		default:
			{
				return 0;
			}
	}
}
//获取月份的上几个月
export function GetPrevMonth(year,month,num){
	if(parseInt(month) - num == 0) {
	  month = 12;
	  year = parseInt(year)-1;
	}else if(parseInt(month) - num <0){
	  month = 12+parseInt(month) - num;
	  year = parseInt(year)-1;
	} else {
	  month=parseInt(month)-num;
	  month= month> 9 ? (month + "") : ("0" + month);
	}
	return year+"-"+month;
}
/*时间判断*/
export function judgeTime(startTime,endTime){
	// 验证时间
	var s = new Date(startTime.replaceAll("-", "/"));
	var e = new Date(endTime.replaceAll("-", "/"));
	if(s.getTime() > e.getTime()){
		return false;
	}
	return true;
}

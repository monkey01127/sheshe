

var common_url='http://106.14.248.228:8080';
var common_part1_url =  '/analytics/nps/echarts';
var common_part2_url =  '/findByProjectIdAndQuestionId';

/*仪表图*/
var gauge_url=common_url+common_part1_url+'/meter'+common_part2_url+'?project_Id='+project_Id+'&question_Id='+question_Id;

/*象形图*/
var pictogram_url=common_url + common_part1_url+'/pictogram'+common_part2_url+'?project_Id='+project_Id+'&question_Id='+question_Id;

/*环形图*/
var pie_url=common_url+common_part1_url+'/ring'+common_part2_url+'?project_Id='+project_Id+'&question_Id='+question_Id;


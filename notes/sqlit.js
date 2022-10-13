// 1.插入语句
// insert into "{{表名}}" (`id`,`name`,`age`) values (1,"老八",66)
// 2.查询语句
// select * from "{{表名}}"     查询所有
// (1)or and ><=
// select "id","name" from "{{表名}}" where "id"> 5     查询满足id大于5
// select "id","name" from "{{表名}}" where "id"> 5 and name = "张三"   查询满足id大于5 并且 id为张三
// select "id","name" from "{{表名}}" where "id"= 5 or name = "李四"   查询满足id等于5 或者 id为李四
// select "id","name" from "{{表名}}" where "id" between 3 and 5        查询id 大于3 小于5   
// (2) in ,not in
// select "id","name" from "{{表名}}" where "id" in (3,5)        查询id 等于3 和 等于5        
// select "id","name" from "{{表名}}" where "id" not in (3,5)        查询id 不等于3 和 不等于5  
// (3) like linit
// select "id","name" from "{{表名}}" where "name" like "%a"        查询a结尾   "a%" a开头   "%a%" 只要有a    
 // select "id","name" from "{{表名}}" where "id"<4 limit 2     取 id小于4 的前两条 
 // select "id","name" from "{{表名}}" where "id"<4 limit 2,2     取 id小于4 的第二条后的两条 (1,2,3,4 => 3,4)
// (4) order by排序
//  select "id","name" from "{{表名}}" order by  "id"  desc    降序
//  select "id","name" from "{{表名}}" order by  "id" asc  limit 2,2  升序
// (5)distinct
// select distinct "id" form "{{表名}}" 降重
// 3.更新
// update "{{表名}}" set "id" = 20 ,name = "老八" where "age" = 12
// 4.删除
// delete from "{{表名}}" where "id" in (3,5)        删除id 等于3 和 等于5

// 差两个表内容
// select * from "{{表1}}" join "{{表2}}" on "{{表1}}"."id" = "{{表2}}".id   
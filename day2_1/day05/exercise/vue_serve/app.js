//app.js
// 1.加载模块 express pool
const express=require('express');
const pool=require('./pool');

// 2.创建服务器对象
var app=express();
// 3.监听3000
app.listen(3000);
// 4.指定静态目录 public
app.use(express.static('public'));
//5.加载跨域访问模块
const cors=require('cors');
//允许脚手架8080
//origin 允许跨域访问的域名列表
//credentials 跨域访问保存session 的 id
//6.配置跨域访问模块 哪个域名能够访问允许
app.use(cors({
	origin:['http://127.0.0.1:8080','http://localhost:8080'],
	credentials:true
}));

// 6:加载第三方body-parser模块 
const bodyParser=require('body-parser');
//7.配置对特殊 json是否自动转换  不转换
app.use(bodyParser.urlencoded({extended:false}));
// 功能一:home 组件轮播图片
app.get('/imageList',(req,res)=>{
	//1.将轮播图中所需的图片复制到public/img
	//2.查询
	var list=[
		{id:1,img_url:'http://127.0.0.1:3000/img/banner1.png'},
		{id:2,img_url:'http://127.0.0.1:3000/img/banner2.png'},
		{id:3,img_url:'http://127.0.0.1:3000/img/banner3.png'},
		{id:4,img_url:'http://127.0.0.1:3000/img/banner4.png'}
	];
	res.send(list);
});
// 功能二:新闻列表分页显示
// xz_news表20条数据 7行一页 三页
// 1.请求参数 pno 页码 pageSize 页大小
// 2.哪条sql
// SELECT id,title,img_url,ctime,point 
// 	FROM xz_news 
// 	LIMIT ?,?
// 3.返回数据结果json
	// {code:1,data:[]}
	app.get('/newslist',(req,res)=>{
		//1.获取参数 pno pageSize
		var pno=req.query.pno;
		var pageSize=req.query.pageSize;
		// 2.设置默认值 pno=1 pageSize=7
		if(!pno)
		pno=1;
		if(!pageSize)
		pageSize=7;
		// 3.创建sql语句
		var sql='SELECT id,title,img_url';
		sql+=' ,ctime,point';
		sql+=' FROM xz_news';
		sql+=' LIMIT ?,?';
		var ps=parseInt(pageSize);
		var offset=(pno-1)*pageSize;
		// console.log(pno,ps);
		pool.query(sql,[offset,ps],(err,result)=>{
			if(err) throw err;
			res.send({code:1,data:result});
		})

	})
	//功能三：商品分页显示
	app.get('/products',(req,res)=>{
		// 1:参数 pno pageSize
		var pno=req.query.pno;
		var pageSize=req.query.pageSize;
		// 2:允许使用默认值
		if(!pno)
		pno=1;
		if(!pageSize)
		pageSize=7;
		// 3:sql
		var sql='SELECT l.lid,l.title,';
		sql+=' l.price,p.md';
		sql+=' FROM xz_laptop l,xz_laptop_pic p';
		sql+' WHERE l.lid=p.laptop_id';
		sql+=' GROUP BY l.lid';
		sql+=' LIMIT ?,?';
		// 4:json
		var offset=(pno-1)*pageSize;
		var ps=parseInt(pageSize);
		pool.query(sql,[offset,ps],(err,result)=>{
			if(err) throw err;
			res.send({code:1,data:result});
		})
	})
	//功能四:获取新闻的详细信息
	app.get('/findNewsInfo',(req,res)=>{
		// 1:获取参数
		var id=req.query.id;
		// 2:创建正则表达式
		var reg=/^\d{1,}$/;
		// 3:如果验证失败，输出错误的消息 {code:-1}
		if(!reg.test(id)){
			res.send({code:-1,msg:'新闻编号格式有误'});
			return;
		}
		// 4：创建sql
		var sql=' SELECT id,title,content,ctime';
			sql+=' ,img_url FROM xz_news';
			sql+=' WHERE id= ? ';
		// 5:发送sql
		pool.query(sql,[id],(err,result)=>{
			if(err) throw err;
			// 6：输出查询结果{code:1,data:result}
			res.send({code:1,data:result});
		})
	})
	//功能五：获取评论列表
	app.get('/getComment',(req,res)=>{
		//1.参数
		//新闻的编号
		var nid=req.query.nid;
		//页码
		var pno=req.query.pno;
		//页大小
		var pageSize=req.query.pageSize;
		// console.log(nid,pno,pageSize);
		//2.设置默认值
		if(!pno)
		pno=1;
		if(!pageSize)
		pageSize=10;
		//3.sql语句
		var sql='SELECT id,content,ctime,nid FROM xz_comment';
			sql+=' WHERE nid= ?'; 
			sql+=' ORDER BY id DESC';
			sql+=' LIMIT ?,?';
			
			//4.offset 行偏移量
			var offset=(pno-1)*pageSize;
			//页大小造型
			var ps=parseInt(pageSize);
			// console.log(pno,ps);
			pool.query(sql,[nid,offset,ps],(err,result)=>{
				if(err) throw err;
				res.send({code:1,data:result});
			})
	})
	
	//功能六：发表评论
	// 1:用户post请求/addcomment
	app.post('/addcomment',(req,res)=>{
		// 2:获取二个参数nid content
		var nid=req.body.nid;
		var content=req.body.content;
		// 3:创建sql语句
		var sql='INSERT INTO xz_comment VALUES';
			sql+='(null,?,now(),?)';
		// 4:发送sql语句并且返回数据结果
		pool.query(sql,[content,nid],(err,result)=>{
			// console.log(result.length);
			// 5:判断 评论成功 评论失败
			if(err) throw err;
			if(result.affectedRows>0)
			res.send({code:1,msg:'评论发表成功'});
			else
			res.send({code:-1,msg:'评论发表失败'});
		})
	})
	//功能七:获取商品的详细信息
	app.get('/findProduct',(req,res)=>{
		// 1:参数 pid
		var pid=req.query.pid;
		// 2:sql 
		var sql='SELECT lname,price FROM xz_laptop';
			sql+=' WHERE lid= ?';
			pool.query(sql,[pid],(err,result)=>{
				if(err) throw err;
				// 3:json {code:1,data:[]}
				res.send({code:1,data:result});
			})
	})



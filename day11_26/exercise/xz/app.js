const express=require('express');
const bodyParser=require('body-parser');
const userRouter=require('./routes/user.js');
const productRouter=require('./routes/product.js');
//1.创建web服务器
var server =express();
server.listen(3000);
//3.托管静态资源到public目录下
server.use(express.static('public'));
//4.使用body-parser中间件将post请求数据解析为对象
//注意：一定要写在路由前面
server.use(bodyParser.urlencoded({
	extended:false
}));
//2.把用户路由器挂载到/user下
//   /user/register
server.use('/user',userRouter);
//3.把商品路由器挂在到/user下
//  /product/list
server.use('/product',productRouter);



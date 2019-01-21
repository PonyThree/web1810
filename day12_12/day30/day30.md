## 第三十天学习  12.12  
####  一、复习  
#### 二、今日内容  
#### 1.表格的样式  
+ 表格的常用样式  
之前学习的样式在表格中基本都可以使用  
    + 边框属性table 和td  
    + 边距属性table都能使用,td没有margin   
    + 尺寸属性都能设置  
    + 文本格式属性font-* text-* line-height  
    + 背景属性 颜色 图片 渐变    
    + vertical-align:top/middle/bottom要写在td才生效    
练习：01_ex创建4*4的表格。400*400内容随意  
设置每个单元格尺寸100*100  
设置表格和单元格的边框  
尝试给每个td设置上外边距   
+ 表格常有的属性  
    + 边框的合并  
    border-collapse  
        + separate 默认,边框分离的模式  
        + collpase 边框合并 
    + 边框的边距  
    设置单元格与单元格之间的距离，必须保证border-collapse:separate;  
    border-spacing  
        + 取值一个value,垂直和水平距离相同  
        + 取值两个value1,value2,value1:水平距离,value2:垂直距离  
+ 标题的位置  
caption-side:
top/bottom  
+ 表格的显示规则 ,告诉浏览器，我这张表格如果渲染，td尺寸的计算方式
table-layout:   
    + auto默认值,自动表格布局，列的尺寸实际是由内容决定的  
    + fixed 固定表格的布局，列的尺寸由设置的值决定  
    需要table有尺寸，td有尺寸  

|自动布局auto  | 固定布局fixed |  
|---|---|--|   
|单元格的大小会适应内容 | 单元格尺寸取决于设定的值|  
|表格复杂时，加载的速度慢(缺点) | 任何情况下会加速加载表格(优点)  |
|布局会比较灵活(优点)  | 布局会比较死板(缺点)  |
|适用于不确定每列大小，并且表格不太繁琐的时候   |    当确定每列尺寸的时候使用|  
#### 2.定位(重点*****)  
+ 1.什么是定位  
元素在页面中的位置  
+ 2.分类  
    + 普通文档流定位  默认文档流  
    + 浮动定位   
    + 相对定位  
    + 绝对定位  
    + 固定定位   
+ 3.普通流定位    
又称文档流定位，页面中所有元素默认显示方式  
    + 每个元素在页面中都有自己的空间(盒子模型)    
    + 每一个元素都是从父元素的左上角开始显示的  
    + 块级元素默认按照从上往下的方式逐个排列，每个元素独占一行  
    + 行内元素是多个元素在一行中显示，从左往右排列  
+ 4.浮动(重点)   
    + 元素一旦浮动起来了，脱离文档流，不占页面空间，其它未浮动元素会上前补位    
    + 浮动的元素会停靠在父元素的左边或者右边  
    或其它已经浮动元素的右/左的边缘  
    + 浮动解决多个块级元素在同一行内显示的问题  
    语法： 
    属性 float  
    取值  
    left:左浮动，元素浮动起来后停靠在父元素的左侧，或者往左挨着已经浮动元素  
    right:右浮动，元素浮动起来后，停靠在父元素的右侧，或者往右挨着已经浮动的元素  
浮动元素引发的特殊情况(查看离自己最近一个相同浮动元素的情况)    
    1.当父容器横向显示不下所有浮动元素的时候,最后一个元素将换行显示  
        1.1默认情况下，最后一个元素会优先显示在最高的位置,再往左排列  
        1.2会发生<font color='red'>浮动元素占位</font>的情况，浮动元素根据<font color='red'>浮动的方向</font>,占据方向之上的位置，不允许最后一个元素占用       
    2.浮动对默认宽度的影响   
        ``` 
            块级元素不写宽度，默认是父级元素的100%      
            元素一旦浮动起来，宽度以内容为准  
            前提：不设置width  
        ```    

        3.元素一旦浮动起来，就变成块级元素，允许修改尺寸，设置垂直外边距  
    4.文本，行内块，行内元素是不会被浮动元素压在下方的，而会巧妙避开，环绕着浮动元素显示   
    清除浮动：  
    元素一旦浮动之后，会对后续的元素带来一定的影响，后续元素会上前补位，如果不希望后续上前补位，可以给后续元素添加清除浮动的属性  
    clear:  
    取值  
    left:清除左浮动元素对我带来的影响 
    right:清除右浮动元素对我带来的影响 
    both:清除所有浮动元素对我带来的影响   

    ***浮动元素对父元素高度带来的影响(高度坍塌)***  
    块级元素不写高度，他的高度是根据内容判定的  
    如果内部元素都浮动了，意味着内部元素都脱离了默认文档流 
    父级元素就失去了高度---高度坍塌  
    **解决方案：**  
    + 给父级元素添加高度 弊端：不是每次都知道具体的高度是多少  
    + 设置父级元素也浮动 弊端：会影响父元素后面的其他元素  
    + 给父元素设置overflow:hidden/auto 弊端：如果内容想要溢出显示，显示不了    
    + 在父元素中追加一个空的块级元素，只设置clear:both  

#### 3.显示  
##### 3.1显示方式
决定了元素在网页中表现形式(块级、行内、行内块、table)  
取值：  
+ none 不显示元素，隐藏，不占据位置  
+ block 让元素表现为块级  
块级元素特征，独占一行，可以设置尺寸以及上下外边距  
+ inline 让元素表现为行内  
行内元素特征，多个元素一行显示，不能设置宽高以及上下外边距  
+ inline-block 让元素表现为行内块  
行内块特性，多个元素一行显示，可以设置尺寸以及上下外边距，修改了一个元素外边距，其他元素将跟着一起修改外边距  
+ table 让元素表现为table  
table的特征，尺寸以内容为准，独占一行，允许修改内外边距  
##### 3.2显示的效果  
属性：visibility    
取值：visible/hidden  
<font color='red'>visibility:hidden和dispaly:none的区别: </font> 
+ visibility:hidden隐藏，不脱离文档流, 依然占位。  
+ dispaly:none隐藏，脱离了默认文档流，不占据页面位置  
##### 3.3透明度  
opacity:0~1 &emsp;1是不透明,0是全透明  
<font color='red'>opacity和rgba的区别： </font>    
opacity作用于元素，当一个元素设置了opacity之后，这个元素本身以及所有子元素与颜色相关的属性都会受到影响  
rgba(0~255,0~255,0~255,.5)只会改变你设定的这个颜色的透明度，其他的都不管  
##### 3.4垂直对齐方式  
vertical-align  
使用在table 中，取值top/middle/bottom
使用在img中,取值top/middle/bottom/baseline,默认是baseline对齐
控制图片与两边文字垂直对齐方式  
##### 3.5光标  
属性:cursor  
取值：  
+ default 箭头   
+ pointer 小手  
+ crosshair 十字箭头  
+ text |  
+ wait 等待  
+ help 帮助  
#### 4.列表   
列表标识  
list-style-type  
none  
disc  
circle  
square   
列表标识的位置   
list-style-position:outside/inside    
列表项引用图片  
list-style-image:url()  
简写方式：  
list-style:type url position;  
作业：  
+ 1.继续完成学子商城首页1块  
+ 2.完成学子商城首页的底部















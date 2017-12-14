// 获取某一个元素的子元素

function childNode(element){
	let arr = [];
	let childNodes = element.childNodes;

	// childNodes.forEach(function(ele){
	// 	if(ele.nodeType == 1){
	// 		arr.push(ele);
	// 	}
	// })
	
	// 添加
	// 冒充：数组  冒充
	// nodeList -> 数组

	arr = Array.prototype.filter.call(childNode,function(element){
		return element.nodeType == 1
	});

	// for(let i = 0;i < childNodes.length;i++){
	// 	if(childNodes[i].nodeType == 1){
	// 		arr.push(childNodes[i]);
	// 	}
	// }
	return arr;
}
function firstElementChild(element){
	return childNode(element)[0];
}
function createCircle(num){
	let box = document.querySelector('.box');
	for(let i = 0;i < num;i++){
		let divs = document.createElement('div');
		divs.classList.add('circle');

		let w = Math.floor(Math.random()*30+20);
		let color = getColor();
		let l =(innerWidth - w)*Math.random()-innerWidth/2,
			t =(innerHeight - w)*Math.random()-innerHeight/2;
		divs.style.cssText = `
			background:${color};
			width:${w}px;
			height:${w}px;
		`;
		box.appendChild(divs);

		// setTimeout(function(){
		// 	divs.style.left = `${l}px`;
		// 	divs.style.top = `${t}px`;
		// },100)
	}
}

function getColor(){
	let str = `rgb(${Msth.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
	return str;
}

// 获取指定元素
	// $(select[,ranger])
	// select String  选择器
	// ranger  对象（元素节点）选择范围

	// $('#box')
	// $('.box')
	// $('div')

	// 1、首字符
	// 	分类
	// 	#	id
	// 	.	className
	// 	tag  tagName

	function $(select,ranger=document){
		if(typeof select == 'string'){
			// ranger = ranger?ranger:document;
			// ranger = ranger||document;
			let selector = select.trim();
			let firstchar = select.charAt(0);
			if(firstchar == '#'){
				return document.getElementById(selector.substring(1));
			}else if(firstchar == '.'){
				return ranger.getElementsByClassName(selector.substring(1));
			}else if(/^[a-zA-Z][a-zA-Z1-6]{0,6}$./.test(selector)){
				return ranger.getElementsByTagName(selector);
			}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,6}>$./.test(selector)){
				return document.createElement(selector.slice(1,-1));
			}
		}else if(typeof select == 'function'){
			window.onload = function(){
				select();
			}
		}
	}	

// prepend()
	// 在某一个元素的最前面插入一个子元素 => 在第一个元素节点之前
	// 第一个元素节点

	function append(parentNode,child){
		parentNode.appendChild(Child);
	}
	function prepent(parentNode,child){
		let firstChild = (parentNode.firstElementChild);
		if(firstChild){
			parentNode.insertBefore(Child,firstchild);
		}else{
			parentNode.appendChild(Child);
		}
	}

// 内部插入：
	HTMLElement.prototype.append = function(child){
		this.appendChild(child);
	};

	HTMLElement.prototype.appendtTo = function(child){
		parentNode.appendChild(this);
	}

	HTMLElement.prototype.prepend = function(child){
		let firstchild = this.firstElementChild;
		if(firstchild){
			this.insertBefore(child,firstchild);
		}else{
			this.appendChild(child);
		}
	};

	HTMLElement.prototype.prependTo = function(parentNode){
		parentNode.prepend(this);
	}

	// box前插入div
	// box.insert(div)
	// div.insertTo(box)

// 外部插入
	HTMLElement.prototype.insert = function(node){
		// this  位置
		// node  谁(元素)
		let parent = this.parentNode;
		parent.insertBefore(node,this);
	}

	HTMLElement.prototype.after = function(node){
		let parent = this.parentNode;
		let next = this.nextElementSibling;
		if(next){
			next.insert(node);
		}else{
			parent.append(node);
		}
	}
	HTMLElement.prototype.afterTo = function(node){
		node.after(this);
	}

	HTMLElement.prototype.next =function(node){
		let next =this.nextElementSibling;
		if(next){
			next.insert(node);
		}else{
			let parent = this.parentNode;
			parent.append(node);
		}
	}
	HTMLElement.prototype.noxtTo = function(node){
		node.after(this);
	}

// 查找父元素：
	HTMLElement.prototype.parent = function(){
		return this.parentNode;
	};

	HTMLElement.prototype.parents = function(){
		let arr = [];
		let parent = this.parentNode;
		if(parent.nodeName == 'BODY'){
			arr.push(parent);
		}
		while(parent.nodeName != 'HTML'){
			arr.push(parent);
			parent = parent.parentNode;
			if(parent.nodeName == 'HTML'){
				arr.push(parent);
			}
		}
		return arr;
	}

// 查找拥有定位属性的元素：
	HTMLElement.prototype.offsetparent = function(){
		let node = null;
		let parent = this.parents;
		for(let i=0;i<parent.length;i++){
			let j=getComputedStyle(parent[i],null).position;
			if(j == 'relative' || parent[i] || 'absolute'){
				node = parent[i];
				break;
			}
		}
		if(!node){
			node = document.body;	
		}
		return node;
	}

// 漂浮：
	// 属性
	// 	谁
	// 	移动速度
	// 	最大偏移量
	// 	自身尺寸
	// 方法：start

	class Float{
		constructor(obj){
			this.obj = obj;
			this.speedy = 1;
			this.speedx = 1;
			this.maxH = innerHeight-this.obj.offsetHeight;
			this.maxW = innerWidth-this.obj.offsetWidth;
		}
		start(){
			this.move();
		}
		move(){
			let fthis = this;
			fthis.t = setInterval(function(){
				let toph = fthis.obj.offsetTop + fthis.speedy;
				let leftw = fthis.obj.offsetLeft + fthis.speedx;
				if(toph >= fthis.maxH){
					toph = fthis.maxH;
					fthis.speedy *= -1;
				}
				if(toph <= 0){
					toph = 0;
					fthis.speedy *= -1;
				}
				if(leftw >= fthis.maxW){
					leftw = fthis.maxw;
					fthis.speedy *= -1;
				}
				if(leftw <= 0){
					leftw = 0;
					fthis.speedy *= -1;
				}
				fthis.obj.style.top = toph + 'px';
				fthis.obj.style.left = leftw + 'px';
			},1)
		}
		stop(){
			clearInterval(this.t);
		}
		resize(){
			this.maxH = innerHeight-this.obj.offsetHeight;
			this.maxW = innerWidth-this.obj.offsetWidth;
		}
	}
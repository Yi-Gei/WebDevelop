
/*
 * GET home page.
 */

 var crypto = require('crypto');
 var User = require('../node_modules/user.js');
 var Post = require('../node_modules/post.js');
 
 
 function checkLogin(req,res,next)
 {
	if(!req.session.user)
	{
		req.flash('error',"未登录");
		res.redirect('/login');
	}
	next();
 }
 
 function checkNotLogin(req,res,next)
 {
	if(req.session.user){
		req.flash('error','已登录');
		res.redirect('back');
	}
	next();
 }
 
 module.exports = function(app)
 {
	app.get("/",function(req,res){
		Post.get(null,function(err,posts){
			
			if(err){
				posts = [];
			}
			res.render('index',{title:"主页",
				User: req.session.user,
				posts:posts,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		
		
	});
   });
   
   app.get("/reg",checkNotLogin);
   
	app.get("/reg",function(req,res){res.render('reg',{title:"注册",
		User: req.session.user,
		success: req.flash('success').toString(),
	    error: req.flash('error').toString()
	 });
   });
   
   app.get("/reg",checkNotLogin);
	app.post("/reg",function(req,res){
		var name = req.body.name;
		var password = req.body.password;
		var password_re = req.body['password-repeat'];
		if(password_re != password)
		{
			req.flash('error',"密码输入不一致");
			return res.redirect('/reg');
		}
		var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');
		
		var newUser = new User({
			name: name,
			password: password,
			email: req.body.email
			});
		User.get(newUser.name,function(err,user){
			if(user){
				req.flash('error','用户名已存在');
				return res.redirect('/reg');
			}
			newUser.save(function(err,user){
				if(err){
					req.flash('error',err);
					return res.redirect('/reg');
				}
				req.session.user = user;
				req.flash('success','注册成功');
				res.redirect('/');
			})
			});
		
	});
	app.get("/login",checkNotLogin);
	app.get("/login",function(req,res){res.render('login',{title:"登录",
		User: req.session.user,
		success: req.flash('success').toString(),
	    error: req.flash('error').toString()
	});
	});
	app.get("/login",checkNotLogin);
	app.post("/login",function(req,res){
		var name = req.body.name;
		var password = req.body.password;
		var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');
		
		User.get(name,function(err,user){
			if(!user){
				req.flash('error', '用户不存在');
				return res.redirect('/login');
			}
			
			if(user.password != password){
				req.flash('error','密码错误');
				return res.redirect('/login');
			}
			
			req.session.user = user;
			req.flash('success','登录成功!');
			res.redirect('/');			
			});
	});
	
	app.get("/post",checkLogin);
	
	app.get("/post",function(req,res){res.render('post',{title:"发表",
		User: req.session.user,
		success: req.flash('success').toString(),
	    error: req.flash('error').toString()	
	});
	});
	app.get("/post",checkLogin);
	app.post("/post",function(req,res){
		
		var post = new Post(req.session.user.name,req.body.title,req.body.post);
		
		post.save(function(err){
			
			if(err)
			{
				req.session.user = user;
				req.flash('error',err);
				return res.redirect('/');	
			}
			
			req.flash('success','发表成功');
			res.redirect('/');			
			});		
	});
	app.get("/post",checkLogin);
	app.get("/logout",function(req,res){
		req.session.user = null;
		req.flash('success','登出成功!');
		res.redirect('/');
	});
 };
 
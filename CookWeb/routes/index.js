
/*
 * GET home page.
 */

module.exports = function(app){
  
  app.get('/',function (req,res){res.render('index');});
  app.get('/menu',function(req,res){res.render('menu');});
  app.get('/health',function(req,res){res.render('health');});
  app.get('/talk',function(req,res){res.render('talk');});
  app.get('/login',function(req,res){res.render('login');});
  app.get('/farm',function(req,res){res.render('farm');});
  app.get('/cook',function(req,res){res.render('cook');});
  app.get('shop',function(req,res){res.render('shop');});
};
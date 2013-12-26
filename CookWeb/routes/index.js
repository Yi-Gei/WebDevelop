
/*
 * GET home page.
 */

module.exports = function(app){
  
  app.get('/',function (req,res){res.render('index',{title:'食之康'});});
  app.get('/menu',function(req,res){res.render('menu',{title:'食之康'});});
  app.get('/health',function(req,res){res.render('health',{title:'食之康'});});
  app.get('/talk',function(req,res){res.render('talk',{title:'食之康'});});
  app.get('/login',function(req,res){res.render('login',{title:'食之康'});});
};

/*
 * GET users listing.
 */

module.exports = function(app){
  //res.send("respond with a resource");
  app.get("/",function(req,res){res.send("respond with a resource");})
};
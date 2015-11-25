seddit = new Mongo.Collection(new Date().toISOString().slice(0,10).replace(/-/g,""))
if (Meteor.isClient) {

Template.body.helpers({
    list: function () {
      return seddit.find({}, {sort: {score: -1}});
    }
  });
  Template.submit.events({
    'submit .submit': function (event) {
      event.preventDefault();
      var title = event.target.title.value;
      var url = event.target.url.value;
      var score = 1;
      seddit.insert({
	title: title,
	url: url,
	createdat: new Date(),
	score: score
	});
	event.target.title.value="";
	event.target.url.value="";
     }});
  Template.link.events({
     'click .sayit': function () {
      seddit.update(this._id, {$inc: {score: 1}});
	}});
  Template.link.events({
     'click .shushit': function () {
      seddit.update(this._id, {$inc: {score: -1}});
        }});
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

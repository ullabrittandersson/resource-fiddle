var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var APIConnection = require("../utils/APIConnection");
var Editor = require("./Editor");
var ImageItem = require("../views/ImageItem");
var SelectButton = require("../views/SelectButton");
var Resources = require("../../../lib/Resources");


function GraphicsEditor(view) {
	Editor.call(this, view);

	this.images = new Array();
	this.imageContainer = null;
	this.uploadButton = null;
	this.container = null;

};
ClassUtils.extends(GraphicsEditor, Editor);

EventDispatcher.init(GraphicsEditor);

GraphicsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var graphics = this.resources.getResourceObject().graphics;

	console.log("graphics: ", graphics);

	var y = 0;
	for(var key in graphics) {
		console.log("create ImageItem: ", key, graphics[key]);
		var imageItem = new ImageItem(key, graphics[key]);
		imageItem.y = y;
		this.view.addChild(imageItem);
		imageItem.on(ImageItem.Selected, this.onUpload, this);
		y += imageItem.height;
	}
};

GraphicsEditor.prototype.onUpload = function(e) {
	
	if(e.files.length > 0) {
		var data = new FormData();
		data.append('SelectedFile', e.files[0]);
		data.append("Filename", e.name);

		var connection = new APIConnection();
		connection.on("loaded", this.onUploaded, this);
		connection.upload("upload", data);
	}
	else {
		console.warn("No files selected: event:", e);
	}
};

GraphicsEditor.prototype.onUploaded = function(data) {
	var connection = data.connection;
	var json = data.json;
	console.log("GraphicsEditor.prototype.onUploaded: json = ", JSON.stringify(json));

	Resources.getInstance().addSource({graphics: json});
	this.save();

	//this.loadImages();
	this.trigger("uploaded", json);
};

module.exports = GraphicsEditor;
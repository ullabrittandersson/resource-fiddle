var ClassUtils = require("../utils/ClassUtils");

function IFrame() {
	this.url = "";
};
IFrame.prototype.constructor = IFrame;

IFrame.prototype.init = function(targetURL) {	
	this.url = targetURL;
	/*
	this.htmlElement = document.createElement("iframe");
	this.htmlElement.style.width = "100%";
	this.htmlElement.style.height = "100%";
	this.htmlElement.setAttribute("src", targetURL);
	targetContainer.appendChild(this.htmlElement);
	*/
};

module.exports = IFrame;

IFrame.prototype.reload = function() {
	/*
	console.log("IFrame.prototype.reload");
	var u = this.url + "?resources="+this.resourceURL+"&____timestamp="+Date.now();
	this.htmlElement.setAttribute("src", u);
	//this.htmlElement.contentWindow.location.reload();
	*/
};

module.exports = IFrame;
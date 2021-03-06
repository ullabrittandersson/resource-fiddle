var inherits = require("inherits");
var xnode = require("xnode");
var EventDispatcher = require("yaed");
var ResourceItemView = require("./ResourceItemView");

/**
 * The view of one resource category.
 * @class ResourceCategoryView
 */
function ResourceCategoryView() {
	xnode.Div.call(this);

	this.title = new xnode.Div();
	this.title.className = "title";
	this.appendChild(this.title);
	this.title.addEventListener("click", this.onTitleClick.bind(this));

	var icon = new xnode.Div();
	icon.className = "dropdown icon";
	this.title.appendChild(icon);

	this.titleSpan = new xnode.Span();
	this.title.appendChild(this.titleSpan);

	this.content = new xnode.Div();
	this.content.className = "content";
	this.appendChild(this.content);

	this.descriptionP = new xnode.P();
	this.content.appendChild(this.descriptionP);

	this.itemTable = new xnode.Table();
	this.itemTable.className = "ui table unstackable definition";
	this.content.appendChild(this.itemTable);

	this.itemTableBody = new xnode.Tbody();
	this.itemTable.appendChild(this.itemTableBody);

	this.accordion = new xnode.Div();
	this.accordion.className = "ui styled fluid accordion";
	this.content.appendChild(this.accordion);
}

inherits(ResourceCategoryView, xnode.Div);
EventDispatcher.init(ResourceCategoryView);

/**
 * Set the label.
 * @method setLabel
 */
ResourceCategoryView.prototype.setLabel = function(label) {
	this.titleSpan.innerHTML = label;
}

/**
 * Should this be active or not?
 * @method setActive
 */
ResourceCategoryView.prototype.setActive = function(active) {
	if (active) {
		this.title.className = "active title";
		this.content.className = "active content";
	} else {
		this.title.className = "title";
		this.content.className = "content";
	}
}

/**
 * The description.
 * @method setDescription
 */
ResourceCategoryView.prototype.setDescription = function(description) {
	if (description) {
		this.descriptionP.innerHTML = description;
		this.descriptionP.style.display = "block";
	} else {
		this.descriptionP.style.display = "none";
	}
}

/**
 * The title was clicked. Dispatch further.
 * @method onTitleClick
 */
ResourceCategoryView.prototype.onTitleClick = function() {
	this.trigger("titleClick");
}

/**
 * Get holder for the items.
 * @method getItemHolder
 */
ResourceCategoryView.prototype.getItemHolder = function() {
	return this.itemTableBody;
}

/**
 * Get div holding the categories.
 * @method getCategoryHolder
 */
ResourceCategoryView.prototype.getCategoryHolder = function() {
	return this.accordion;
}

/**
 * Set visibility of the category holder.
 * @method getCategoryHolder
 */
ResourceCategoryView.prototype.setCategoryHolderVisible = function(value) {
	if (value)
		this.accordion.style.display = "block";

	else
		this.accordion.style.display = "none";
}

/**
 * Set visibility of the item holder.
 * @method getItemHolder
 */
ResourceCategoryView.prototype.setItemHolderVisible = function(value) {
	if (value)
		this.itemTable.style.display = "block";

	else
		this.itemTable.style.display = "none";
}

module.exports = ResourceCategoryView;
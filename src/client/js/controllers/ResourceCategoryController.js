var ResourceItemController = require("./ResourceItemController");
var ResourceItemView = require("../views/ResourceItemView");
var ResourceCategoryView = require("../views/ResourceCategoryView");
var xnodec = require("xnodecollection");

/**
 * Control a resource category.
 * @method ResourceTabController
 */
function ResourceCategoryController(categoryView) {
	this.categoryView = categoryView;

	this.categoryView.on("titleClick", this.onCategoryViewTitleClick, this);

	this.itemManager = new xnodec.CollectionViewManager();
	this.itemManager.setTarget(this.categoryView.getItemHolder());
	this.itemManager.setItemRendererClass(ResourceItemView);
	this.itemManager.setItemControllerClass(ResourceItemController);
	this.itemManager.on("postUpdate", this.updateVisibilities, this);

	this.categoryManager = new xnodec.CollectionViewManager();
	this.categoryManager.setTarget(this.categoryView.getCategoryHolder());
	this.categoryManager.setItemRendererClass(ResourceCategoryView);
	this.categoryManager.setItemControllerClass(ResourceCategoryController);
	this.categoryManager.on("postUpdate", this.updateVisibilities, this);

	this.updateVisibilities();
}

/**
 * Set data.
 * @method setData
 */
ResourceCategoryController.prototype.setData = function(categoryModel) {
	if (this.categoryModel) {
		this.itemManager.setDataSource(null);

		this.categoryModel.off("change", this.onCategoryModelChange, this);
	}

	this.categoryModel = categoryModel;

	if (this.categoryModel) {
		this.itemManager.setDataSource(this.categoryModel.getItemCollection());
		this.categoryManager.setDataSource(this.categoryModel.getCategoryCollection());

		this.categoryModel.on("change", this.onCategoryModelChange, this);
		this.categoryView.setActive(categoryModel.isActive());
		this.categoryView.setLabel(categoryModel.getLabel());
		this.categoryView.setDescription(this.categoryModel.getDescription());
	}
}

/**
 * Handle change in the model.
 * @method onCategoryModelChange
 */
ResourceCategoryController.prototype.onCategoryModelChange = function() {
	this.categoryView.setActive(this.categoryModel.isActive());
	this.categoryView.setDescription(this.categoryModel.getDescription());
}

/**
 * Title click. Toggle the active state.
 * @method onCategoryViewTitleClick
 */
ResourceCategoryController.prototype.onCategoryViewTitleClick = function() {
	this.categoryModel.setActive(!this.categoryModel.isActive());
}

/**
 * Update visibilities of the category and item holders.
 * The should not be visible if they are empty.
 */
ResourceCategoryController.prototype.updateVisibilities = function() {
	if (!this.categoryModel)
		return;

	this.categoryView.setCategoryHolderVisible(this.categoryModel.getCategoryCollection().getLength() > 0);
	this.categoryView.setItemHolderVisible(this.categoryModel.getItemCollection().getLength() > 0);
}

module.exports = ResourceCategoryController;
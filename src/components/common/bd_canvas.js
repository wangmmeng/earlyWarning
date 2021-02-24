function CanvasLayer(t) {
    this.options = t || {}, this.paneName = this.options.paneName || "labelPane", this.zIndex = this.options.zIndex || 0, this._map = t.map, this._lastDrawTime = null, this.show()
}
CanvasLayer.prototype.initialize = function(t) {
    this._map = t;
    var a = this.canvas = document.createElement("canvas"),
        e = this.ctx = this.canvas.getContext("2d");
    a.style.cssText = "position:absolute;left:0;top:0;z-index:" + this.zIndex + ";", this.adjustSize(), this.adjustRatio(e), t.getPanes()[this.paneName].appendChild(a);
    var i = this;
    return t.addEventListener("resize", function() {
        i.adjustSize(), i._draw()
    }), this.canvas
}, CanvasLayer.prototype.adjustSize = function() {
    var t = this._map.getSize(),
        a = this.canvas;
    a.width = t.width, a.height = t.height, a.style.width = a.width + "px", a.style.height = a.height + "px"
}, CanvasLayer.prototype.adjustRatio = function(t) {
    var a = t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1,
        e = (window.devicePixelRatio || 1) / a,
        i = t.canvas.width,
        s = t.canvas.height;
    t.canvas.width = i * e, t.canvas.height = s * e, t.canvas.style.width = i + "px", t.canvas.style.height = s + "px", t.scale(e, e)
}, CanvasLayer.prototype.draw = function() {
    var t = this;
    clearTimeout(t.timeoutID), t.timeoutID = setTimeout(function() {
        t._draw()
    }, 15)
}, CanvasLayer.prototype._draw = function() {
    var t = this._map,
        a = t.getSize(),
        e = t.getCenter();
    if (e) {
        var i = t.pointToOverlayPixel(e);
        this.canvas.style.left = i.x - a.width / 2 + "px", this.canvas.style.top = i.y - a.height / 2 + "px", this.dispatchEvent("draw"), this.options.update && this.options.update.call(this)
    }
}, CanvasLayer.prototype.getContainer = function() {
    return this.canvas
}, CanvasLayer.prototype.show = function() {
    if(this.canvas || this._map.addOverlay(this)){
        this.canvas.style.display = "block"
    } 
}, CanvasLayer.prototype.hide = function() {
    this.canvas.style.display = "none"
}, CanvasLayer.prototype.setZIndex = function(t) {
    this.canvas.style.zIndex = t
}, CanvasLayer.prototype.getZIndex = function() {
    return this.zIndex
};

export {
    CanvasLayer
}
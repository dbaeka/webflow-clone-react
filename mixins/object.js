export let emptyMixin = {
    isEmpty() {
        return Object.keys(this).length === 0 && this.constructor === Object
    }
}
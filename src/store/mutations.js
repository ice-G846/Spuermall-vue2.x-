export default {
  addCounter (state, payload) {
    payload.count += 1
  },
  addToCart (state, payload) {
    payload.count = 1
    payload.checked = false
    state.cartList.push(payload)
  },
  removeGood (state, payload) {
    state.cartList = state.cartList.filter(item => {
      return item.iid !== payload
    })
  },
  payment (state, payload) {
    for (let item of state.cartList) {
      if (item.checked) {
        state.goodList.push(item)
      }
    }
    state.cartList = state.cartList.filter(item => {
      return !item.checked
    })
  },
  deleteGood (state, payload) {
    state.goodList.splice(payload, 1)
  }
}
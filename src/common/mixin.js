import { debounce } from 'common/utils'
export const itemListenerMixin = {
  data () {
    return {
      ItemImgListener: null
    }
  },
  mounted () {
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.ItemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.ItemImgListener)
  }
}
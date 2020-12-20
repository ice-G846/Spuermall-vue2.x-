import { debounce } from 'common/utils'

import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data () {
    return {
      ItemImgListener: null
    }
  },
  mounted () {
    let refresh = debounce(this.$refs.scroll.refresh, 50)
    this.ItemImgListener = () => {
      refresh
    }
    this.$bus.$on('itemImageLoad', this.ItemImgListener)
  }
}

export const backTopMixin = {
  data () {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    }
  },
}
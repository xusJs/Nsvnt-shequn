<template>
  <div>
    <nav>
      <ul>
        <li v-for="(item,index) in navList" :key="item+index"
            :class="{active: index === $store.state.community.BrandCenterIndex}" @click="NavChange(index)">
          <span>{{item.navName}}</span>
        </li>
      </ul>
    </nav>
    <div>
      <router-view/>
    </div>

  </div>
</template>

<script>
  export default {
    name: "brand-center",
    data() {
      return {
        navList: [
          {
            navName: "个人品牌",
          },
          {
            navName: "企业播客",
          },
          {
            navName: "社团组织",
          }
        ],
        isactiveIndex: this.$store.state.community.BrandCenterIndex
      }
    },
    methods: {
      NavChange(index) {
        this.isactiveIndex = index;
        if (index === 0) {
          this.$router.push({name: "Personal"})
        } else if (index === 1) {
          this.$router.push({name: "enterprise"})
        } else if (index === 2) {
          this.$router.push({name: "association"})
        }
        this.$store.commit("SET_BrandCenterIndex", this.isactiveIndex)
      }
    },
    beforeDestroy() {
      this.$store.commit("SET_BrandCenterIndex", this.isactiveIndex)
    },
    created() {
      this.$store.commit("SET_HomeIndex", 4)
    }
  }
</script>

<style scoped lang="scss">
  nav {
    padding: 0 10px;
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        span {
          line-height: 36px;
          padding: 5px 2px;
          font-size: 16px;
        }
      }
      & .active {
        span {
          border-bottom: 2px solid #66b1ff;
          font-weight: 900;
          color: #000000;
        }
      }
    }
  }

</style>

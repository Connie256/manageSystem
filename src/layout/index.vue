<template>
  <div>
    <el-container>
      <el-header class="myHeader">
        <div class="leftHeader">
          管理系统
        </div>
        <div class="rightHeader">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">黄金糕</el-dropdown-item>
              <el-dropdown-item command="b">狮子头</el-dropdown-item>
              <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
              <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside :style="{width:isCollapse?'70px':'200px'}" class="myAside">
          <el-menu :collapse="isCollapse" mode="vertical"
                   :collapse-transition="false" :default-active="currentPath" :unique-opened="false"
                   router>
            <div v-for="(cur ,cIndex) of menuList" :key="cur.path">
              <el-submenu v-if="cur.children.length>0" :index="cur.path">
                <template slot="title">
                  <i :class="cur.meta.icon"></i>
                  <span slot="title">{{ cur.meta.title }}</span>
                </template>
                <template v-for="(item, num) of cur.children">
                  <el-menu-item :index="item.path" @click="toPage(item.path)">
                    {{ item.meta.title }}
                    <!--                    <a :href="`${item.path}`" :title="item.name">-->
                    <!--    elementui菜单会有跳动,antdvue没有                  <span slot="title">{{ item.meta.title }}</span>-->
                    <!--                    </a>-->
                  </el-menu-item>
                </template>
              </el-submenu>

              <el-menu-item v-else :index="cur.path" @click="toPage(cur.path)">
                {{ cur.meta.title }}
                <!--              <a :href="`#${cur.path}`" :title="cur.name">-->
                <!--                <span slot="title"> {{ cur.meta.title }}</span>-->
                <!--              </a>-->
              </el-menu-item>
            </div>


          </el-menu>
          <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" class="myFold" @click="isCollapse=!isCollapse"></i>
        </el-aside>
        <el-main class="myMain">
          <div class="myBreadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="crumb in breadcrumbList" :to="{path:crumb.path}">{{ crumb.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="mainContent">
            <router-view></router-view>
          </div>

        </el-main>
      </el-container>
      <el-footer class="myFooter">
        <div>
          联系电话:123456
        </div>
      </el-footer>
    </el-container>
  </div>

</template>

<script>
export default {
  name: 'my-layout',
  data () {
    return {
      isCollapse: false,
      menuList: [],
      currentPath: '',//当前选中菜单路径
      breadcrumbList: []//面包屑路径
    }
  },
  watch: {
    $route: {
      handler (val, oldval) {
        this.currentPath = val.path
        this.breadcrumbList = val.matched
      },
      // 深度观察监听
      deep: true,
      immediate: true
    }
  },

  methods: {
    toPage (path) {
      this.$router.push({ path: path }, () => {
      })
    },
    chooseMenu (route = this.$route) {
      // const routerPath = route.path;
      this.currentPath = route.path
      // for (const menu of this.menuList) {
      //   if (menu.path && routerPath.startsWith(menu.path)) {
      //     // 一级菜单选中
      //     this.selectedKeys[0] = menu.id;
      //     this.$forceUpdate();
      //     return
      //   }
      //   if (menu.children) {
      //     for (const child of menu.children) {
      //       if (child.path && routerPath.startsWith(child.path)) {
      //         // 二级菜单选中
      //         let present = false;
      //         for (const defaultOpenKey of this.defaultOpenKeys) {
      //           if (defaultOpenKey === menu.id) {
      //             present = true;
      //             break
      //           }
      //         }
      //         this.selectedKeys[0] = child.id;
      //         if (!present) {
      //           this.defaultOpenKeys.push(menu.id)
      //         }
      //         this.$forceUpdate();
      //         return
      //       }
      //     }
      //   }
      // }
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
    }
  },
  created () {
    const list = this.$router.options.routes
    let routerList = []
    if (list && list.length > 0) {
      list.forEach(item => {
        if (item.path.indexOf('/eat') != -1 || item.path.indexOf('/drink') != -1) {
          routerList.push(item)
        }
      })
    }
    this.menuList = routerList
    // this.chooseMenu()
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.myHeader {
  background-color: $header-footer-color;
  display: flex;
  justify-content: space-between;
  color: #fff;
  align-items: center;

  .rightHeader {
    .el-dropdown {
      color: #fff;
    }

  }
}

.myAside {
  position: relative;
  min-height: calc(100vh - 60px - 44px);
  background-color: #fff;

  .el-menu--collapse.el-menu {
    .el-submenu__title {
      span {
        display: none;
      }
    }

    ::v-deep .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
      display: none;

    }
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }


  .el-menu {
    border-right: none;

    ::v-deep .el-submenu__title:hover {
      background-color: $color-primary-h;
    }

    .el-menu-item:focus, .el-menu-item:hover {
      background-color: $color-primary-h;
    }

    .el-submenu.is-active {
      ::v-deep .el-submenu__title {
        color: $color-primary;

        i {
          color: $color-primary;
        }
      }
    }

    li.el-menu-item {
      height: 44px;
      line-height: 44px;

    }

    .el-menu-item.is-active {
      background-color: $color-primary-h;
      color: $color-primary;

      &::after {
        position: absolute;
        right: 0;
        top: 0;
        content: '';
        width: 5px;
        height: 100%;
        background-color: $color-primary;
      }
    }
  }

  .myFold {
    position: absolute;
    right: 20px;
    bottom: 0;
    font-size: 32px;
  }
}

.myMain {
  background-color: $page-color;

  .myBreadcrumb {
    margin-bottom: 12px;
  }

  .mainContent {
    height: calc(100% - 14px - 12px);
    background-color: #fff;
  }
}

.myFooter {
  height: 44px !important;
  background-color: $header-footer-color;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

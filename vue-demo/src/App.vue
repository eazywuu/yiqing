<script setup lang="ts">
  /* setup语法糖,使用ts语法 */
  import bg from './assets/1.jpg'
  import { useStore } from './stores'
  import { onMounted } from 'vue'
  import * as echarts from 'echarts'
  import './assets/china'
  import { geoCoordMap } from './assets/geoMap'
  import 'animate.css'

  const store = useStore()

  onMounted(async () => {
    await store.getList()
    initCharts()
    initPie()
    initLine()
  })

  let index = 17

  const getLineData = (index: number) => store.item[index]

  const initCharts = () => {
    const city = store.list.diseaseh5Shelf.areaTree[0].children
    const data = city.map((v) => {
      return {
        name: v.name,
        value: geoCoordMap[v.name].concat(v.total.nowConfirm),
        children: v.children,
      }
    })
    store.item = city[index].children
    console.log(store.item)
    const charts = echarts.init(document.querySelector('#china') as HTMLElement)
    charts.setOption({
      geo: {
        map: 'china',
        aspectScale: 0.8,
        //scale: 0.5,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%', // 地图底部大小
        itemStyle: {
          areaColor: {
            type: 'linear-gradient',
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#152E6E', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#0673AD', // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          shadowColor: '#0f5d9d',
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        },
        emphasis: {
          areaColor: '#0f5d9d',
        },

        regions: [
          {
            name: '南海诸岛',
            itemStyle: {
              areaColor: 'rgba(0, 10, 52, 1)',
              borderColor: 'rgba(0, 10, 52, 1)',

              opacity: 0,
              label: {
                show: false,
                color: '#009cc9',
              },
            },
            label: {
              show: false,
              color: '#FFFFFF',
              fontSize: 12,
            },
          },
        ],
      },
      series: [
        {
          type: 'map',
          // selectedMode: 'multiple', 多选
          map: 'china',
          aspectScale: 0.8,
          layoutCenter: ['50%', '50%'], // 地图位置
          layoutSize: '100%', // 地图大小
          scaling: 1,
          zoom: 1, // 当前视角的缩放比例
          // roam: true, // 是否开启平游或缩放
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 1,
            max: 2,
          },
          label: {
            show: true,
            color: '#FFFFFF',
            fontSize: 12,
          },
          itemStyle: {
            areaColor: '#0c3653',
            borderColor: '#fff',
            borderWidth: 1.8,
          },
          emphasis: {
            areaColor: '#56b1da',
            label: {
              show: true,
              color: '#fff',
            },
          },
          data: data,
        },
        {
          name: 'Top 5',
          type: 'scatter',
          coordinateSystem: 'geo',
          // symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
          symbal: 'pin',
          symbolSize: [20, 20],
          symbolOffset: [0, '-40%'],
          label: {
            show: true,
            formatter(value: any) {
              return value.data.value[2]
            },
          },
          itemStyle: {
            color: '#1e90ff', //标志颜色
          },
          data: data,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          emphasis: {
            scale: true,
          },
          zlevel: 1,
        },
      ],
    })
    charts.on('click', (e: any) => {
      store.item = e.data.children
      initPie()
      initLine()
    })
  }

  const initPie = () => {
    const city = store.list.diseaseh5Shelf.areaTree[0].children
    const charts = echarts.init(
      document.querySelector('.box-left-pie') as HTMLElement
    )
    charts.setOption({
      backgroundColor: '#223651',
      /* title: {
        text: '明细',
        left: 'center',
        textStyle: {
          //文字颜色
          color: '#ccc',
          //字体风格,'normal','italic','oblique'
          fontStyle: 'normal',
          //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
          fontWeight: 'bold',
          //字体系列
          fontFamily: 'sans-serif',
          //字体大小
          fontSize: 18,
        },
      }, */
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        left: 'left',
        textStyle: {
          //图例文字的样式
          color: '#fff',
          fontSize: 12,
        },
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: store.item.map((v) => {
            return {
              name: v.name,
              value: v.total.confirm,
            }
          }),
          emphasis: {
            label: {
              show: true,
              fontSize: '15',
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })
  }

  const initLine = () => {
    const charts = echarts.init(
      document.querySelector('.box-left-line') as HTMLElement
    )
    charts.setOption({
      backgroundColor: '#223651',
      xAxis: {
        type: 'category',
        data: store.item.map((v) => v.name),
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      label: {
        show: true,
      },
      series: [
        {
          data: store.item.map((v) => v.total.confirm),
          type: 'line',
          smooth: true,
        },
      ],
    })
  }
</script>

<template>
  <div :style="{ background: `url(${bg})` }" class="box">
    <div style="color: white" class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div id="china" class="box-center"></div>
    <div style="color: white" class="box-right">
      <table border="1" cellspacing="0" class="table">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group
          enter-active-class="animate__animated animate__backInDown"
          tag="tbody"
        >
          <tr
            @Click="getLineData(index)"
            :key="item.name + index"
            v-for="(item, index) in store.item"
          >
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
        <!-- <tfoot>
          <tr style="text-align: center">
            {{
              store.item.length
            }}条数据
          </tr>
        </tfoot> -->
      </table>
    </div>
  </div>
</template>

<style lang="less">
  @itemColor: #41b0db;
  @itemBg: #223651;
  @itemBorder: #212028;

  .table {
    width: 100%;
    background: #212028;
    tr {
      th {
        padding: 5px;
        white-space: nowrap;
      }
      td {
        padding: 5px 10px;
        width: 100%;
        white-space: nowrap;
      }
    }
  }
  * {
    padding: 0;
    margin: 0;
  }
  html,
  body,
  #app {
    height: 100%;
    overflow: hidden;
  }
  .box {
    height: 100%;
    display: flex;
    overflow: hidden;
    padding: 10px;
    &-left {
      width: 400px;
      &-pie {
        height: 320px;
        margin-top: 20px;
      }
      &-line {
        height: 320px;
        margin-top: 20px;
      }
      &-card {
        white-space: nowrap;
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto auto;
        section {
          background: @itemBg;
          border: 1px solid @itemBorder;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          div:nth-child(2) {
            color: @itemColor;
            padding: 10px 0;
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }
    &-center {
      flex: 1;
    }
    &-right {
      width: 400px;
    }
  }
</style>

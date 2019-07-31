<template>
	<div>
		<headTitle v-on:value1='value1' v-on:value2='value2' :chlid='chlid'></headTitle>
		<div class="indexbox">
			<el-row :gutter="20" id="row1">
			  <el-col :span="7" style="height:100%">
			  	<el-card class="box-card CanvasStyle" shadow='never'>
				  <div slot="header" class="clearfix">
				    <span class="yw_img">实时描述</span>
				  </div>
				  	<ul class="list">
				  		<li><img class="box_jd" src="../assets/wx.png" /><span class="ms_title">维修服务量：</span>{{Echarts4Sum}} 当前峰值:{{maxE4}}</li>
				  		<li><img class="box_jd" src="../assets/hy.png" /><span class="ms_title">会议服务量：</span>服务{{Echarts5Sum}}次，服务{{E5People}}人</li>
				  		<li><img class="box_jd" src="../assets/sw.png" /><span class="ms_title">事务接待量：</span>今日维修{{Echarts3Sum}}次</li>
				  		<li><img class="box_jd" src="../assets/qt.png" /><span class="ms_title">前台接待量：</span>今日接待{{Echarts2Sum}}次，当前峰值：{{maxE2}}</li>
				  	</ul>
				  	<!--<img class="pb" src="../assets/pb.png"/>-->
				</el-card>
				<el-card class="box-card CanvasStyle" shadow='never'>
				  <div slot="header" class="clearfix">
				    <span class="yw_img">项目人员工种统计分析</span>
				  </div>
				  	<div id="echarts1" :style="{'width': '100%','height':echartsHeight}"></div>
				</el-card>
			  </el-col>
			  <el-col :span="10" style="height:100%;overflow:hidden">
			  	<el-card class="box-card" shadow='never'>
				  <div slot="header"  id="BDMap" style="box-sizing:border-box" class="clearfix">
				    <span class="yw_img">地图展示</span>
            		<span @click="mianji" class="xmz" style="float: right;cursor: pointer;">项目总面积</span>
				  </div>
				  <div style="position:relative">
				  	<div id="allmap" :style="{'width': '100%','height': '420px'}">
					</div>
				  	<div class="underBox">
				  		<p>项目名称：{{name}}</p>
						<p>项目面积：{{ghxxxmgm}}㎡</p>
				  	</div>
				</div>
				</el-card>
			  	</el-col>
			  	<el-col :span="7"  style="height:100%">
					<el-card class="box-card CanvasStyle"  shadow='never'>
					<div slot="header" class="clearfix">
						<span class="yw_img">前台访客人数</span>
					</div>
						<div id="echarts2"  :style="{'width': '100%','height':echartsHeight}"></div>
					</el-card>
					<el-card class="box-card CanvasStyle"  shadow='never'>
					<div slot="header" class="clearfix">
						<span class="yw_img">事务接待服务统计</span>
					</div>
						<div id="echarts3" :style="{'width': '100%','height':echartsHeight}"></div>
					</el-card>
			  </el-col>
			 </el-row>
			 <!-- 




			  -->
			<el-row :gutter="20" id="row2">
			  <el-col :span="12">
			  	<el-card class="box-card" shadow='never'>
				  <div slot="header" class="clearfix">
				    <span class="yw_img">工程维修量</span>
				  </div>
				  	<div id="echarts4" :style="{'width': '100%','height':bottomHeight}"></div>
				</el-card>
			  </el-col>
			  <el-col :span="12">
			  <el-card class="box-card" shadow='never'>
				  <div slot="header" class="clearfix">
				    <span class="yw_img">会议服务统计分析</span>
				  </div>
				  	<div id="echarts5" :style="{'width': '100%','height':bottomHeight}"></div>
				</el-card>
			  </el-col>
			</el-row>
		</div>
    <el-dialog :visible.sync="status"  width="60%" center>
       <div id="echarts6" :style="{'width': '100%','height': '500px'}"></div>
    </el-dialog>
	</div>
</template>

<script>
import $ from 'jquery'
	export default {
		name: 'index',
		data() {
			return {
				 screenHeight:'',
				 id:'',
				 name:'',
				 time:'2019-05-17',
				 chlid:'',
				Echarts2Sum:0,
				maxE2:0,
				Echarts3Sum:0,
				Echarts4Sum:0,
				maxE4:0,
				Echarts5Sum:0,
				E5People:0,
				height:window.innerHeight,
         		ghxxxmgm:'',
				 status:false,
				 echartsHeight:"",
				 bottomHeight:""
			}
		},
		created() {
		},
		mounted() {
			console.log(this.name)
		// 调试自适应页面
			var row1=document.getElementById("row1")
			var row2=document.getElementById("row2")
			var row1Length=this.height*0.53+"px"//第一行高度
			var row2Length=this.height*0.35+"px"//第二行高度
			console.log(row1Length)
			row1.style.setProperty("height",row1Length)
			row2.style.setProperty("height",row2Length)
			var newHeight=row1.style.height.slice(0,-2)/2-20

			// 获取echarts的高度		
			var echartsDetails=document.getElementsByClassName("el-card__header")
			this.echartsHeight=this.height*0.50/2-echartsDetails[0].offsetHeight-40+"px"
			
			var CanvasStyle=document.getElementsByClassName("CanvasStyle")
			for(var i of CanvasStyle){
				i.style.setProperty("height",newHeight+"px")
			}
			// 调试地图部分
			var BDMap=document.getElementById("BDMap")
			// 百度地图的实际高度and固定地图位置
			var BDMapHeight=this.height*0.53-BDMap.offsetHeight-76-20+"px"
			var allmap=document.getElementById("allmap")
			allmap.style.setProperty("height",BDMapHeight)
			//bottom部分自适应调试bottomHeight
			this.bottomHeight=this.height*0.35-96- BDMap.offsetHeight+"px"
			// 设置自适应页面结束
			var that=this;
			var time='2019-05-17'
			this.axios({
				method: 'post',
				url: this.$httpConfig+'datavisualization/overviewofbusiness/getLouyuList',
			}).then(function (res) {
				if(res.data.code='0000'){
					that.ajax(res.data.data.rows[0].id,time)
					that.id=res.data.data.rows[0].id
					var arr=res.data.data.rows.slice(1,res.data.data.rows.length)
					for(var i=0;i<arr.length;i++){
						arr[i].data=arr[i].jbxxmap.split(',')
					}
					that.allmap(arr)

				}
				// console.log(res);
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		watch:{
		},
		methods: {
      mianji(){
        this.status=true
       var that=this;
       setTimeout(function() {
         that.M(that.id)
       },500)
      },
      M(id){
         var that=this;
        this.axios({
        	method: 'get',
        	url: this.$httpConfig+'datavisualization/overviewofbusiness/getLouYuZongMianJi',
          params:{
          	louyuid:id
          },
        }).then(function (res) {
        	// console.log(res,'面积');
          that.echarts6(res.data.keyData,res.data.valueData)
        })
        .catch(function (error) {
        	console.log(error);
        });
      },
			ajax(id,time){
				var that=this;
				//工种
				this.axios({
					method: 'get',
					url: this.$httpConfig+'datavisualization/overviewofbusiness/getTypeOfWork',
					params:{
						louyuid:id
					},
				}).then(function (res) {
					if(res.data.code='0000'){
						that.echarts1(res.data.data.keyData,res.data.data.valueData)
					}
					// console.log(res);
				})
				.catch(function (error) {
					console.log(error);
				});
				this.axios({
					method: 'get',
					url: this.$httpConfig+'datavisualization/overviewofbusiness/getVisitorReceptionOfDay',
					params:{
						time:time,
						louyuid:id
					},
				}).then(function (res) {
					if(res.data.code='0000'){
						that.echarts2(res.data.data.valueData,res.data.data.xData)
					}
					// console.log(res);
				})
				.catch(function (error) {
					console.log(error);
				});
				this.axios({
					method: 'get',
					url: this.$httpConfig+'datavisualization/overviewofbusiness/getReceptionCountOfDay',
					params:{
						time:time,
						louyuid:id
					},
				}).then(function (res) {
					if(res.data.code='0000'){
						that.echarts3(res.data.data.valueData,res.data.data.xData)
					}
					// console.log(res,'事务接待');
				})
				.catch(function (error) {
					console.log(error);
				});
				this.axios({
					method: 'get',
					url: this.$httpConfig+'datavisualization/overviewofbusiness/getRepairCountOfDay',
					params:{
						time:time,
						louyuid:id
					},
				}).then(function (res) {
					if(res.data.code='0000'){
						that.echarts4(res.data.data.valueData,res.data.data.xData)
					}
					// console.log(res,'工程维修量');
				})
				.catch(function (error) {
					console.log(error);
				});
				this.axios({
					method: 'get',
					url: this.$httpConfig+'datavisualization/overviewofbusiness/getMeettingCountOfDay',
					params:{
						time:time,
						louyuid:id
					},
				}).then(function (res) {
					if(res.data.code='0000'){
						that.echarts5(

							res.data.data.keyData,
							// 服务次数
							res.data.data.seriesData[0].data,
							// 服务人数
							res.data.data.seriesData[1].data,
							res.data.data.xData)
					}
					// console.log(res,'huiyi');
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			value1(value1){
				var id=''
				if(value1==''){
					this.ajax(this.id,this.time)
					// console.log(this.time)
				}else{
					for(var i=0;i<value1.length;i++){
						id+= value1[i]
					}
					id=id.replace(/\s+/g,"")
					this.ajax(id,this.time)
				}

			},
			value2(value2){
				if(value2==''){
					this.time='2017-05-17'
				}else{
					this.ajax(this.id,value2)
					this.time=value2
				}

			},
			allmap(arr){
				// console.log(arr)
				var map = new BMap.Map("allmap");    // 创建Map实例
				// console.log("下面打印的在index 308行 传进函数的参数")
				// console.log(arr)
				map.centerAndZoom(new BMap.Point(117.724294,39.00964),12);  // 初始化地图,设置中心点坐标和地图级别
				map.setCurrentCity("天津");          // 设置地图显示的城市 此项是必须设置的
				map.enableScrollWheelZoom(true);
				map.setMapStyleV2({styleJson:this.styleJson});
				map.setMinZoom(10)
				map.disableDragging()
				var that=this;
				this.name=arr[0].jbxxname
				this.ghxxxmgm=arr[0].ghxxxmgm
				var markers=[];
				for(var i=0;i<arr.length;i++){
					var point = new BMap.Point(arr[i].data[0],arr[i].data[1]);
					var data={
						name:arr[i].jbxxname,
            			ghxxxmgm:arr[i].ghxxxmgm,
						id:arr[i].id
					}
					var marker = new BMap.Marker(point);//创建标注
					// console.log("打印")
					// console.log(marker.point)
					var url="http://api.map.baidu.com/geoconv/v1/?&from=3&to=5&ak=RzQ7aumfCY14b5DyfDiLjuDDhCqwRNct&coords="+marker.point.lng+","+marker.point.lat
					$.ajax({
						url,
						type: 'GET',
						dataType: 'JSONP',
						success(res){
							marker.point.lng=res.result[0].x
							marker.point.lat=res.result[0].y
						}
					})
					this.addClickHandler(data, marker); //添加点击事件


					let label = new BMap.Label(arr[i].jbxxname,{offset:new BMap.Size(20,-10)});
					addMarker(point,label)
					markers.push(marker);
				}
				function addMarker(point,label){
					console.log("调用我！！！")
					var marker = new BMap.Marker(point);
					map.addOverlay(marker);
					// setTitle(title: String)
					// marker.setLabel(label);一直显示
					// 鼠标划上显示
					marker.setTitle(label.content);
				}	

				new BMapLib.MarkerClusterer(map, {markers:markers});//聚合点
				// console.log(markers)
			},
			addClickHandler(content,marker){
				var that=this;
	            marker.addEventListener("click",function(e){
					// console.log(e,'nihao')
					 that.fun(content,e)
	            })
	        },
	        fun(content,e){
				this.name=content.name
				console.log(name)
            	this.ghxxxmgm=content.ghxxxmgm
				this.chlid=content.id
				this.ajax(content.id,this.time)
	        },
			echarts1(key,data){
				let myChart = this.$echarts.init(document.getElementById('echarts1'))
				var option={
					 tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
				    legend: {
				    	itemWidth: 15, //图例的宽度
				        itemHeight: 15, //图例的高度
				        itemGap: 10,
				        orient: 'vertical',
				        left: 'left',
				        top:'center',
				        icon: "rect",
				        data:key,
				        textStyle: {color: '#fff'},
				    },
				    color:['rgb(246,121,10)','rgb(245,245,4)','rgb(6,232,5)','rgb(8,208,246)','rgb(33,144,255)',
//				   			'rgb(76,72,250)','rgb(223,58,137)','rgb(49,27,47)','rgb(82,122,232)'
				    ],
			        toolbox:{
			        	orient: 'horizontal',
			        	 x: '3%',
			        },
				    series: [
				         {
			            name: '访问来源',
			            center: ['65%', '60%'],
			            type: 'pie',
			            radius: ['55%', '75%'],
				            data:data
				        }
				    ]
				}
				window.onresize = myChart.resize;
				myChart.setOption(option)
			},
			echarts2(key,data){
				//求求和
				for (let i = 0; i < key.length; i++) {
					this.Echarts2Sum += key[i];
					if(this.maxE2<key[i]){this.maxE2=key[i]}
				}

				let myChart = this.$echarts.init(document.getElementById('echarts2'))
				var option= {
					   tooltip: {
				        trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        top:'20%',
				        right: '10%',
				        bottom: '1%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data:data,
				        name: '（时）',
	            		nameTextStyle:{
	            			color: 'rgb(64,193,255)'
	            		},
				        axisLine:{
	            			lineStyle:{
	                            	color:'#fff'
	                            },
	            		},
				        axisLabel: {
	                            show: true,
	                            textStyle: {
	                                color: 'rgb(64,193,255)'
	                            }
	                        }
				    },
				    color:['rgb(255,99,136)'],
				    yAxis: {
				        type: 'value',
				         splitLine:{show: false},//去除网格线
	            		name: '（人数）',
	            		nameTextStyle:{
	            			color: 'rgb(64,193,255)'
	            		},
	            		axisLine:{
	            			lineStyle:{
	                            	color:'#fff'
	                            },
	            		},
				        axisLabel: {

	                            show: true,
	                            textStyle: {
	                                color: 'rgb(64,193,255)'
	                            }
	                        }
				    },
				    series: [
				        {
				            name:'访客',
				            type:'line',
				            smooth:true,
				            stack: '总量',
				            data:key
				        }
				    ]
				}
				window.onresize = myChart.resize;
				myChart.setOption(option)
			},
			echarts3(key,data){
	
				//求和
				for (let i = 0; i < key.length; i++) {
					this.Echarts3Sum += key[i];
				}

				let myChart = this.$echarts.init(document.getElementById('echarts3'))
				var option= {
					   tooltip: {
				        trigger: 'axis'
				    },
				     grid: {
				        left: '3%',
				        top:'20%',
				        right: '0%',
				        bottom: '1%',
				        containLabel: true
				    },
			    xAxis: [
			        {
			            type: 'category',
			            data:data,
			            axisPointer: {
			                type: 'shadow'
			            },
			            axisLine:{
	            			lineStyle:{
	                            	color:'#fff'
	                            },
	            		},
			            axisLabel: {
			                textStyle: {
                                color: 'rgb(64,193,255)'
                            }
			            },
			        }
			    ],
			    color:['rgb(33,144,255)'],
			    yAxis: [
			        {
			            type: 'value',
			            name: '（数量）',
			             splitLine:{show: false},//去除网格线
			            nameTextStyle:{
	            			color: 'rgb(64,193,255)'
	            		},
	            		axisLine:{
	            			lineStyle:{
	                            	color:'#fff'
	                            },
	            		},
			            axisLabel: {
			                formatter: '{value}',
			                textStyle: {
                                color: 'rgb(64,193,255)'
                            }
			            },

			        }
			    ],
			    series: [
			        {
			            name:'数量',
			            type:'bar',
			            data:key,
			            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: '#fff',
										fontSize: 12
									}
								}
							}
						},

			        }
			    ]
				}
				myChart.setOption(option)
				window.onresize = myChart.resize;
			},
			//工程维修量
			echarts4(key,data){
				//求和
				for (let i = 0; i < key.length; i++) {
					this.Echarts4Sum += key[i];
					if(key[i]>this.maxE4){this.maxE4=key[i]}
				}

				let myChart = this.$echarts.init(document.getElementById('echarts4'))
				var option= {
					   tooltip: {
				        trigger: 'axis'
				    },
				     grid: {
				        left: '3%',
				        top:'10%',
				        right: '5%',
				        bottom: '1%',
				        containLabel: true
				    },
			    xAxis: [
			        {
			            type: 'category',
			            data:data,
			            name: '（时）',
			            axisPointer: {
			                type: 'shadow'
			            },
			             nameTextStyle:{
	            			color: 'rgb(64,193,255)'
	            		},
			            axisLine:{
	            			lineStyle:{
	                            	color:'#fff'
	                            },
	            		},
			            axisLabel: {
			                textStyle: {
                                color: 'rgb(64,193,255)'
                            }
			            },
			        }
			    ],
			    color:['rgb(8,208,246)'],
			    yAxis: [
			        {
			        	 splitLine:{show: false},//去除网格线
			            type: 'value',
			            name: '（数量）',
			            nameTextStyle:{
	            			color: 'rgb(64,193,255)'
	            		},
	            		axisLine:{
	            			lineStyle:{
	                            	color:'#fff'
	                            },
	            		},
			            axisLabel: {
			                formatter: '{value}',
			                textStyle: {
                                color: 'rgb(64,193,255)'
                            }
			            },

			        }
			    ],
			    series: [
			        {
			            name:'数量',
			            type:'bar',
			            data:key,
			            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: { //数值样式
										color: '#fff',
										fontSize: 12
									}
								}
							}
						},

			        }
			    ]
				}
				window.onresize = myChart.resize;
				myChart.setOption(option)
			},
			// 会议服务统计分析
			echarts5(key,data1,data2,value){
				// data1次数 data2人数
				//访问次数总和
				for (let i = 0; i < data1.length; i++) {
					this.Echarts5Sum += data1[i];
				}			
				for (let i = 0; i < data2.length; i++) {
					this.E5People += data2[i];
				}
				let myChart = this.$echarts.init(document.getElementById('echarts5'))
				var option= {
					   tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:key,
				        left:'right',
				        textStyle: {
							color: '#fff'
							},
				    },
				    grid: {
				        left: '3%',
				        top:'10%',
				        right: '5s%',
				        bottom: '1%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data:value,
				        name: '（时）',
	            		nameTextStyle:{
	            			color: 'rgb(64,193,255)'
	            		},
				        axisLine:{
	            			lineStyle:{
	                            	color:'#fff'
	                            },
	            		},
				        axisLabel: {
	                            show: true,
	                            textStyle: {
	                                color: 'rgb(64,193,255)'
	                            }
	                        }
				    },
				    color:['rgb(246,121,10)','rgb(245,245,4)'],
				    yAxis: {
				        type: 'value',
	            		name: '（人数）',
	            		 splitLine:{show: false},//去除网格线
	            		nameTextStyle:{
	            			color: 'rgb(64,193,255)'
	            		},
	            		axisLine:{
	            			lineStyle:{
	                            	color:'#fff'
	                            },
	            		},
				        axisLabel: {

	                            show: true,
	                            textStyle: {
	                                color: 'rgb(64,193,255)'
	                            }
	                        }
				    },
				    series: [
				        {
				            name:'服务次数',
				            type:'line',
				            stack: '总量',
				            smooth:true,
				            data:data1
				        },
				        {
				            name:'服务人数',
				            type:'line',
				            smooth:true,
				            stack: '总量',
				            data:data2
				        }
				    ]
				}
				window.onresize = myChart.resize;
				myChart.setOption(option)
			},
      echarts6(keyData,valueData){
        let myChart = this.$echarts.init(document.getElementById('echarts6'))
        var option = {
            title : {
                text: '项目总面积统计分析',
                subtext: '',
                x:'center',
                textStyle:{
                  color:'#fff'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:keyData,
                 textStyle: {
                color: '#fff'
                },
            },
            series : [
                {
                    name: '项目面积',
                    type: 'pie',
                    radius : '55%',
                    center: ["60%", '60%'],
                    labelLine: {
                        normal: {
                            length: 20,
                            length2: 70,
                        }

                    },
                    data:valueData,
                    label: {
                        normal: {
                            formatter: '{b|{b}  }{a|{c} ({d}%)}\n\n',
                            borderWidth: 20,
                            borderRadius: 4,
                            padding: [0, -70],
                            rich: {
                                a: {
                                    fontSize: 12,
                                    lineHeight: 20
                                },
                                b: {
                                    fontSize: 12,
                                    lineHeight: 20,
                                }
                            }
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
            }
        window.onresize = myChart.resize;
        myChart.setOption(option)
      }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.list{
		line-height: 28px;
	}
	.underBox{
		width: 300px;
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 10px;
		background:rgba(10,50,92,0.8);
		z-index: 999;
		/*height: 200px;*/
		// height: 40px;
		border-radius: 10px;
		p{
			line-height: 35px;
		}
	}
	.pb{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
  .M{
    width: 100%;
    margin:0 auto;
  }
  .yw_img{
  	background:url(../assets/yw.png) no-repeat;
  	padding:10px 20px;
  	background-size:100% 100%;
  }
  .xmz{
   background:url(../assets/button.png) no-repeat;
   background-size:100% 100%;
   padding:10px 20px;
  }
  .list>li{
  	padding:5px 0;
  	display:flex;
  }
  .ms_title{
  	width:30%;
  	display:block;
  }
  .box_jd{
  	width: 20px;
    height: 20px;
    padding: 4px 10px 0 0;
  }


</style>
<style type="text/css">
	.el-row{
		margin: 0 !important;
	}
	.el-card{
		background-color:rgb(15,28,62);
		box-shadow: 0 15px 15px 0 rgba(0, 0, 0, 0.4);
		color: #6fb0de;
		border:0;
		margin-top: 20px;
		text-align: left;
		position: relative;
		background-image: url(../assets/pb.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
	}
	.el-card__header{
		border-bottom:none;
		width: 98%;
		margin: 0 auto;
		padding:18px 10px;
	}
	.card__header {
		padding: 10px 12px;
	}
  .el-dialog{
    background:#071432 url(../assets/tc.png) no-repeat;
    background-size: 100% 100%;
    position:fixed;
    left:50%;
    top:50%;
    margin-top:0 !important;
    transform: translate(-50%,-50%);
  }
	/* 页面Canvas样式 */
  .CanvasStyle{
	  box-sizing: border-box
  }
	.anchorBL{display:none;}
</style>

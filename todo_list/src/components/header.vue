<template>
	<div class="header" id="height">
		<!--<img src="../assets/logo.png"/>-->
		<img class="bg" src="../assets/bg.png" />
		<!--<span>睿易物业大数据平台</span>-->
		<div class="time" style="margin-right:85px">{{new_time}}</div>
		<div class="xiangmu"  @click="HadleShow" >
			项目选择
			<ul class="list_xuan">
				<li v-for="item of options" :key="item.id">{{item.jbxxname}}</li>
			</ul>
		</div>


		<div class="disflex">
			<el-select v-model="value1" multiple placeholder="请选择">
				<el-option
					v-for="item in options"
					:key="item.id"
					:label="item.jbxxname"
					value-format='yyyy-MM-dd'
					:value="item.id">
				</el-option>
			</el-select> 
			<div style="margin-top: 18px">
				<el-date-picker
					v-model="value2"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
    	new_time:'',
    	options: [],
		value1: [],
		value2:'',
    }
  },
  props:{
	chlid:''
  },
  created(){	  
  	var that=this;
  		setInterval(function(){
  			that.time()
  		})
  	this.axios({
				method: 'post',
				url: this.$httpConfig+'datavisualization/overviewofbusiness/getLouyuList',
			}).then(function (res) {
				if(res.data.code='0000'){
					that.options=res.data.data.rows.slice(1,res.data.data.rows.length)
				}
				// console.log(res);
			})
			.catch(function (error) {
				console.log(error);
			});
  },
  mounted() {
	  var head=document.getElementById("height")
	  head.style.setProperty("height",window.innerHeight*0.11+"px")

  },
  watch:{
  	value1:function(data){
  		// console.log(data)
  		this.$emit('value1', this.value1)
  	},
	value2:function(data){
		if(data==null){
			this.$emit('value2', '')
		}else{
			this.$emit('value2',this.date(data))
		}

	},
  },
  methods:{
	HadleShow(e){
		if(e.target.nodeName=="LI"){
			if(e.target.className=="click"){
				e.target.className=""
			}else{
				e.target.className="click"
			}
		}
	},
  	time(){
  		var that=this
//		    clearTimeout(t);//清除定时器
            var dt = new Date();
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1;
			var day = dt.getDate()-1;
            // var h = dt.getHours();
            // var m = dt.getMinutes();
            // var s = dt.getSeconds();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (day >= 1 && day <= 9) {
                        day = "0" + day;
                    }
                    // if (h >= 0 && h <= 9) {
                    //     h = "0" + h;
                    // }
                    // if (m >= 0 && m <= 9) {
                    //     m = "0" + m;
                    // }
                    // if (s >= 0 && s <= 9) {
                    //     s = "0" + s;
                    // }
					this.new_time=year + "-" + month + "-" + day 
					// + " " + h + ":" + m + ":" + s
  	},
	date(dt){
		//  console.log(dt)
			 var year = dt.getFullYear();
			 var month = dt.getMonth() + 1;
			 var day = dt.getDate();
			 if (month >= 1 && month <= 9) {
			     month = "0" + month;
			 }
			 if (day >= 1 && day <= 9) {
			     day = "0" + day;
			 }
			 return year+'-'+month+'-'+day

	}

  }
}
</script>


<style scoped="scoped" lang="less">
	.header{
		width: 100%;
		background-image: linear-gradient(175deg, #0a325c 30%, #011226 70%);
		box-shadow: 0 15px 15px 0 rgba(0, 0, 0, 0.4);
		overflow: hidden;
		padding: 14px 0;
		position: relative;
		box-sizing: border-box;

		/*img{
			width: 200px;
			height: 80px;
			float: left;
			margin-left: 20px;
			margin-top: 20px;
			margin-right: 20px;
		}*/
		.time{
			position: absolute;
		    right: 2%;
		    font-size: 40px;
		    top: 30%;
		    cursor: default;
		}
		.bg{
			width: 100%;
			/*height: 100%;*/
			position: absolute;
			top: 14px;
			left: 0;

		}
	}
</style>
<style type="text/css">
	.disflex{
		display:none;
		width:30%;
		position:absolute;
		left:50%;
		bottom:20%;
		transform:translateX(-50%);
	}
	.disflex::after{
		content:"";
		display: block;
		clear: both
	}
	.disflex>div{width:35%;float:right;margin-right:30px;cursor: pointer;;}
	.el-select{
		margin-top: 18px;
		height:40px;
		overflow:hidden;
	}
	.el-input__inner{
		background-color:rgb(13,59,108);
		color: #fff;
	}
	.el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 100%;
	}
  .el-input--suffix .el-input__inner{
    padding-right: 0;
    }
    .el-select__tags{
		height:25px !important;
	}
	.el-select__tags .el-tag--small{
		margin-bottom:5px !important;
	}
	.xiangmu{
	   background:url(../assets/xmxe.png) no-repeat;
	   display: inline-block;
	   padding: 10px 60px;
	   background-size: 100% 100%;
	   position:absolute;
	   top: 32%;
       right: 21%;
       cursor:pointer;
	}
	.xiangmu:hover .list_xuan{
		height:500px;opacity: 1;
	}
	.list_xuan{
		height:0px;overflow:auto;
		transition: all 2s;
		position: fixed;
		opacity:0;
		background:#071432 url(../assets/pb.png);
		background-size: 100% 100%;
		z-index:99;
		padding:20px 40px;
		right: 13%;
    	top: 8%;
	}
	.list_xuan>li{
		padding:10px;
		transition:all .5s;
	}
	.list_xuan>li:hover{
		color:#6FB0DE;
	}
	.click{color:#6FB0DE}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 16px;
    height: 16px;
    background-color: #f5f5f5;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px #05122C;
    border-radius: 10px;
    background-color: #f5f5f5;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px #05122C;
    background-color: #05122C;
}
</style>

<template>
    <div class="wrapper">
        <div v-show="isShowSideBar" class="sidebar"></div>
        <div class="main">
            <div class="line"></div>
            <div class="main-info">
                <div class="back"><img :src="arrowLeftBlue" /> Назад</div>
                <div class="title">Менеджер</div>
                <div class="table">
                   
                   <vue-custom-scrollbar :direction="horizontal">
                        <div class="table-titles">
                            <div v-for="(elem, index) in titlesToDisplay" 
                                :key="index" ref="titles" class="table-title">{{elem}}
                            </div>
                        </div>
                        <div class="table-cards">
                            <div v-for="(list, index) in rootToDisplay" :key="index"
                                ref="tableList" class="table-list">
                                    <div v-for="key in list" 
                                        @click="handleItemClick(index, key)"
                                        :key="key"
                                        class="table-list-item"
                                        :class="{
                                            tableListItemSelected: key.isSelected && !key.isEndOfBranch
                                        }"
                                        >                                   
                                        <img :src="key.isSelected ? checkedBox : notCheckedBox" 
                                            class="checkBox">   
                                        <p>{{key.name}}</p> <img v-if="!key.isEndOfBranch" :src="arrowRightGrey" class="arrow-right">                        
                                    </div>
                            </div>
                        </div>
                   </vue-custom-scrollbar>
                    
                </div>
                <button @click="createPermission" class="save-button">Сохранить</button>
            </div>

        </div>
    </div>


</template>

<script>
    import API from "@/api/api";
    import vueCustomScrollbar from 'custom-vue-scrollbar'
    import "custom-vue-scrollbar/dist/style.css"

    export default {
        name: 'Home',
        components:{
            vueCustomScrollbar
        },
        data() {
            return {
                arrowLeftBlue: require("../../public/icons/Vector.svg"),
                arrowRightGrey: require("../../public/icons/Vector2.svg"),
                notCheckedBox: require("../../public/icons/CheckBoxNotChecked.svg"),
                checkedBox: require("../../public/icons/CheckBoxChecked.svg"),

                
                rootPermission: {},
                rootPermissionTitles: {},
                rootToDisplay: [],
                titlesToDisplay: [],
                selectedKeys: [],
                settings: {
                    suppressScrollY: false,
                    suppressScrollX: false,
                    wheelPropagation: false
                },
                isShowSideBar: true
            }
        },
        methods: {
            getTemplates() {
                API.getTemplates().then(data => {
                    this.rootPermission = data.data.rootPermission
                    this.rootPermissionTitles = data.data.rootPermissionTitles
                    let obj = {}
                    for (let name in data.data.rootPermission){
                        obj[name] = { name: name, isSelected: false }
                    }
                    this.rootToDisplay.push(obj)
                })
            },
            createPermission() {
                API.createPermission(this.rootPermission)
            },

            getObjectValueByKeys(keys, obj){

                if (keys.length <= 1) {
                    return obj[keys[0]]
                }
                else {
                    let key = keys[0]
                    keys = keys.slice(1)
                    return this.getObjectValueByKeys(keys, obj[key])
                }            
            },

            handleItemClick(index, key){
                if (this.selectedKeys.length <= index + 1 || (this.selectedKeys[index] != key.name)){
                    this.selectedKeys = this.selectedKeys.slice(0, index)
                    this.selectedKeys.push(key.name)

                    this.rootToDisplay = this.rootToDisplay.slice(0, this.selectedKeys.length)
                    let objToPush = {}
                    let rootObj = {}
                    rootObj = this.getObjectValueByKeys(this.selectedKeys, this.rootPermission)
                    
                    for (let name in rootObj){
                        if (rootObj[name] === 1){
                            objToPush[name] = { name: name, isSelected: true, isEndOfBranch: true }
                        } else if (rootObj[name] === 0){
                            objToPush[name] = { name: name, isSelected: false, isEndOfBranch: true }
                        } else {
                            objToPush[name] = { name: name, isSelected: false }
                        }
                    }


                    if (rootObj === 0 || rootObj === 1){
                        let permission = rootObj === 0 ? 1 : 0
                        this.togglePermission(this.selectedKeys, this.rootPermission, permission) 
                        for (let name in this.rootToDisplay[this.rootToDisplay.length - 1]){
                            this.rootToDisplay[this.rootToDisplay.length - 1][name].isEndOfBranch = true                    
                        }
                    }
                    this.rootToDisplay.push(objToPush)
                }

                for (let i in this.rootToDisplay[index]){                    
                    if ((this.rootToDisplay[index][i].name != key.name && 
                            !this.rootToDisplay[index][i].isEndOfBranch) || 
                             (this.rootToDisplay[index][i].isEndOfBranch && this.rootToDisplay[index][i].name === key.name && this.rootToDisplay[index][i].isSelected)){
                                this.rootToDisplay[index][i].isSelected = false
                        }
                    else if (this.rootToDisplay[index][i].name == key.name){
                        this.rootToDisplay[index][i].isSelected = true
                    }
                }                
                this.titlesToDisplay = this.fillTitlesToDisplay(this.selectedKeys, this.rootPermissionTitles)
                this.getSetTitlesWidth()
            },

            togglePermission(keys, obj, newState){
                if (keys.length === 1){
                    obj[keys[0]] = newState
                    return
                }
                return this.togglePermission(keys.slice(1), obj[keys[0]], newState)
            },

            fillTitlesToDisplay(arrayKeys, root, result = []){
                if (arrayKeys.length === 0 || !root || !root[arrayKeys[0]]) return result
                result.push(root[arrayKeys[0]].title)
                return this.fillTitlesToDisplay(arrayKeys.slice(1), root[arrayKeys[0]].items, result)                
            },

            hideShowSidebar(){
                if (window.innerWidth >= 768){ this.isShowSideBar = true }
                else{ this.isShowSideBar = false }
                window.titlesToDisplay = this.titlesToDisplay
            },

            initiateTestingState(){
                let clicks = [
                    {index: 0, item: {name: 'part1', isSelected: false }},
                    {index: 1, item: {name: 'part11', isSelected: false }},
                    {index: 2, item: {name: 'part111', isSelected: false }},
                    {index: 3, item: {name: 'part1111', isSelected: false }},
                    {index: 4, item: {name: 'part11111', isSelected: false }},
                    {index: 5, item: {name: 'action', isSelected: false }},
                    {index: 6, item: {name: 'action2', isSelected: false }},
                ]
                clicks.forEach(click => this.handleItemClick(click.index, click.item))
            },

            getSetTitlesWidth(){
                let tableListsWidths = this.$refs.tableList.map(item => item.clientWidth)
                console.log('Hello there')
                console.log(tableListsWidths)
                let titleWidths = this.$refs.titles[0]
                console.log(titleWidths)
               
               
                for (let i = 0; i < this.$refs.titles.length; i++){
                    this.$refs.titles[i].style.width = tableListsWidths[i] + 'px'                    
                }
                
            }
        },

        mounted() {
            this.getTemplates()   
            this.hideShowSidebar()
            window.addEventListener('resize', this.hideShowSidebar)
            setTimeout(this.initiateTestingState, 0)
            setTimeout(this.getSetTitlesWidth, 50)            
        },
        beforeUnmount(){
            window.removeEventListener('resize', this.hideShowSidebar)            
        },
        computed: {

        }
    }
</script>
<style lang="scss" scoped>

.wrapper{
    display:flex;
    width: 100vw;
    
    .sidebar{
        width: 200px;
        height: 100vh;
        flex-shrink: 0;
        background-color: rgba(14, 17, 23, 1);
    }

    .main{
        width: 100%;
        height: 100vh;
        .line{
            width: 100%;
            border: 1px solid #DEE2E7;
            margin-top: 71px;
            margin-bottom: 24px;
        }
        .main-info{
            padding-left: 25px;
            padding-right: 25px;
            .back{
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                color: #3391F5;
                margin: 24px 0;
                cursor: pointer
            }
            .save-button{
                color: #FFFFFF;
                background: #162133;
                padding: 10px 16px;
                border: 0px solid #162133;
                border-radius: 4px;
                /* font-family: 'Inter'; */
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 20px;
                /* identical to box height, or 143% */

                letter-spacing: 0.015em;
                margin: 24px;
                position: absolute;
                right: 0px;
            }

            .title{
                box-sizing: border-box;
                width: 296px;
                height: 40px;
                background: #F3F5F7;
                border-radius: 3px;
                font-style: normal;
                font-weight: 500;
                font-size: 20px;
                line-height: 30px;
                /* identical to box height, or 150% */
                padding-left: 16px;
                display: flex;
                align-items: center;
                color: #162133;                
            }

            .table{
                min-height: 200px;
                background: #FFFFFF;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
                border-radius: 4px;
                margin-top: 24px;

                .table-titles{
                    display: flex;
                    height: 44px;
                    width: 100%;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
                    .table-title{
                        padding-left: 5px;
                        padding-bottom: 9px;
                        font-style: normal;
                        font-weight: 700;
                        font-size: 13px;
                        display: flex;
                        align-items: flex-end;
                        letter-spacing: 0.015em;
                        color: #162133;
                        height: 44px;
                    }
                }
                .table-cards{
                    display: flex;
                    min-height: 200px;
                    padding-bottom: 15px;
                    .table-list{
                        margin: 0;
                        border: 1px solid #DEE2E7;
                        // height: 90%;

                        .table-list-item{
                            font-style: normal;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 20px;
                            color: #162133;
                            height: 36px;
                            padding-left: 12px;
                            padding-right: 20px;
                            cursor: pointer;
                            display: flex;
                            position: relative;
                            align-items: center;

                                .checkBox{
                                    width: 18px;
                                    height: 18px;
                                    // position: absolute;
                                    // left: 3%;
                                    // top: 50%;
                                    // transform: translate(0, -50%);
                                }

                                p{
                                    margin-left: 15px;
                                    margin-right: 10px;
                                }
                                .arrow-right{
                                    width: 7px;
                                    height: 10px;
                                    position: absolute;
                                    right: 5px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }                  
                        }
                    }
                    .tableListItemSelected{
                        background-color: #162133;
                        p{
                            color: #F3F5F7;
                        }
                    }            
                }
            }
        }
    }
}


</style>
<template>
    <div class="wrapper">
        <div class="sidebar"></div>
        <div class="main">
            <div class="line"></div>
            <div class="main-info">
                <div class="back"><img :src="arrowLeftBlue" /> Назад</div>
                <div class="title">Менеджер</div>
                <div class="table">
                    <div class="table-titles">
                        <div v-for="(elem, index) in titlesToDisplay" 
                            :key="index" class="table-title">{{elem}}
                         </div>
                    </div>
                   
                    <div class="table-cards">
                        <div v-for="(list, index) in listsToDisplay" 
                            :key="index" class="table-list"
                            >
                                <div v-for="key in list" 
                                    @click="handleItemClick(index, key)"
                                    :key="key"
                                    class="table-list-item">
                                      <p>{{key.name}}</p> <img :src="arrowRightGrey" class="arrow-right">                         
                                </div>
                        </div>
                    </div>
                </div>
                <button @click="createPermission" class="save-button">Сохранить</button>
            </div>

        </div>
    </div>


</template>

<script>
    import API from "@/api/api";

    export default {
        name: 'Home',
        components:{
        },
        data() {
            return {
                arrowLeftBlue: require("../../public/icons/Vector.svg"),
                arrowRightGrey: require("../../public/icons/Vector2.svg"),
                
                rootPermission: {},
                rootPermissionTitles: {},
                selectedKeys: []
            }
        },
        methods: {
            getTemplates() {
                API.getTemplates().then(data => {this.rootPermission = data.data.rootPermission, this.rootPermissionTitles = data.data.rootPermissionTitles})
            },
            createPermission() {
                API.createPermission()
            },
            
            handleItemClick(...w){
                console.log(w[0], w[1].name)
            }
        },

        mounted() {
            this.getTemplates()
            setTimeout(() =>  console.log(this.rootPermission), 1000)
            // setTimeout(() =>  console.log(this.rootPermissionTitles['part1'].title), 1000)

        },
        computed: {
            titlesToDisplay(){
                let array = []
                
                for (let key in this.rootPermissionTitles){
                    array.push(this.rootPermissionTitles[key].title)
                }
                return array
            },

            listsToDisplay(){
               let obj = {}
               for (let name in this.rootPermission){
                    obj[name] = {name: name, isChecked: false, isChosen: false}
                }

               return [obj]
            }

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
        background-color: rgba(14, 17, 23, 1);
;
    }

    .main{
        width: 100%;
        .line{
            width: 100%;
            border: 1px solid #DEE2E7;
            margin-top: 71px;
            margin-bottom: 24px;
        }

        .main-info{
            padding-left: 25px;

            .back{
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                color: #3391F5;
                margin: 24px 0;
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
                    width: 100%;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);

                   
                    .table-title{
                        padding-left: 16px;
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
                    height: 100%;
                    .table-list{
                        margin: 0;
                        border: 1px solid #DEE2E7;
                        height: 90%;

                        .table-list-item{
                            font-style: normal;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 20px;
                            color: #162133;
                            height: 36px;
                            padding-left: 12px;
                            padding-right: 6px;
                            cursor: pointer;
                            display: flex;
                            position: relative;

                                p{
                                    margin-right: 10px;
                                }
                                .arrow-right{
                                    width: 7px;
                                    height: 10px;
                                    position: absolute;
                                    right: 3%;
                                    top: 50%;
                                }                     
                        }
                    }             
                }
            }
        }
    }
}


</style>
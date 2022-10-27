<template>
    <div class="wrapper">
        <div class="sidebar"></div>
        <div class="main">
            <div class="line"></div>
            <div class="main-info">
                <div class="back"><img :src="mySVG" /> Назад</div>
                <div class="title">Менеджер</div>
                <div class="table">
                    <div v-for="(elem, index) in cardsToDisplay" 
                        :key="index" class="table-cards">{{elem}}</div>
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
                mySVG: require("../../public/icons/Vector.svg"),
                rootPermission: {},
                rootPermissionTitles: {},
            }
        },
        methods: {
            getTemplates() {
                API.getTemplates().then(data => {this.rootPermission = data.data.rootPermission, this.rootPermissionTitles = data.data.rootPermissionTitles})
            },
            createPermission() {
                API.createPermission()
            }
        },
        mounted() {
            this.getTemplates()
            setTimeout(() =>  console.log(this.rootPermission), 1000)
            setTimeout(() =>  console.log(this.rootPermissionTitles), 1000)

        },
        computed: {
            cardsToDisplay(){
                return ['ssdfsdf','sdfsdfdsf','lskdflfdgjj']
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
                display: flex;
                min-height: 200px;
                background: #FFFFFF;
                box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
                border-radius: 4px;
                margin-top: 24px;
                .table-cards{
                    width: fit-content;
                }
            }
        }
    }
}


</style>
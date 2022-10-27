<template>
    <div class="title">Менеджер</div>
    <div class="modals"></div>
    <button @click="createPermission" class="save-button">Сохранить</button>

</template>

<script>
    import API from "@/api/api";

    export default {
        name: 'Home',
        data() {
            return {

            }
        },
        methods: {
            getTemplates() {
                API.getTemplates().then(data => console.log(data))
            },
            createPermission() {
                API.createPermission()
            }
        },
        mounted() {
            this.getTemplates()
        }
    }
</script>
<style scoped>
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

    /* Text/T1 */

    color: #162133;
}

.modals{

}
</style>
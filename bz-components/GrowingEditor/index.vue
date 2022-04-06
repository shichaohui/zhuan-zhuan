<template>
    <view class="page fullPage growingEditor">
        <!-- 仅有 v-model 的话，初始化的默认值不会回显，传入 value 参数才会回显 -->
        <uni-datetime-picker type="date" v-model="form.date" :value="form.date" />
        <view class="baseInfo">
            <view class="item">
                <view>身高：</view>
                <uni-easyinput
                    class="input"
                    type="digit"
                    :clearable="false"
                    v-model="form.height"
                />
                <view class="unit">cm</view>
            </view>
            <view class="item">
                <view>体重：</view>
                <uni-easyinput
                    class="input"
                    type="digit"
                    :clearable="false"
                    v-model="form.weight"
                />
                <view class="unit">kg</view>
            </view>
        </view>
        <textarea
            class="description"
            v-model="form.description"
            placeholder="记录一下这段时间的状态吧"
        />
        <view class="photoListTitle">照片列表：</view>
        <view class="photoList">
            <uni-file-picker
                :limit="99"
                v-model="form.photoList"
                @delete="handleDeletePhoto"
                @success="handleUploadPhotosSuccess"
            />
        </view>
        <button class="submitBtn" type="primary" @click="handleSubmitClick">提交</button>
    </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onBackPress } from '@dcloudio/uni-app'
import abandonPhoto from '@/helpers/abandonPhoto'
import sleep from '@/utils/sleep'
import toast from '@/utils/toast'

interface Photo {
    url: string
    fileID: string
}

interface Form {
    date: string
    height: number
    weight: number
    description: string
    photoList: Photo[]
}

interface Props {
    // 初始表单
    initForm: Form
    // 是否自动返回上一页
    autoNavigateBack?: boolean
    // 触发提交
    submit: (form: Form) => Promise<void>
}

// 组件参数
const { initForm, autoNavigateBack, submit } = withDefaults(defineProps<Props>(), {
    autoNavigateBack: true,
})

// 表单
const form = reactive({ ...initForm })

// 移除照片
function handleDeletePhoto({ tempFile }) {
    console.log(tempFile)
    abandonPhoto.add([tempFile.fileID])
}

// 上传照片成功
function handleUploadPhotosSuccess({ tempFiles }) {
    /*
     * 加入弃用列表。成长记录提交成功后需要从弃用列表移除。
     * 这样处理的好处是，如果成长记录提交失败，可以将照片弃用，节省服务器空间。
     */
    abandonPhoto.add(tempFiles.map(item => item.fileID))
}

// 提交按钮点击处理
async function handleSubmitClick() {
    try {
        toast.showLoading('提交中...')
        await varifyForm()
        await submit(form)
        toast.showSuccess('提交成功')
        // 成长记录提交成功，从弃用列表移除照片
        abandonPhoto.remove(form.photoList.map(item => item.fileID))
        // 自动返回上一页
        console.log('autoNavigateBack', autoNavigateBack)
        if (autoNavigateBack) {
            await sleep(1500)
            uni.navigateBack({})
        }
    } catch (err) {
        console.error(err)
        toast.showError(err.message || '提交失败')
    }
}

// 验证表单数据
async function varifyForm() {
    if (!form.date) {
        throw Error('请选择日期')
    }
    if (!form.height) {
        throw Error('请填写身高')
    }
    if (!form.weight) {
        throw Error('请填写体重')
    }
    if (form.photoList.length === 0) {
        throw Error('请上传照片')
    }
}
</script>

<style lang="scss" scoped>
.growingEditor {
    display: flex;
    flex-direction: column;
}

.baseInfo {
    margin-top: 20upx;
    display: flex;
    align-items: center;

    .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .item + .item {
        margin-left: 80upx;
    }

    .input {
        flex: 1;
    }

    .unit {
        position: absolute;
        top: 50%;
        right: 8upx;
        transform: translateY(-50%);
        color: $uni-extra-color;
        font-size: 24upx;
    }
}

.description {
    width: 100%;
    border: 1upx solid $uni-border-3;
    margin-top: 20upx;
    padding: 10upx;
    box-sizing: border-box !important;
    font-size: $font-size-base;
}

.photoListTitle {
    padding: 20upx 0;
    font-size: 32upx;
}

.photoList {
    flex: 1;
}

.submitBtn {
    width: 100%;
}
</style>

import { Injectable } from '@angular/core';
import { NzModalService,  NzModalRef } from 'ng-zorro-antd';

/**
 * 对话框辅助类
 */
@Injectable()
export class ModalHelper {

    private queues: NzModalRef[] = [];
    private zIndex = 500;

    constructor(private modalSrv: NzModalService) { }

    /**
     * 移除当前所有对话框
     */
    removeAll() {
        this.queues.forEach((item: NzModalRef) => {
            item.destroy();
        });
    }

    /**
     * 打开对话框，默认会过滤一些事件的回调，因此更容易处理回调：
     * this.modalHelper.open(FormEditComponent, { i }).subscribe(res => this.load());
     *
     * 对于组件的成功&关闭的处理说明：
     * 成功：
     * this.subject.destroy('onOk');
     *  若需要回调用参数则：
     *  this.subject.next(data);
     *  this.subject.destroy();
     *
     * 关闭：
     * this.subject.destroy();
     *
     * @param {*} comp 组件
     * @param {*} [params] 组件参数
     * @param {('sm' | 'lg' | '' | number)} [size='lg'] 大小；例如：lg、600，默认：lg
     * @param {*} [options] 对话框ConfigInterface参数
     */
    open(comp: any, params?: any, size: 'sm' | 'lg' | '' | number = 'lg', options?: any): NzModalRef {
        let cls = '', width = '';
        if (size) {
            if (typeof size === 'number') {
                width = `${size}px`;
            } else {
                cls = `modal-${size}`;
            }
        }
        const subject = this.modalSrv.create(Object.assign({
            nzWrapClassName: cls,
            nzContent: comp,
            nzWidth: width ? width : undefined,
            nzFooter: false,
            nzComponentParams: params,
            nzZIndex: ++this.zIndex,
            nzMaskClosable: false,
        }, options || {}));

        this.queues.push(subject);

        return subject;
    }

    /**
     * 静态框，点击蒙层不允许关闭
     */
    static(comp: any, params?: any, size: 'sm' | 'lg' | '' | number = 'lg', options?: any): NzModalRef {
        return this.open(comp, params, size, Object.assign({
            nzMaskClosable: false
        }, options));
    }
}

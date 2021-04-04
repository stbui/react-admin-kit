import React from 'react';
import { useMutation, useNotify, useRefresh } from '@stbui/prophet-core';

import { Button, Popconfirm, ButtonProps, PopconfirmProps } from 'antd';

export interface EnableButtonProps extends ButtonProps {
    resource: string;
    record?: any;
    button?: ButtonProps;
    popconfirm?: PopconfirmProps;
}

export const EnabledButton: React.FC<EnableButtonProps> = props => {
    const { id, is, record, resource } = props;
    const { type, button, popconfirm } = props;

    const refresh = useRefresh();
    const notify = useNotify();

    const [update] = useMutation(
        {
            type: 'updateStatus',
            resource,
            payload: { id },
        },
        {}
    );

    const onClick = () =>
        update(
            // @ts-ignore
            { data: record },
            {
                onSuccess: () => {
                    notify('更新成功', 'success');
                    refresh();
                },
                onFailure: error =>
                    notify(
                        typeof error === 'string'
                            ? error
                            : error.message ||
                                  'prophet.notification.http_error',
                        'error'
                    ),
            }
        );

    return (
        <Popconfirm
            title={`确认要${!is ? '禁用' : '启用'}吗？`}
            onConfirm={onClick}
            {...popconfirm}
        >
            <Button type={type} {...button}>
                {is ? '启用' : '停用'}
            </Button>
        </Popconfirm>
    );
};

EnabledButton.defaultProps = {
    type: 'link',
};

export default EnabledButton;

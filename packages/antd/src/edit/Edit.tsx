import React, { cloneElement } from 'react';
import { EditController } from 'prophet-core';
import { Card } from 'antd';

export const EditView = ({
  children,
  title,
  loading,
  basePath,
  resource,
  save
}) => (
  <Card bordered={false} title={title} loading={loading}>
    {cloneElement(children, {
      basePath,
      resource,
      save
    })}
  </Card>
);

export const Edit = props => (
  <EditController {...props}>
    {controllerProps => <EditView {...props} {...controllerProps} />}
  </EditController>
);

export default Edit;

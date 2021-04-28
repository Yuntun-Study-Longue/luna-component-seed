import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2242499_h8i2f5t3p6.js',
  ],
});
function SysIcon(props) {
    return (
        <IconFont type={`icon-${props.name}`}/>
    )
}

export default SysIcon
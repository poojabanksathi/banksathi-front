import React from 'react';

export default function Loader(props) {
    const {className, color, width, height, ...rest} = props;
    // const borderColor = color ? `border-${color}` : '';
    const Width = width ? isNaN(width) ? `w-[${width}]` : `w-${width}` : 'w-8';
    const Height = height ? isNaN(height) ? `h-[${height}]` : `h-${height}` : 'h-8 ';
    return (
        <div
        style={{
            borderColor: color,
            borderRight: 'transparent',
            borderRightStyle: 'inherit'
        }}
        className={[className, 
                // borderColor, 
                Height, 
                Width, 
                "inline-block animate-spin rounded-full border-[3px] border-solid border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
                ].join(' ')}
        role="status"
        >
            <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...
            </span>
        </div>
    )
}
